import { useState } from 'react';
import { Button } from '../Common/Button';

export function ResumeUpload({ onUpload }: { onUpload: (file: File) => Promise<void> }) {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="rounded-lg border bg-white p-4 dark:bg-slate-800">
      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button className="mt-2" onClick={() => file && onUpload(file)} disabled={!file}>Upload Resume</Button>
    </div>
  );
}
