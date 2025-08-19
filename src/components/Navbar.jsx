import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from "react-icons/io5";

const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'populares', href: '#populares' },
  { key: 'novedades', href: '#novedades' },
  { key: 'tendencias', href: '#tendencias' },
];

export default function Navbar() {
  const { lang, t, setLang } = useI18n();
  const [activeKey, setActiveKey] = React.useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDetailPage = location.pathname.startsWith('/game/');

  const currentActiveKey = isDetailPage ? null : activeKey;

  const handleNavClick = key => {
    setActiveKey(key);
    setIsMenuOpen(false);
    if (isDetailPage || location.pathname !== '/') {
      navigate('/', { state: { scrollTo: key } });
    } else {
      const section = document.getElementById(key);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  const handleLangClick = () => {
    setLang(lang === 'es' ? 'en' : 'es');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isDetailPage) return;
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
  }, [isDetailPage]);

  return (
    <header className="fixed top-0 w-full bg-neutral-900/80 backdrop-blur-sm z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 align-items-center">
        <div className="flex items-center">
          <button type="button" onClick={() => handleNavClick('home')} className="focus:outline-none cursor-pointer" aria-label="Go to home">
            <img src="/logo.png" alt="Logo" className="h-12 w-12 py-1 cursor-pointer transition-transform duration-300 hover:scale-105" />
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-neutral-100 focus:outline-none order-2"
          aria-label="Open menu"
        >
          {isMenuOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>

        <nav className={`md:flex flex-1 justify-center ${isMenuOpen ? 'block absolute top-full left-0 w-full bg-neutral-900/80 py-4' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 bg-neutral-800/80 border border-neutral-700 rounded-full px-4 items-center justify-center">
            {navLinks.map(({ key }) => (
              <button key={key} onClick={() => handleNavClick(key)} className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-colors line-height-normal${currentActiveKey === key ? 'font-bold text-white bg-primary/20' : 'text-neutral-400 hover:text-white'}`} >
                {t(key)}
              </button>
            ))}

            {user ? (
              <button className="md:hidden px-3 py-1 rounded-full bg-primary cursor-pointer text-white font-semibold hover:bg-neutral-700" onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} >
                Perfil
              </button>
            ) : (
              <button className="md:hidden px-3 py-1 rounded-full bg-primary cursor-pointer text-white font-semibold hover:bg-neutral-700" onClick={() => { navigate('/login'); setIsMenuOpen(false); }} >
                {t('login')}
              </button>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center ml-4">
          <button className="px-3 py-1 rounded-full text-sm font-semibold cursor-pointer border border-neutral-700 transition-colors
              bg-neutral-700 text-white hover:bg-neutral-600" onClick={handleLangClick} type="button">
            {lang === 'es' ? 'ES' : 'EN'}
          </button>
            {user ? (
          <button className="ml-2 px-3 py-1 rounded-full bg-primary cursor-pointer text-white font-semibold hover:bg-neutral-700" onClick={() => navigate('/profile')} >
            Perfil
          </button>
        ) : (
          <button className="ml-2 px-3 py-1 rounded-full bg-primary cursor-pointer text-white font-semibold hover:bg-neutral-700" onClick={() => navigate('/login')} >
            {t('login')}
          </button>
        )}
      </div>
      </div>
    </header>
  );
}