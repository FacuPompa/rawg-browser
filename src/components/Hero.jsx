import React from 'react';
import Button from './Button';
import { useI18n } from '../i18n.jsx';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id='home' className="relative bg-[url('/hero-bg.jpg')] bg-center bg-cover min-h-[60vh] flex items-end">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
      <div className="relative max-w-xl p-4 md:p-6 lg:p-12 space-y-4">
        <h1 className="text-5xl font-display">
          {t('discover')}
        </h1>
        <p className="text-lg text-neutral-300">
          {t('heroDesc')}
        </p>
        <Button onClick={() => window.scrollTo({ top: document.getElementById('novedades').offsetTop, behavior: 'smooth' })}>
          {t('seeNews')}
        </Button>
      </div>
    </section>
  );
}