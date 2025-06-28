import React, { useState } from 'react';
import Button from './Button';
import { useI18n } from '../i18n.jsx';
import { useNavigate } from 'react-router-dom';

export default function GameCard({ title, image, genre, date, platforms, id }) {
  const { t } = useI18n();
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const filteredPlatforms = platforms.filter(
    p => p.toLowerCase() !== 'linux' && p.toLowerCase() !== 'macos'
  );

  const mainPlatforms = filteredPlatforms.slice(0, 3);
  const extraPlatforms = filteredPlatforms.slice(3);

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
            <span
              key={platform + idx}
              className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full"
            >
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
        <Button onClick={handleDetailsClick}>
          {t('details')}
        </Button>
      </div>
    </div>
  );
}