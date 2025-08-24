const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear tables in an order that avoids FK problems
  await prisma.vehicleFeature.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.caracteristica.deleteMany();
  await prisma.category.deleteMany();

  // Run seeders
  const seedCategories = require('./seeds/categories');

  const seedVehicles = require('./seeds/vehicles');

  const categories = await seedCategories(prisma);
  const categoriesMap = {};
  categories.forEach(c => (categoriesMap[c.name] = c));

  const services = await seedServices(prisma);
  const vehicles = await seedVehicles(prisma, categoriesMap);

  console.log('Seed complete:', {
    categories: categories.map(c => c.id),
    vehicles: vehicles.map(v => v.id),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
