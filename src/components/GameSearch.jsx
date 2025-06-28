import React, { useState } from 'react';
import { fetchGamesList } from '../services/rawg';
import { useI18n } from '../i18n.jsx';

export default function GameSearch({ onResults }) {
  const [term, setTerm] = useState('');
  const { t } = useI18n();

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
        placeholder={t('searchPlaceholder')}
        className="w-full md:w-1/2 px-4 py-2 rounded-full bg-neutral-800 text-neutral-100 focus:outline-none"
      />
    </form>
  );
}