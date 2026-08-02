import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../Common/Button';

export function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  return (
    <form
      className="mx-auto mt-16 max-w-md space-y-3 rounded-xl border bg-white p-6 dark:bg-slate-800"
      onSubmit={async (e) => {
        e.preventDefault();
        setError('');
        try {
          await signup(email, password, name);
          navigate(ROUTES.dashboard);
        } catch {
          setError('Unable to sign up');
        }
      }}
    >
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <input className="w-full rounded border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full rounded border p-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full rounded border p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit">Create Account</Button>
    </form>
  );
}
