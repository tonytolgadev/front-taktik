import React from 'react';
const Footer = () => (
<footer className="bg-gray-800">
<div className="w-full py-12 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        Produit
      </h3>
      <ul className="mt-4 space-y-4">
        <li>
          <a href="#" className="text-base text-gray-300 hover:text-white">
            Fonctionnalités
          </a>
        </li>
        <li>
          <a href="#" className="text-base text-gray-300 hover:text-white">
            Tarifs
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        Société
      </h3>
      <ul className="mt-4 space-y-4">
        <li>
          <a href="#" className="text-base text-gray-300 hover:text-white">
            À propos
          </a>
        </li>
        <li>
          <a href="#" className="text-base text-gray-300 hover:text-white">
            Blog
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        Support
      </h3>
      <ul className="mt-4 space-y-4">
        <li>
          <a href="#" className="text-base text-gray-300 hover:text-white">
            Centre d'aide
          </a>
        </li>
        <li>
          <a href="#" className="text-base text-gray-300 hover:text-white">
            Contact
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        Légal
      </h3>
      <ul className="mt-4 space-y-4">
        <li>
          <a href="#" className="text-base text-gray-300 hover:text-white">
            Confidentialité
          </a>
        </li>
        <li>
          <a href="#" className="text-base text-gray-300 hover:text-white">
            Conditions
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
    <div className="flex space-x-6 md:order-2">
      <span className="text-base text-gray-400">
        &copy; 2025 Taktik. Tous droits réservés.
      </span>
    </div>
  </div>
</div>
</footer>
);
export default Footer;