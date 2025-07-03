import React, { useState } from 'react';
import Button from './Button';
import { useI18n } from '../i18n.jsx';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser.js';

export default function GameCard({ title, image, genre, date, platforms, id }) {
  const { t } = useI18n();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const { user, favorites, addFavorite, removeFavorite } = useUser();

  const filteredPlatforms = platforms.filter(
    p => p.toLowerCase() !== 'linux' && p.toLowerCase() !== 'macos'
  );

  const mainPlatforms = filteredPlatforms.slice(0, 3);
  const extraPlatforms = filteredPlatforms.slice(3);

  const isFav = favorites.some(f => f.id === id);

  const handleRemoveFavorite = () => {
    removeFavorite(id);
    setShowConfirmModal(false);
  };

  const handleHeartClick = () => {
    if (isFav) {
      setShowConfirmModal(true);
    } else {
      addFavorite({ id, title, image, genre, date, platforms });
    }
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    navigate(`/game/${id}`);
  };

  return (
    <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-neutral-100">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {genre && (
            <span className="bg-neutral-900 text-neutral-200 text-xs px-2 py-1 rounded-full">
              {genre}
            </span>
          )}
          {mainPlatforms.map((platform, idx) => (
            <span key={platform + idx} className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
              {platform}
            </span>
          ))}
          {extraPlatforms.length > 0 && (
            <span
              className="relative bg-primary/40 text-white text-xs px-2 py-1 rounded-full cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              +{extraPlatforms.length}
              {showTooltip && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 bg-neutral-900 text-white text-xs rounded shadow-lg px-3 py-2 max-w-xs whitespace-pre-line">
                  {extraPlatforms.map((platform, idx) => (
                    <div key={platform + idx} className="whitespace-nowrap">{platform}</div>
                  ))}
                </div>
              )}
            </span>
          )}
          {date && (
            <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded-full border border-neutral-700">
              {date}
            </span>
          )}
        </div>
        <Button onClick={handleDetailsClick}>{t('details')}</Button>
      </div>

      {user && (
        <>
          <button
            onClick={handleHeartClick}
            className="absolute top-3 right-3 z-10 cursor  text-red-500 hover:scale-110 transition-transform"
            title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42  4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09  3.81 14.76 3 16.5 3 19.58 3 22 5.42 22  8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          {showConfirmModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-neutral-800 text-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h2 className="text-xl font-semibold mb-4">¿Quitar de favoritos?</h2>
                <p className="mb-6">¿Estás seguro de que querés quitar este juego de tus favoritos?</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowConfirmModal(false)} className="cursor-pointer bg-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-600" >
                    Cancelar
                  </button>
                  <button onClick={handleRemoveFavorite} className="cursor-pointer bg-red-600 px-4 py-2 rounded-full hover:bg-red-500" >
                    Quitar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
