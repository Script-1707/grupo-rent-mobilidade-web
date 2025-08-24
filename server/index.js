import express from 'express';
import path from 'path';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve static project files (PDFs, docs) from public/static
app.use('/static', express.static(path.join(__dirname, '..', 'public', 'static')));

// Persist contact inquiries
app.post('/api/contact-inquiries', async (req, res) => {
  try {
    const { name, email, phone, subject, message, source } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'name, email and message are required' });
    }

    const created = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        source: source || null
      }
    });

    return res.status(201).json({ success: true, message: 'Contact saved', id: created.id });
  } catch (err) {
    console.error('Error saving contact:', err);
    return res.status(500).json({ success: false, message: err.message || 'Internal error' });
  }
});

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

export default prisma;
