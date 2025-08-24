import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function findOrCreateCategoryByName(name) {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return await prisma.category.upsert({
    where: { slug },
    update: { name },
    create: { name, slug },
  });
}

async function main() {
  const filePath = path.resolve(process.cwd(), 'public', 'static-db', 'vehicles.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  let vehicleCount = 0;

  for (const group of data) {
    const categoryName = group.category;
    const category = await findOrCreateCategoryByName(categoryName);

    for (const car of group.cars) {
      const {
        name,
        description = group.description || null,
        image = null,
        seats = null,
        transmission = null,
        fuel_type = null,
        specifications = [],
        price_daily = null,
      } = car;

      await prisma.vehicle.upsert({
        where: { name },
        update: {
          description,
          image,
          seats,
          transmission,
          fuel_type,
          specifications,
          price_daily,
          categoryId: category.id,
        },
        create: {
          name,
          description,
          image,
          seats,
          transmission,
          fuel_type,
          specifications,
          price_daily,
          category: { connect: { id: category.id } },
        },
      });

      vehicleCount++;
    }
  }

  console.log(`Seed complete: ${vehicleCount} vehicles upserted`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
