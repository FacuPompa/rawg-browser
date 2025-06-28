import React, { createContext, useContext, useState } from 'react';
import { translations } from './i18nData.js';

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('es');
  const t = key => translations[lang][key] || key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}