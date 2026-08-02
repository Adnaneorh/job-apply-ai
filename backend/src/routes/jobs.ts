import { Router } from 'express';
import { JobController } from '../controllers/JobController';
import { authMiddleware } from '../middleware/auth';

const controller = new JobController();
export const jobsRouter = Router();

jobsRouter.use(authMiddleware);
jobsRouter.get('/', (req, res) => controller.list(req, res));
jobsRouter.get('/matched', (req, res) => controller.matched(req, res));
jobsRouter.post('/search', (req, res) => controller.search(req, res));
jobsRouter.get('/:id', (req, res) => controller.getById(req, res));
