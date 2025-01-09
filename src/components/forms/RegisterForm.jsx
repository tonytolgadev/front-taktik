const RegisterForm = ({ onSwitchToLogin }) => (
    <form className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Nom"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-200"
      >
        S'inscrire
      </button>
      <p className="text-center text-sm text-gray-600">
        Déjà un compte ?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin} // Utiliser le prop ici
          className="text-indigo-600 hover:underline"
        >
          Se connecter
        </button>
      </p>
    </form>
  );
  export default RegisterForm;