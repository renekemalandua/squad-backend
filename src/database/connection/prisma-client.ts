import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function runPrismaClient() {
  try {
    await prisma.$connect();
    console.log('Database is ready to be used');
  } catch (error) {
    console.error('Error trying to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export { runPrismaClient }
