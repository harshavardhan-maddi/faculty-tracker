const prisma = require('./src/db');
const bcrypt = require('bcryptjs');

async function test() {
  try {
    const user = await prisma.user.findUnique({
      where: { userId: 'hod123' }
    });

    if (!user) {
      console.log('User not found!');
      return;
    }

    console.log('User found in database:', user.userId);
    console.log('Stored hashed password:', user.password);

    const isMatch = await bcrypt.compare('password123', user.password);
    console.log('Does "password123" match stored hash?', isMatch);

    const isMatch2 = await bcrypt.compare('password', user.password);
    console.log('Does "password" match stored hash?', isMatch2);

  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
