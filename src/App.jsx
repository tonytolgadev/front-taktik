import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
    </Routes>
  );
};

export default App;
