import React from 'react';

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-primary hover:bg-red-700 rounded-full font-semibold text-base text-white"
    >
      {children}
    </button>
  );
}