import React from 'react';

export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        px-6 py-2
        rounded-full
        bg-primary
        text-white
        font-semibold
        shadow
        transition
        duration-200
        ease-out
        hover:bg-red-600
        hover:scale-105
        hover:shadow-lg
        active:scale-100
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        focus:ring-offset-2
        focus:ring-offset-neutral-900
      "
    >
      {children}
    </button>
  );
}