import React from 'react';
import { useI18n } from '../i18n.jsx';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-neutral-800 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-neutral-400">
        {t('copyright')}
      </div>
    </footer>
  );
}