import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js';
import { authRequired } from '../middleware/auth.js';
import { connectorsService } from '../services/connectors.service.js';

const router = Router();

const filterSchema = z.object({
  title: z.string().optional(),
  location: z.string().optional(),
  remote: z.boolean().optional(),
  salaryMin: z.coerce.number().optional()
});

function buildWhere(query: z.infer<typeof filterSchema>) {
  return {
    title: query.title ? { contains: query.title, mode: 'insensitive' as const } : undefined,
    location: query.location ? { contains: query.location, mode: 'insensitive' as const } : undefined,
    isRemote: query.remote,
    salaryMax: query.salaryMin ? { gte: query.salaryMin } : undefined
  };
}

router.get('/', async (req, res) => {
  const query = filterSchema.parse(req.query);
  const jobs = await prisma.job.findMany({ where: buildWhere(query), orderBy: { createdAt: 'desc' } });
  res.json(jobs);
});

router.post('/search', async (req, res) => {
  const query = filterSchema.parse(req.body);
  const jobs = await prisma.job.findMany({ where: buildWhere(query), orderBy: { createdAt: 'desc' } });
  res.json(jobs);
});

router.post('/seed-connectors', authRequired, async (_req, res) => {
  const [linkedin, indeed, glassdoor] = await Promise.all([
    connectorsService.fetch('linkedin'),
    connectorsService.fetch('indeed'),
    connectorsService.fetch('glassdoor')
  ]);

  const data = [...linkedin, ...indeed, ...glassdoor].map((job) => ({
    source: job.company.includes('LinkedIn') ? 'linkedin' : job.company.includes('Indeed') ? 'indeed' : 'glassdoor',
    title: job.title,
    company: job.company,
    location: job.location,
    description: `${job.title} role from connector`,
    isRemote: job.location.toLowerCase() === 'remote'
  }));

  if (data.length) await prisma.job.createMany({ data });
  res.json({ imported: data.length });
});

export default router;
