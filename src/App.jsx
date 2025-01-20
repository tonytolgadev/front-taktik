import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
