import type { Application, ApplicationStatus } from '../types';

const applications: Application[] = [];

export class ApplicationService {
  listByUser(userId: string) {
    return applications.filter((app) => app.userId === userId);
  }

  create(userId: string, jobId: string, notes?: string) {
    const app: Application = {
      id: crypto.randomUUID(),
      userId,
      jobId,
      status: 'applied',
      notes,
      createdAt: new Date().toISOString()
    };
    applications.push(app);
    return app;
  }

  updateStatus(userId: string, id: string, status: ApplicationStatus, notes?: string) {
    const app = applications.find((item) => item.id === id && item.userId === userId);
    if (!app) throw new Error('Application not found');
    app.status = status;
    app.notes = notes ?? app.notes;
    return app;
  }

  delete(userId: string, id: string) {
    const index = applications.findIndex((item) => item.id === id && item.userId === userId);
    if (index < 0) throw new Error('Application not found');
    applications.splice(index, 1);
  }

  stats(userId: string) {
    const list = this.listByUser(userId);
    const interviews = list.filter((app) => app.status === 'interview' || app.status === 'offer').length;
    const offers = list.filter((app) => app.status === 'offer').length;
    return {
      total: list.length,
      interviews,
      offers,
      successRate: list.length ? Math.round((offers / list.length) * 100) : 0
    };
  }
}
