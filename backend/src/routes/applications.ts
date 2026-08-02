import { Router } from 'express';
import { ApplicationController } from '../controllers/ApplicationController';
import { authMiddleware } from '../middleware/auth';

const controller = new ApplicationController();
export const applicationsRouter = Router();

applicationsRouter.use(authMiddleware);
applicationsRouter.get('/', (req, res) => controller.list(req, res));
applicationsRouter.get('/stats', (req, res) => controller.stats(req, res));
applicationsRouter.post('/', (req, res) => controller.create(req, res));
applicationsRouter.put('/:id', (req, res) => controller.update(req, res));
applicationsRouter.delete('/:id', (req, res) => controller.delete(req, res));
