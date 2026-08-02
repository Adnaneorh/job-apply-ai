import type { Profile } from '../../types';

export function ProfileSetup({ profile }: { profile: Profile }) {
  return (
    <section className="rounded-lg border bg-white p-4 dark:bg-slate-800">
      <h2 className="text-lg font-semibold">{profile.fullName}</h2>
      <p>{profile.title}</p>
      <p className="text-sm text-slate-500">Skills: {profile.skills.join(', ') || 'Add your skills'}</p>
    </section>
  );
}
