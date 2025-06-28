import React, { useEffect } from 'react';
import { useI18n } from '../i18n.jsx';

const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'populares', href: '#populares' },
  { key: 'novedades', href: '#novedades' },
  { key: 'tendencias', href: '#tendencias' },
  { key: 'contacto', href: '#contacto' },
];

export default function Navbar() {
  const { lang, t } = useI18n();
  const [activeKey, setActiveKey] = React.useState('home');

  const handleNavClick = key => {
    setActiveKey(key);
    const section = document.getElementById(key);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLangClick = l => {
    if (window.handleLangChange) {
      window.handleLangChange(l);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let current = 'home';
      for (const { key } of navLinks) {
        const section = document.getElementById(key);
        if (section) {
          const { top } = section.getBoundingClientRect();
          const sectionTop = window.scrollY + top;
          if (scrollPosition >= sectionTop) {
            current = key;
          }
        }
      }
      setActiveKey(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

      return (
        <header className="fixed top-0 w-full bg-neutral-900/80 backdrop-blur-sm z-50 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  const section = document.getElementById('home');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="focus:outline-none"
                aria-label="Ir a inicio"
              >
                <img src="/logo.png" alt="Logo" className="h-10 w-10 py-1" />
              </button>
            </div>
            <nav className="flex-1 flex justify-center">
              <div className="flex space-x-2 bg-neutral-800/80 border border-neutral-700 rounded-full px-4 py-1">
                {navLinks.map(({ key }) => (
                  <button
                    key={key}
                    onClick={() => handleNavClick(key)}
                    className={`px-3 py-1 rounded-full font-medium transition-colors
                      ${activeKey === key
                        ? 'font-bold text-white bg-primary/20'
                        : 'text-neutral-400 hover:text-white'}`}
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            </nav>
            <div className="flex items-center space-x-2 ml-4">
              <button
                className={`px-3 py-1 rounded-full text-sm font-semibold border border-neutral-700 transition-colors
                  ${lang === 'es'
                    ? 'bg-neutral-700 text-white'
                    : 'bg-transparent text-neutral-400 hover:text-white'}`}
                onClick={() => handleLangClick('es')}
                type="button"
              >
                ES
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm font-semibold border border-neutral-700 transition-colors
                  ${lang === 'en'
                    ? 'bg-neutral-700 text-white'
                    : 'bg-transparent text-neutral-400 hover:text-white'}`}
                onClick={() => handleLangClick('en')}
                type="button"
              >
                EN
              </button>
            </div>
          </div>
        </header>
      );
}