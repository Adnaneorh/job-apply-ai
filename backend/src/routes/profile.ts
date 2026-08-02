import { Router } from 'express';
import multer from 'multer';
import { ProfileController } from '../controllers/ProfileController';
import { authMiddleware } from '../middleware/auth';

const upload = multer({ storage: multer.memoryStorage() });
const controller = new ProfileController();
export const profileRouter = Router();

profileRouter.use(authMiddleware);
profileRouter.get('/', (req, res) => controller.getProfile(req, res));
profileRouter.put('/', (req, res) => controller.updateProfile(req, res));
profileRouter.post('/resume', upload.single('resume'), (req, res) => controller.uploadResume(req, res));
profileRouter.get('/experience', (req, res) => controller.listExperience(req, res));
profileRouter.post('/experience', (req, res) => controller.addExperience(req, res));
profileRouter.put('/experience/:id', (req, res) => controller.updateExperience(req, res));
profileRouter.delete('/experience/:id', (req, res) => controller.deleteExperience(req, res));
