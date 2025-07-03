import React from 'react';
import GameCard from './GameCard';
import { useI18n } from '../i18n.jsx';

export default function GameGrid({ games }) {
  const { t } = useI18n();

  if (!games || games.length === 0) {
    return (
      <p className="text-center py-8">
        {t('notFound')}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map(game => (
        <GameCard key={game.id} id={game.id} title={game.name} image={game.background_image} genre={game.genres[0]?.name} date={new Date(game.released).toLocaleDateString()} platforms={game.platforms?.map(p => p.platform.name) || []} />
      ))}
    </div>
  );
}