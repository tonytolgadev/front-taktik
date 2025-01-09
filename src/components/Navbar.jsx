import React from 'react';
import { Layout, Menu } from 'lucide-react';

const Navbar = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  setShowLoginModal, 
  setShowRegisterModal 
}) => (
  <nav className="bg-white shadow">
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Layout className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold text-indigo-600 neon-text">Taktik</span>
        </div>

        {/* Navigation pour desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#features" className="text-gray-600 hover:text-gray-900">Fonctionnalités</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900">Tarifs</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">À propos</a>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Se connecter
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            S'inscrire
          </button>
        </div>

        {/* Menu burger pour mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    {/* Menu mobile */}
    {isMenuOpen && (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
            Fonctionnalités
          </a>
          <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
            Tarifs
          </a>
          <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
            À propos
          </a>
          <button
            onClick={() => setShowLoginModal(true)}
            className="w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
          >
            Se connecter
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
          >
            S'inscrire
          </button>
        </div>
      </div>
    )}
  </nav>
);

export default Navbar;