import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/auth';

export function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="mx-auto mt-20 w-full max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Login</h2>
      <form className="space-y-3" onSubmit={async (e) => {
        e.preventDefault();
        setError('');
        try {
          const { data } = await api.post('/auth/login', { email, password });
          auth.login(data.token, data.user);
          navigate('/');
        } catch {
          setError('Login failed');
        }
      }}>
        <input className="w-full rounded border px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded theme-bg py-2 text-white" type="submit">Login</button>
      </form>
      <p className="mt-3 text-sm">No account? <Link className="theme-text" to="/signup">Sign up</Link></p>
    </div>
  );
}
