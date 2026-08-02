import type { Request, Response } from 'express';
import { AIService } from '../services/AIService';

const ai = new AIService();

export class AIController {
  async generateAnswer(req: Request, res: Response) {
    const answer = await ai.generateAnswer(req.body.question, req.body.context || '');
    return res.json({ answer });
  }

  async tailorResume(req: Request, res: Response) {
    const output = await ai.tailorResume(req.body.resumeText, req.body.jobDescription);
    return res.json({ resume: output });
  }

  async coverLetter(req: Request, res: Response) {
    const output = await ai.coverLetter(req.body.profile, req.body.jobDescription);
    return res.json({ coverLetter: output });
  }

  async matchScore(req: Request, res: Response) {
    const result = await ai.matchScore(req.body.profile, req.body.jobDescription);
    return res.json(result);
  }
}
