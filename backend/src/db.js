if (process.env.DATABASE_URL) {
  let url = process.env.DATABASE_URL.trim();
  if (url.startsWith('"') && url.endsWith('"')) {
    url = url.slice(1, -1);
  } else if (url.startsWith("'") && url.endsWith("'")) {
    url = url.slice(1, -1);
  }
  process.env.DATABASE_URL = url;
}

if (process.env.VERCEL) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = 'library';
  process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = 'library';
}

let PrismaClient;
try {
  PrismaClient = require('@prisma/client').PrismaClient;
} catch (e1) {
  try {
    PrismaClient = require('./generated/client').PrismaClient;
  } catch (e2) {
    console.error('PrismaClient load error:', e1, e2);
    throw e1;
  }
}

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
