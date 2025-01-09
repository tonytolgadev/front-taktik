import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Ajout du BrowserRouter pour gérer les routes */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
