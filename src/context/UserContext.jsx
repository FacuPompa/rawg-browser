import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    if (storedUser) setUser(storedUser);
    setFavorites(storedFavs);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const login = (userData) => setUser(userData);
  const logout = () => { setUser(null); setFavorites([]); };
  const addFavorite = (game) => setFavorites(favs => favs.some(f => f.id === game.id) ? favs : [...favs, game]);
  const removeFavorite = (id) => setFavorites(favs => favs.filter(f => f.id !== id));

  return (
    <UserContext.Provider value={{ user, login, logout, favorites, addFavorite, removeFavorite }}>
      {children}
    </UserContext.Provider>
  );
}
