import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-neutral-900/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-display">GameNews</div>
        <nav className="space-x-8">
          {['Home','Novedades','Tendencias','Contacto'].map(label => (
            <a key={label} href="#" className="font-medium hover:text-primary">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}