import { Router } from 'express';
import { z } from 'zod';
import { authRequired } from '../middleware/auth.js';
import { aiService } from '../services/ai.service.js';

const router = Router();

router.use(authRequired);

router.post('/generate-answer', async (req, res) => {
  const payload = z.object({ question: z.string(), profile: z.string() }).parse(req.body);
  const text = await aiService.generateAnswer(payload.question, payload.profile);
  res.json({ text });
});

router.post('/tailor-resume', async (req, res) => {
  const payload = z.object({ resume: z.string(), jobDescription: z.string() }).parse(req.body);
  const text = await aiService.tailorResume(payload.resume, payload.jobDescription);
  res.json({ text });
});

router.post('/cover-letter', async (req, res) => {
  const payload = z.object({ profile: z.string(), jobDescription: z.string() }).parse(req.body);
  const text = await aiService.generateCoverLetter(payload.profile, payload.jobDescription);
  res.json({ text });
});

export default router;
