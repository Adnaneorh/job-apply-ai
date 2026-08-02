import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { app } from '../src/app.js';

vi.mock('../src/prisma.js', () => {
  const user = { id: 'u1', email: 'test@example.com', name: 'Test User', passwordHash: '$2b$10$/PBoFgFbx7Z7qJBwWxkMCOv.jTA0.AyZls8xlRAnTrevrQODM4mW.' };
  return {
    prisma: {
      user: {
        findUnique: vi.fn(async ({ where }: any) => (where.email === user.email ? user : null)),
        create: vi.fn(async ({ data }: any) => ({ id: 'u2', ...data }))
      },
      profile: { create: vi.fn(async () => ({})) },
      job: { findMany: vi.fn(async () => [{ id: 'j1', title: 'Engineer', location: 'Remote', isRemote: true }]) },
      application: { findMany: vi.fn(async () => []) }
    }
  };
});

describe('auth routes', () => {
  it('logs in user with valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'test@example.com', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  it('filters jobs by search endpoint', async () => {
    const res = await request(app).post('/api/jobs/search').send({ title: 'engineer', remote: true });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
