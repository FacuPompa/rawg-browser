import React from 'react';
import Button from './Button';

export default function Hero() {
  return (
    <section className="relative bg-[url('/hero-bg.jpg')] bg-center bg-cover min-h-[60vh] flex items-end">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
      <div className="relative max-w-xl p-4 md:p-6 lg:p-12 space-y-4">
        <h1 className="text-5xl font-display">Descubre tu próximo juego favorito</h1>
        <p className="text-base font-medium text-neutral-100/90">
          Explora reseñas, trailers y más de los últimos lanzamientos y clásicos.
        </p>
        <Button>Ver novedades</Button>
      </div>
    </section>
  );
}