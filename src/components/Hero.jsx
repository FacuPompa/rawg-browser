import React from 'react';
import Button from './Button';
import { useI18n } from '../i18n.jsx';
import GameCarousel from './GameCarousel';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" className="relative min-h-[65vh] mt-auto flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <GameCarousel />
      </div>
      <div className="relative w-full flex items-end justify-start z-10">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-12 py-12 space-y-4 text-left">
          <h1 className="text-3xl md:text-5xl font-display text-white text-shadow-lg/20">
            {t('discover')}
          </h1>
          <p className="text-base md:text-lg text-neutral-300 text-shadow-lg/20">
            {t('heroDesc')}
          </p>
        </div>
      </div>
    </section>
  );
}
