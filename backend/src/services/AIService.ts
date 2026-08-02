import OpenAI from 'openai';
import { env } from '../config/env';

export class AIService {
  private client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

  async generateAnswer(question: string, context: string) {
    if (!this.client) {
      return `Draft answer for: ${question} (context length: ${context.length})`;
    }

    const completion = await this.client.responses.create({
      model: 'gpt-4.1-mini',
      input: `Question: ${question}
Context: ${context}`
    });

    return completion.output_text || 'No response generated';
  }

  async tailorResume(resumeText: string, jobDescription: string) {
    return `Tailored resume for job: ${jobDescription.slice(0, 80)}...
${resumeText}`;
  }

  async coverLetter(profile: string, jobDescription: string) {
    return `Cover letter draft for ${jobDescription.slice(0, 40)} using profile ${profile.slice(0, 40)}`;
  }

  async matchScore(profile: string, jobDescription: string) {
    const score = Math.min(100, Math.max(0, 60 + Math.floor((profile.length + jobDescription.length) % 40)));
    return { score };
  }
}
