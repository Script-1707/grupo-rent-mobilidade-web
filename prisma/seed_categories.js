import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.resolve(process.cwd(), 'public', 'static-db', 'categories.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const categories = JSON.parse(raw);

  for (const cat of categories) {
    const { id, name, slug } = cat;
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
  }

  console.log(`Seed complete: ${categories.length} categories upserted`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
