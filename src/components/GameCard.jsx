import React from 'react';
import Button from './Button';

export default function GameCard({ title, image, genre, date }) {
  return (
    <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-neutral-100">{title}</h3>
        <p className="text-sm text-neutral-400">{genre} • {date}</p>
        <Button>Detalles</Button>
      </div>
    </div>
  );
}