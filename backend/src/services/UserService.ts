import bcrypt from 'bcryptjs';
import type { User } from '../types';

const users: User[] = [];

export class UserService {
  async create(name: string, email: string, password: string) {
    if (users.find((u) => u.email === email)) {
      throw new Error('Email already exists');
    }

    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10)
    };
    users.push(user);
    return user;
  }

  async verifyCredentials(email: string, password: string) {
    const user = users.find((u) => u.email === email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    return valid ? user : null;
  }

  getById(id: string) {
    return users.find((u) => u.id === id) || null;
  }
}
