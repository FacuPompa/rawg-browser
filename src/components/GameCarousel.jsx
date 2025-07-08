import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { fetchGamesList } from '../services/rawg';

export default function GameCarousel() {
  const [games, setGames] = useState([]);
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    slides: { perView: 1 },
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadGames() {
      try {
        const today = new Date().toISOString().split('T')[0];
        const pastMonth = new Date();
        pastMonth.setMonth(pastMonth.getMonth() - 2);
        const fromDate = pastMonth.toISOString().split('T')[0];

        const data = await fetchGamesList({
          ordering: '-added',
          page_size: 5,
          dates: `${fromDate},${today}`,
          exclude_additions: true,
        });
        setGames(data);
      } catch (err) {
        console.error('Error fetching games for carousel:', err);
        setHasError(true);
      }
    }
    loadGames();
  }, []);

  const handleImageError = () => {
    setHasError(true);
  };

  if (hasError || games.length === 0) return null;

  return (
    <div ref={sliderRef} className="keen-slider w-full h-full">
      {games.map((game) => (
        <div key={game.id} className="keen-slider__slide">
          <img src={game.background_image} alt={game.name} onError={handleImageError} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
    </div>
  );
}
