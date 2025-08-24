module.exports = async function seedCategories(prisma) {
  const names = ['Económico', 'Intermédio', 'Luxo', 'SUV', 'Pick-Up', 'Van & Grupo'];
  const created = [];
  for (const name of names) {
    const c = await prisma.category.create({ data: { name } });
    created.push(c);
  }
  return created; // array of category records
};
