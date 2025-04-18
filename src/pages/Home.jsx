import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import Footer from '../components/Footer';
import { features } from '../data/features.js';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const options = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = card.dataset.index * 200;
          setTimeout(() => {
            card.classList.add('animate');
          }, delay);
          observer.unobserve(card);
        }
      });
    }, options);

    document.querySelectorAll('.feature-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setShowLoginModal={setShowLoginModal}
        setShowRegisterModal={setShowRegisterModal}
      />

      <main>
        {/* Hero Section */}
        <div className="bg-white w-full">
          <div className="w-full px-4">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Simplifiez la gestion</span>
                <span className="block text-indigo-600 neon-text">de vos projets</span>
              </h1>
              <p className="mt-3 mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
                Taktik vous permet de planifier, collaborer et suivre vos projets en toute simplicité.
                Une solution complète pour les équipes modernes.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row justify-center gap-4 md:mt-8">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="neon-button w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Commencer gratuitement
                  </button>
                </div>
                <div className="rounded-md shadow">
                  <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-12 bg-white w-full">
          <div className="w-full px-4">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Fonctionnalités principales
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Tout ce dont vous avez besoin pour gérer vos projets efficacement
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div 
                      key={index}
                      className="feature-card pt-6"
                      data-index={index}
                    >
                      <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="-mt-6">
                          <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg transition-transform duration-300 hover:scale-110">
                            <Icon className="w-12 h-12 text-indigo-500 transition-colors duration-300 neon-icon-hover" />
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                            {feature.title}
                          </h3>
                          <p className="mt-5 text-base text-gray-500">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Connexion"
      >
        <LoginForm 
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      </Modal>

      <Modal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        title="Inscription"
      >
        <RegisterForm 
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      </Modal>
    </div>
  );
};

export default Home;