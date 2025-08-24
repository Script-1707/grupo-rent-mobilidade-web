import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash default admin password
  const adminPassword = 'admin';
  const adminHash = await bcrypt.hash(adminPassword, 10);

  // Upsert the requested admin user and an example Google/public user
  await prisma.user.upsert({
    where: { email: 'geral@evgrupo.com' },
    update: {
      // ensure role and password are set on update as well
      role: 'ADMIN',
      password: adminHash,
      name: 'Admin EVGrupo',
      provider: 'LOCAL',
      emailVerified: new Date(),
    },
    create: {
      email: 'geral@evgrupo.com',
      name: 'Admin EVGrupo',
      password: adminHash,
      role: 'ADMIN',
      provider: 'LOCAL',
      providerId: null,
      emailVerified: new Date(),
      image: null,
    },
  });

  console.log('Seed complete: users upserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
