import { prisma } from '../prisma.js';
import { autofillService } from './autofill.service.js';

export const autoApplyService = {
  async start(userId: string, jobIds: string[]) {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { profile: true } });
    if (!user || !user.profile) throw new Error('Profile not setup');

    const payload = autofillService.buildPayload({
      name: user.name,
      email: user.email,
      skills: user.profile.skills
    });

    const applied = await Promise.all(jobIds.map((jobId) => prisma.application.upsert({
      where: { userId_jobId: { userId, jobId } },
      create: { userId, jobId, status: 'APPLIED', appliedAt: new Date() },
      update: { status: 'APPLIED', appliedAt: new Date() }
    })));

    return { payload, count: applied.length };
  }
};
