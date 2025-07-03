import React from 'react';
import { useUser } from '../context/useUser';
import { useI18n } from '../i18n.jsx';
import Navbar from './Navbar';
import GameCard from './GameCard';
import Footer from './Footer';

export default function UserProfile() {
  const { user, favorites, logout } = useUser();
  const { t } = useI18n();

  if (!user) return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Navbar />
      <div className="flex justify-center items-center h-[70vh]">
        <div className="bg-neutral-800/90 p-8 rounded-xl shadow-2xl text-center">
          {t('mustLogin')}
        </div>
      </div>
    </div>
  );

return (
  <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
    <Navbar />
    <div className="mt-24 mb-16 flex-grow flex justify-center items-center px-4">
      <div className="bg-neutral-800/90 p-8 rounded-xl shadow-2xl w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {t('greeting')}, <span className="text-primary">{user.username}</span>!
            </h2>
          </div>
          <button onClick={logout} className="bg-primary cursor-pointer text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition">
            {t('logout')}
          </button>
        </div>
        <h3 className="text-2xl font-bold mb-2">{t('favorites')}</h3>
        {favorites.length === 0 ? (
          <p>{t('noFavorites')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map(game => (
              <GameCard key={game.id} id={game.id} title={game.title} image={game.image} genre={game.genre} date={game.date} platforms={game.platforms} />
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer />
  </div>
);
}
