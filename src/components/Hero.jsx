import React from 'react';
import Button from './Button';
import { useI18n } from '../i18n.jsx';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      className="relative bg-[url('/hero-bg.jpg')] bg-center bg-cover min-h-[60vh] flex items-end"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
      <div className="relative w-full flex items-end justify-start">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-12 py-12 space-y-4 text-left">
          <h1 className="text-3xl md:text-5xl font-display">
            {t('discover')}
          </h1>
          <p className="text-base md:text-lg text-neutral-300">
            {t('heroDesc')}
          </p>
          <Button
            onClick={() =>
              window.scrollTo({
                top: document.getElementById('novedades').offsetTop,
                behavior: 'smooth',
              })
            }
          >
            {t('seeNews')}
          </Button>
        </div>
      </div>
    </section>
  );
}