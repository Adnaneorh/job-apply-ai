import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateBody } from '../middleware/validation';
import { loginSchema, signupSchema } from '../utils/validators';
import { authMiddleware } from '../middleware/auth';

const controller = new AuthController();
export const authRouter = Router();

authRouter.post('/signup', validateBody(signupSchema), (req, res) => controller.signup(req, res));
authRouter.post('/login', validateBody(loginSchema), (req, res) => controller.login(req, res));
authRouter.post('/logout', authMiddleware, (req, res) => controller.logout(req, res));
authRouter.get('/me', authMiddleware, (req, res) => controller.me(req, res));
