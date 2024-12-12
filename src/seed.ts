import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with users...');
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();

  await prisma.category.createMany({
    data: [
      {
        name: 'Ужасы',
      },
      {
        name: 'Комедия',
      },
      {
        name: 'Драма',
      },
    ],
  });

  await prisma.tag.createMany({
    data: [
      {
        name: 'Ужасы с призраками',
      },
      {
        name: 'Ужасы с зомби',
      },
      {
        name: 'Комедия для детей',
      },
      {
        name: 'Комедия для взрослых',
      },
      { name: 'Драма по японский' },
      { name: 'Драма по русский' },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
