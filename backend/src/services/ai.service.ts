import OpenAI from 'openai';
import { env } from '../config/env.js';

const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

async function generate(prompt: string) {
  if (!client) return `Demo response: ${prompt.slice(0, 120)}`;
  const completion = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: prompt
  });
  return completion.output_text;
}

export const aiService = {
  generateAnswer: (question: string, profile: string) => generate(`Answer this job screening question professionally.\nQuestion: ${question}\nProfile: ${profile}`),
  tailorResume: (resume: string, jobDescription: string) => generate(`Tailor this resume for the job description.\nResume: ${resume}\nJob: ${jobDescription}`),
  generateCoverLetter: (profile: string, jobDescription: string) => generate(`Write a concise cover letter.\nProfile: ${profile}\nJob: ${jobDescription}`)
};
