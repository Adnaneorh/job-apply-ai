import { useContext } from 'react';
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { ProfileSetup } from '../components/Profile/ProfileSetup';
import { ResumeUpload } from '../components/Profile/ResumeUpload';
import { ExperienceEditor } from '../components/Profile/ExperienceEditor';
import { PreferencesEditor } from '../components/Profile/PreferencesEditor';
import type { Profile } from '../types';
import { NotificationContext } from '../context/NotificationContext';

export function ProfilePage() {
  const notifier = useContext(NotificationContext);
  const { data: profile } = useFetch(async () => (await api.get<{ profile: Profile }>('/profile')).data.profile, []);

  if (!profile) return null;

  return (
    <div className="space-y-4">
      <ProfileSetup profile={profile} />
      <ResumeUpload
        onUpload={async (file) => {
          const form = new FormData();
          form.append('resume', file);
          await api.post('/profile/resume', form);
          notifier?.push('Resume uploaded');
        }}
      />
      <ExperienceEditor
        onAdd={async (role, company) => {
          await api.post('/profile/experience', { role, company });
          notifier?.push('Experience added');
        }}
      />
      <PreferencesEditor
        initialLocation={profile.preferredLocation}
        onSave={async (location) => {
          await api.put('/profile', { preferredLocation: location });
          notifier?.push('Preferences saved');
        }}
      />
    </div>
  );
}
