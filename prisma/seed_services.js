import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Normaliza um rótulo para uma chave: remove acentos, troca espaços por _ e deixa em lowercase
function labelToKey(label) {
  return label
    .normalize('NFD') // separa diacríticos
    .replace(/\p{Diacritic}/gu, '') // remove diacríticos (Node >=12+ com flag u)
    .replace(/[^a-zA-Z0-9]+/g, '_') // non-alnum -> underscore
    .replace(/^_+|_+$/g, '') // trim underscores nas bordas
    .replace(/_+/g, '_') // collapse múltiplos underscores
    .toLowerCase();
}

async function main() {
  const filePath = path.resolve(process.cwd(), 'public', 'static-db', 'taxas-adicionais.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const arr = JSON.parse(raw);

  if (!Array.isArray(arr)) {
    throw new Error('Expected taxas-adicionais.json to be an array of { servico, preco }');
  }
  // Limpa a tabela de services antes de re-seedar para garantir que não existam entradas obsoletas
  const deleted = await prisma.service.deleteMany({});
  console.log(`Deleted ${deleted.count} existing services`);

  for (const item of arr) {
    const servico = item.servico ?? item.service ?? item.label ?? null;
    const preco = item.preco ?? item.preco_moeda ?? item.price ?? null;

    if (!servico || preco == null) {
      console.warn('Skipping invalid entry in taxas-adicionais.json:', item);
      continue;
    }

    const key = labelToKey(String(servico));
    const amount = Number(preco);

    await prisma.service.upsert({
      where: { key },
      update: { amount, label: String(servico) },
      create: { key, label: String(servico), amount },
    });
  }

  console.log(`Seed complete: ${arr.length} services processed`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
