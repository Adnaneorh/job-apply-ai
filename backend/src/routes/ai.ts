import { Router } from 'express';
import { AIController } from '../controllers/AIController';
import { authMiddleware } from '../middleware/auth';

const controller = new AIController();
export const aiRouter = Router();

aiRouter.use(authMiddleware);
aiRouter.post('/generate-answer', (req, res) => controller.generateAnswer(req, res));
aiRouter.post('/tailor-resume', (req, res) => controller.tailorResume(req, res));
aiRouter.post('/cover-letter', (req, res) => controller.coverLetter(req, res));
aiRouter.post('/match-score', (req, res) => controller.matchScore(req, res));
