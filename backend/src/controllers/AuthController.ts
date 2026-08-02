import type { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { signToken } from '../utils/jwt';

const users = new UserService();

export class AuthController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await users.create(name, email, password);
    const token = signToken(user.id);
    return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await users.verifyCredentials(email, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken(user.id);
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  }

  async me(req: Request, res: Response) {
    const user = req.userId ? users.getById(req.userId) : null;
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: { id: user.id, name: user.name, email: user.email } });
  }

  async logout(_req: Request, res: Response) {
    return res.status(204).send();
  }
}
