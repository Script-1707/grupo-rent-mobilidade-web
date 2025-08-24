module.exports = async function seedVehicles(prisma, categoriesMap) {
  // categoriesMap: object with category name -> category record
  const vehicles = [
    {
      make: 'Hyundai',
      model: 'Creta',
      year: 2023,
      plate: 'ABC-1234',
      pricePerDay: 7000,
      description: 'SUV confortável, ideal para cidade e estrada.',
      destaque: 'Empresarial',
      category: 'SUV',
      features: ['Ar condicionado', 'Bluetooth'],
    },
    {
      make: 'Toyota',
      model: 'Hilux',
      year: 2022,
      plate: 'DEF-5678',
      pricePerDay: 12000,
      description: 'Pick-up robusta para trabalho e passeios.',
      destaque: 'Premium',
      category: 'Pick-Up',
      features: ['4x4', 'Capa de proteção'],
    },
  ];

  const created = [];
  for (const v of vehicles) {
    const createdVehicle = await prisma.vehicle.create({
      data: {
        make: v.make,
        model: v.model,
        year: v.year,
        plate: v.plate,
        pricePerDay: v.pricePerDay,
        description: v.description,
        destaque: v.destaque,
        categoryId: categoriesMap[v.category].id,
        features: { create: v.features.map((t) => ({ text: t })) },
      },
      include: { features: true, category: true },
    });
    created.push(createdVehicle);
  }
  return created;
};
