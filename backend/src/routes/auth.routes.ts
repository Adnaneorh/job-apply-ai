import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../prisma.js';
import { signToken } from '../utils/jwt.js';

const router = Router();

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).optional()
});

router.post('/signup', async (req, res) => {
  const payload = authSchema.parse(req.body);
  const existing = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existing) return res.status(409).json({ message: 'Email already used' });

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: { email: payload.email, name: payload.name ?? payload.email.split('@')[0], passwordHash }
  });

  await prisma.profile.create({ data: { userId: user.id, skills: [] } });

  const token = signToken({ userId: user.id, email: user.email });
  return res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/login', async (req, res) => {
  const payload = authSchema.omit({ name: true }).parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(payload.password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ userId: user.id, email: user.email });
  return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/logout', (_req, res) => res.json({ message: 'Logged out' }));

export default router;
