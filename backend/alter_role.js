const prisma = require('./src/db');

async function run() {
  try {
    console.log('Executing ALTER TYPE raw SQL query...');
    // In PostgreSQL, we can use ALTER TYPE to add an enum value
    await prisma.$executeRawUnsafe(`ALTER TYPE "Role" ADD VALUE 'FACULTY'`);
    console.log('SUCCESS: Altered Role enum to include FACULTY.');
  } catch (err) {
    // If the value already exists, PostgreSQL throws a specific error code or message
    if (err.message && err.message.includes('already exists')) {
      console.log('SUCCESS: FACULTY value already exists in Role enum.');
    } else {
      console.error('Error altering enum:', err);
    }
  } finally {
    await prisma.$disconnect();
  }
}

run();
