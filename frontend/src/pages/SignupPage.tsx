import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/auth';

export function SignupPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="mx-auto mt-20 w-full max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Sign up</h2>
      <form className="space-y-3" onSubmit={async (e) => {
        e.preventDefault();
        const { data } = await api.post('/auth/signup', { name, email, password });
        auth.login(data.token, data.user);
        navigate('/');
      }}>
        <input className="w-full rounded border px-3 py-2" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded theme-bg py-2 text-white" type="submit">Create account</button>
      </form>
      <p className="mt-3 text-sm">Already have an account? <Link className="theme-text" to="/login">Login</Link></p>
    </div>
  );
}
