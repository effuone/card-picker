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
      },
    });

    await prisma.cashbackOffer.create({
      data: {
        partnerId: partner.id,
        cardTypeId: cardType.id,
        cashbackPercent: item.cashback,
        discountPercent: item.discountPercent,
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
