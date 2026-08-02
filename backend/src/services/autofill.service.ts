export const autofillService = {
  buildPayload(profile: { name: string; email: string; skills: string[] }) {
    return {
      fullName: profile.name,
      email: profile.email,
      skills: profile.skills.join(', '),
      submittedAt: new Date().toISOString()
    };
  }
};
