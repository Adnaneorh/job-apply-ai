import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function ProfilePage() {
  const [skills, setSkills] = useState('');
  const [summary, setSummary] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    api.get('/profile').then(({ data }) => {
      setSkills((data?.skills || []).join(', '));
      setSummary(data?.summary || '');
    });
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">User Profile</h2>
      <form className="space-y-3 rounded bg-white p-4 shadow" onSubmit={async (e) => {
        e.preventDefault();
        await api.put('/profile', { summary, skills: skills.split(',').map((s) => s.trim()).filter(Boolean), experiences: [] });
        if (resume) {
          const fd = new FormData();
          fd.append('resume', resume);
          await api.post('/profile/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
      }}>
        <textarea className="w-full rounded border px-3 py-2" rows={4} placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" placeholder="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} />
        <input type="file" onChange={(e) => setResume(e.target.files?.[0] || null)} />
        <button className="rounded theme-bg px-4 py-2 text-white" type="submit">Save profile</button>
      </form>
    </div>
  );
}
