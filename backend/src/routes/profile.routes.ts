import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { authRequired } from '../middleware/auth.js';
import { prisma } from '../prisma.js';
import { env } from '../config/env.js';

const router = Router();
const uploadPath = path.resolve(process.cwd(), env.UPLOAD_DIR);
fs.mkdirSync(uploadPath, { recursive: true });

const upload = multer({ dest: uploadPath });

const profileSchema = z.object({
  phone: z.string().optional(),
  location: z.string().optional(),
  summary: z.string().optional(),
  skills: z.array(z.string()).default([]),
  experiences: z.array(z.object({
    company: z.string(),
    title: z.string(),
    description: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional()
  })).default([])
});

router.get('/', authRequired, async (req, res) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.userId },
    include: { resumes: true, workExperiences: true }
  });
  res.json(profile);
});

router.put('/', authRequired, async (req, res) => {
  const payload = profileSchema.parse(req.body);

  const profile = await prisma.profile.upsert({
    where: { userId: req.user!.userId },
    create: {
      userId: req.user!.userId,
      phone: payload.phone,
      location: payload.location,
      summary: payload.summary,
      skills: payload.skills
    },
    update: {
      phone: payload.phone,
      location: payload.location,
      summary: payload.summary,
      skills: payload.skills
    }
  });

  await prisma.workExperience.deleteMany({ where: { profileId: profile.id } });
  if (payload.experiences.length) {
    await prisma.workExperience.createMany({
      data: payload.experiences.map((exp) => ({
        profileId: profile.id,
        company: exp.company,
        title: exp.title,
        description: exp.description,
        startDate: new Date(exp.startDate),
        endDate: exp.endDate ? new Date(exp.endDate) : null
      }))
    });
  }

  res.json({ message: 'Profile updated' });
});

router.post('/resume', authRequired, upload.single('resume'), async (req, res) => {
  const profile = await prisma.profile.findUnique({ where: { userId: req.user!.userId } });
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  if (!req.file) return res.status(400).json({ message: 'Resume file required' });

  const parsed = `Parsed resume for ${req.file.originalname}`;
  const resume = await prisma.resume.create({
    data: {
      profileId: profile.id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      parsed
    }
  });

  res.status(201).json(resume);
});

export default router;
