import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      loadFavorites(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      saveFavorites(user, favorites);
    }
    else {
      localStorage.removeItem('user');
      localStorage.removeItem(`favorites_${user?.email}`);
    }
  }, [user, favorites]);

  const loadFavorites = (user) => {
    const storedFavs = JSON.parse(localStorage.getItem(`favorites_${user.email}`)) || [];
    setFavorites(storedFavs);
  };

  const saveFavorites = (user, favorites) => {
    localStorage.setItem(`favorites_${user.email}`, JSON.stringify(favorites));
  };

  const login = (userData) => {
    setUser(userData);
    loadFavorites(userData);
  };
  const logout = () => { setUser(null); setFavorites([]); };
  const addFavorite = (game) => setFavorites(favs => favs.some(f => f.id === game.id) ? favs : [...favs, game]);
  const removeFavorite = (id) => setFavorites(favs => favs.filter(f => f.id !== id));

  return (
    <UserContext.Provider value={{ user, login, logout, favorites, addFavorite, removeFavorite }}>
      {children}
    </UserContext.Provider>
  );
}