import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameSearch from './components/GameSearch';
import GameGrid from './components/GameGrid';
import Footer from './components/Footer';
import { fetchGamesList, fetchGameDetails, fetchGameScreenshots } from './services/rawg';
import { useI18n } from './i18n.jsx';

export default function App() {
  const [populares, setPopulares] = useState([]);
  const [novedades, setNovedades] = useState([]);
  const [tendencias, setTendencias] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { t, lang, setLang } = useI18n();
  const [setSelectedGame] = useState(null);

  const handleShowDetails = async (gameId) => {
    const game = await fetchGameDetails(gameId);
    const screenshots = await fetchGameScreenshots(gameId);
    setSelectedGame({ ...game, screenshots });
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const sixMonthsAgo = new Date(Date.now() - 15552000000).toISOString().split('T')[0];

    fetchGamesList({ pageSize: 8, ordering: '-added' })
      .then(setPopulares);

    fetchGamesList({ pageSize: 8, ordering: '-released', dates: `${sixMonthsAgo},${today}` })
      .then(setNovedades);

    fetchGamesList({ pageSize: 8, ordering: '-rating', dates: `${sixMonthsAgo},${today}`, platforms: '1, 18, 7' })
      .then(setTendencias);
  }, []);

  useEffect(() => {
    window.handleLangChange = l => {
      if (l !== lang) setLang(l);
    };
    return () => { window.handleLangChange = null; };
  }, [lang, setLang]);

  return (
    <div className="bg-neutral-900 text-neutral-100 min-h-screen transition-all">
      <Navbar />
      <main className="pt-20">
        <Hero />

        <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 my-12">
          <GameSearch onResults={setSearchResults} />
          {searchResults.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-4">{t('results')}</h2>
              <GameGrid games={searchResults} onShowDetails={handleShowDetails} />
            </>
          )}
        </section>

        <section id="populares" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 my-12">
          <h2 className="text-3xl font-bold mb-4">{t('populares')}</h2>
          <GameGrid games={populares} onShowDetails={handleShowDetails} />
        </section>

        <section id="novedades" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 my-12">
          <h2 className="text-3xl font-bold mb-4">{t('latest')}</h2>
          <GameGrid games={novedades} onShowDetails={handleShowDetails} />
        </section>

        <section id="tendencias" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 my-12">
          <h2 className="text-3xl font-bold mb-4">{t('tendencias')}</h2>
          <GameGrid games={tendencias} onShowDetails={handleShowDetails} />
        </section>
      </main>
      <Footer />
    </div>
  );
}