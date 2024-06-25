import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create dummy users
  const user1 = await prisma.users.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'admin',
      email: 'admin@example.com',
      password: '12345678',
    },
  });

  const user2 = await prisma.users.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      name: 'admin2',
      email: 'admin2@example.com',
      password: '12345678',
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
