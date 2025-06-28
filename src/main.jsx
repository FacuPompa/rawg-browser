import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { I18nProvider } from './i18n.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameDetail from './pages/GameDetail';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>
);