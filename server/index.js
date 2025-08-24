const express = require('express');
const path = require('path');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve static project files (PDFs, docs) from public/static
app.use('/static', express.static(path.join(__dirname, '..', 'public', 'static')));

app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: { caracteristicas: true },
      orderBy: { id: 'asc' }
    });

    const mapped = services.map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      preco: s.preco,
      destaque: s.destaque,
      caracteristicas: s.caracteristicas.map(c => c.text)
    }));

    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`API server (Prisma) running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = prisma;
