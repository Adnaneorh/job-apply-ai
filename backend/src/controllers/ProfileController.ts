import type { Request, Response } from 'express';
import { ResumeParser } from '../services/ResumeParser';
import type { Profile, WorkExperience } from '../types';

const resumeParser = new ResumeParser();
const profiles = new Map<string, Profile>();
const experiences = new Map<string, WorkExperience[]>();

function getDefaultProfile(userId: string): Profile {
  return (
    profiles.get(userId) || {
      id: crypto.randomUUID(),
      userId,
      fullName: 'New User',
      title: 'Software Engineer',
      summary: '',
      skills: [],
      experienceYears: 0,
      preferredLocation: 'Remote'
    }
  );
}

export class ProfileController {
  getProfile(req: Request, res: Response) {
    const profile = getDefaultProfile(req.userId!);
    profiles.set(req.userId!, profile);
    return res.json({ profile });
  }

  updateProfile(req: Request, res: Response) {
    const current = getDefaultProfile(req.userId!);
    const profile = { ...current, ...req.body };
    profiles.set(req.userId!, profile);
    return res.json({ profile });
  }

  uploadResume(req: Request, res: Response) {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Resume file is required' });
    return res.status(201).json({ resume: { filename: file.originalname, parsedText: resumeParser.parse(file.originalname) } });
  }

  listExperience(req: Request, res: Response) {
    return res.json({ experiences: experiences.get(req.userId!) || [] });
  }

  addExperience(req: Request, res: Response) {
    const list = experiences.get(req.userId!) || [];
    const item: WorkExperience = { id: crypto.randomUUID(), profileId: req.userId!, role: req.body.role, company: req.body.company };
    list.push(item);
    experiences.set(req.userId!, list);
    return res.status(201).json({ experience: item });
  }

  updateExperience(req: Request, res: Response) {
    const list = experiences.get(req.userId!) || [];
    const idx = list.findIndex((item) => item.id === req.params.id);
    if (idx < 0) return res.status(404).json({ error: 'Experience not found' });
    list[idx] = { ...list[idx], ...req.body };
    experiences.set(req.userId!, list);
    return res.json({ experience: list[idx] });
  }

  deleteExperience(req: Request, res: Response) {
    const list = experiences.get(req.userId!) || [];
    experiences.set(req.userId!, list.filter((item) => item.id !== req.params.id));
    return res.status(204).send();
  }
}
