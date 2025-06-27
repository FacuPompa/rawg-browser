// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameSearch from './components/GameSearch';
import GameGrid from './components/GameGrid';
import Footer from './components/Footer';
import { fetchGamesList } from './services/rawg';

export default function App() {
  const [games, setGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchGamesList({ pageSize: 16 })
      .then(list => setGames(list))
      .catch(err => console.error(err));
  }, []);

  const gamesToShow = searchResults.length > 0 ? searchResults : games;

  return (
    <div className="bg-neutral-900 text-neutral-100 min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Hero />

        <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 my-12">
          <GameSearch onResults={setSearchResults} />

          <h2 className="text-3xl font-bold mb-4">
            {searchResults.length > 0 ? 'Resultados de búsqueda' : 'Últimos Lanzamientos'}
          </h2>

          <GameGrid games={gamesToShow} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
