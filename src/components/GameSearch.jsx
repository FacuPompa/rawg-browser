import React, { useState } from 'react';
import { fetchGamesList } from '../services/rawg';

export default function GameSearch({ onResults }) {
  const [term, setTerm] = useState('');

  const handleSearch = async e => {
    e.preventDefault();
    const results = await fetchGamesList({ search: term, pageSize: 12 });
    onResults(results);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center mb-6">
      <input
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Buscar juego…"
        className="w-full md:w-1/2 px-4 py-2 rounded-full bg-neutral-800 text-neutral-100 focus:outline-none"
      />
      <button type="submit" className="ml-4 px-4 py-2 bg-primary rounded-full text-white">
        Buscar
      </button>
    </form>
  );
}
