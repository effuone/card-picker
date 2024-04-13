import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cardTypes = [
  { bank: 'BCC', cardTypes: ['#картакарта', '#ironcard', 'juniorcard'] },
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
