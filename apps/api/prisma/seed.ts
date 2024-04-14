import { PrismaClient } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();

const cardTypes = [
  { bank: 'BCC', cardTypes: ['#картакарта', '#ironcard', '#juniorcard'] },
  {
    bank: 'Halyk',
    cardTypes: [
      'Halyk Bonus Digital Card',
      'Halyk Bonus',
      'Sinooil Digital Card',
      'Black Card',
      'Diamond Card',
    ],
  },
  {
    bank: 'Forte',
    cardTypes: ['Travel', 'Blue', 'Black', 'Solo', 'Детская карта Forte'],
  },
  {
    bank: 'Kaspi',
    cardTypes: ['Kaspi Gold'],
  },
];

const categories = [
  'Здоровье и красота',
  'Питание и рестораны',
  'Мода и одежда',
  'Мебель и домашний декор',
  'Услуги и разное',
  'Продукты питания и рынки',
  'Аксессуары и ювелирные изделия',
  'Спорт и туристическое снаряжение',
  'Товары для детей и игрушки',
  'Путешествия и размещение',
  'Строительные материалы',
  'Товары премиум-класса',
  'Электроника',
  'Интернет магазины',
];

const filePath = path.join(__dirname, './data/seed.json');

let partnersAndOffers = [];

fs.readFile(filePath, { encoding: 'utf-8' }).then((json) => {
  const seedData = JSON.parse(json);
  partnersAndOffers = seedData;
});

async function main() {
  for (const entry of cardTypes) {
    const bank = await prisma.bank.create({
      data: {
        name: entry.bank,
      },
    });

    for (const type of entry.cardTypes) {
      await prisma.bankCardType.create({
        data: {
          name: type,
          bankId: bank.id,
        },
      });
    }
  }
  const kaspiGoldType = await prisma.bankCardType.findFirst({
    where: { name: 'Kaspi Gold' },
  });
  // Create categories
  for (const category of categories) {
    await prisma.categories.create({
      data: {
        name: category,
      },
    });
  }

  for (const item of partnersAndOffers) {
    const category = await prisma.categories.findFirst({
      where: { name: item.category },
    });
    if (!category) {
      continue;
    }
    const cardType = await prisma.bankCardType.findFirst({
      where: { name: item.cardPartner },
    });
    if (!cardType) {
      continue;
    }
    const partner = await prisma.partner.create({
      data: {
        name: item.partner,
        description: item.description,
        categoryId: category.id,
        address: item.address,
      },
    });

    await prisma.cashbackOffer.create({
      data: {
        partnerId: partner.id,
        cardTypeId: cardType.id,
        cashbackPercent: item.cashback,
        discountPercent: item.discountPercent,
        requirements: item.requirements,
      },
    });
    await prisma.cashbackOffer.create({
      data: {
        partnerId: partner.id,
        cardTypeId: kaspiGoldType.id,
        cashbackPercent: 0.5,
        discountPercent: item.discountPercent,
        requirements: '- при оплате QR и смартфоном ',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
