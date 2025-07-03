import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { I18nProvider } from './i18n.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameDetail from './pages/GameDetail';
import Login from './components/Login';
import UserProfile from './components/UserProfile.jsx';
import { UserProvider } from './context/UserContext.jsx';
import 'keen-slider/keen-slider.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/game/:id" element={<GameDetail />} />
          </Routes>
        </BrowserRouter>
      </UserProvider> 
    </I18nProvider>
  </React.StrictMode>
);