import React, { useState } from 'react';
import { useUser } from '../context/useUser';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar.jsx';
import { useI18n } from '../i18n.jsx';

export default function Login() {
  const { user, login, logout } = useUser();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  React.useEffect(() => { if (user) navigate('/'); }, [user, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = e => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === form.email)) {
      setError(t('emailTaken'));
      return;
    }
    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    login(form);
  };

  const handleLogin = e => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === form.email && u.password === form.password);
    if (!found) {
      setError(t('invalidCredentials'));
      return;
    }
    login(found);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center">
        <div className="bg-neutral-800/95 p-8 rounded-xl shadow-2xl max-w-md w-full">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-full mb-6 cursor-pointer transition" >
            <ArrowLeft size={18} /> {t('back')}
          </button>

          <div className="flex mb-6 gap-2">
            <button className={`flex-1 py-2 cursor-pointer rounded-xl font-bold transition ${tab === 'login' ? 'bg-neutral-700 text-neutral-300' : 'bg-primary text-white'}`} onClick={() => { setTab('login'); setError(''); }} type="button" >
              {t('login')}
            </button>
            <button className={`flex-1 cursor-pointer py-2 rounded-xl font-bold transition ${tab === 'register' ? 'bg-neutral-700 text-neutral-300' : 'bg-primary text-white'}`} onClick={() => { setTab('register'); setError(''); }} type="button">
              {t('register')}
            </button>
          </div>

          {user ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{t('greeting')}, {user.username}!</h2>
              <button onClick={logout} className="bg-primary text-white px-4 py-2 rounded-full mt-4">
                {t('logout')}
              </button>
            </div>
          ) : tab === 'login' ? (
            <form onSubmit={handleLogin}>
              <input name="email" type="email" placeholder="Email" required className="w-full mb-4 px-3 py-2 rounded bg-neutral-900 text-white placeholder-neutral-400 focus:outline-none" onChange={handleChange} autoComplete="username" />
              <input name="password" type="password" placeholder={t('password')} required className="w-full mb-6 px-3 py-2 rounded bg-neutral-900 text-white placeholder-neutral-400 focus:outline-none" onChange={handleChange} autoComplete="current-password" />
              {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
              <button type="submit" className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full w-full font-semibold hover:bg-red-600 transition">
                {t('login')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <input name="username" placeholder={t('username')} required className="w-full mb-4 px-3 py-2 rounded bg-neutral-900 text-white placeholder-neutral-400 focus:outline-none" onChange={handleChange} autoComplete="username" />
              <input name="email" type="email" placeholder="Email" required className="w-full mb-4 px-3 py-2 rounded bg-neutral-900 text-white placeholder-neutral-400 focus:outline-none" onChange={handleChange} autoComplete="email" />
              <input name="password" type="password" placeholder={t('password')} required className="w-full mb-6 px-3 py-2 rounded bg-neutral-900 text-white placeholder-neutral-400 focus:outline-none" onChange={handleChange} autoComplete="new-password" />
              {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
              <button type="submit" className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full w-full font-semibold hover:bg-red-600 transition">
                {t('register')}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
