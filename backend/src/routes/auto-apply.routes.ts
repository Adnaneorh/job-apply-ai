import { Router } from 'express';
import { z } from 'zod';
import { authRequired } from '../middleware/auth.js';
import { autoApplyService } from '../services/autoApply.service.js';

const router = Router();

router.post('/start', authRequired, async (req, res) => {
  const payload = z.object({ jobIds: z.array(z.string()).min(1) }).parse(req.body);
  const result = await autoApplyService.start(req.user!.userId, payload.jobIds);
  res.json({ message: 'Auto-apply started', ...result });
});

export default router;
