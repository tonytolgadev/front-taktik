import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Board from './pages/Board/Board';
import DashboardLayout from './layouts/DashboardLayout';
import authService from './services/authService';

// Composant pour les routes protégées
const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/board" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Board />
          </DashboardLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;