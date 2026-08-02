import { Router } from 'express';
import { z } from 'zod';
import { authRequired } from '../middleware/auth.js';
import { prisma } from '../prisma.js';

const router = Router();

const createSchema = z.object({
  jobId: z.string(),
  status: z.enum(['SAVED', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']).default('APPLIED'),
  notes: z.string().optional()
});

router.get('/', authRequired, async (req, res) => {
  const apps = await prisma.application.findMany({
    where: { userId: req.user!.userId },
    include: { job: true },
    orderBy: { createdAt: 'desc' }
  });

  const stats = {
    total: apps.length,
    successRate: apps.length ? Math.round((apps.filter((a: { status: string }) => ['OFFER', 'INTERVIEW'].includes(a.status)).length / apps.length) * 100) : 0
  };

  res.json({ applications: apps, stats });
});

router.post('/', authRequired, async (req, res) => {
  const payload = createSchema.parse(req.body);
  const application = await prisma.application.upsert({
    where: { userId_jobId: { userId: req.user!.userId, jobId: payload.jobId } },
    create: {
      userId: req.user!.userId,
      jobId: payload.jobId,
      status: payload.status,
      notes: payload.notes,
      appliedAt: payload.status === 'APPLIED' ? new Date() : null
    },
    update: {
      status: payload.status,
      notes: payload.notes,
      appliedAt: payload.status === 'APPLIED' ? new Date() : undefined
    }
  });

  res.status(201).json(application);
});

export default router;
