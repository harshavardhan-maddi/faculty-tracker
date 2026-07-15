if (process.env.VERCEL) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = 'library';
  process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = 'library';
}

const { PrismaClient } = require('@prisma/client');

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

module.exports = prisma;
