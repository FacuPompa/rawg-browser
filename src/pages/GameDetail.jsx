import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchGameDetails, fetchGameScreenshots, fetchGameTrailers } from '../services/rawg';
import { useNavigate } from 'react-router-dom';
import ScreenshotCarousel from '../components/ScreenshotCarousel';

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGameDetails(id).then(setGame);
    fetchGameScreenshots(id).then(setScreenshots);
    fetchGameTrailers(id).then(setTrailers);
  }, [id]);

  if (!game) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex items-left justify-center">
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 text-neutral-100 min-h-screen">
      <Navbar />
      <div
        className="relative w-full h-[45vh] flex items-end"
        style={{ backgroundImage: `url(${game.background_image})`, backgroundSize: 'cover', backgroundPosition: 'top center', }} >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <div className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto px-4 pb-3 pt-8 text-left">
            <button onClick={() => navigate('/')} aria-label="Volver al inicio" className="mb-4 p-2 rounded-full bg-neutral-800 cursor-pointer hover:bg-neutral-700 transition-colors" >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-3.5">{game.name}</h1>
            <div className="flex flex-wrap gap-4 items-center my-1">
              <span className="bg-primary/80 text-white text-sm px-3 py-1 rounded-full font-semibold">
                {game.genres?.map(g => g.name).join(', ')}
              </span>
              <span className="bg-neutral-800 text-neutral-300 text-sm px-3 py-1 rounded-full">
                {game.released}
              </span>
              <span className="bg-neutral-800 text-yellow-400 text-sm px-3 py-1 rounded-full">
                ★ {game.rating} / 5
              </span>
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-10 md:px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trailers.length > 0 && trailers[0].data && trailers[0].data.max && (
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-2">Tráiler</h2>
              <video src={trailers[0].data.max} poster={trailers[0].preview} controls className="w-full rounded-lg shadow-lg max-h-[400px] bg-black" />
            </div>
          )}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-2">Screenshots</h2>
            <ScreenshotCarousel screenshots={screenshots} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Descripción</h2>
          <div className="text-neutral-300 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: game.description || 'Sin descripción.' }} />
        </div>

        {game.platforms && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Plataformas</h2>
            <div className="flex flex-wrap gap-2">
              {game.platforms.map(p => (
                <span key={p.platform.id} className="bg-neutral-800 text-neutral-200 text-xs px-3 py-1 rounded-full" >
                  {p.platform.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}