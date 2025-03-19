import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login_check`, {
        email,
        password,
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Récupérer les informations utilisateur
        const userResponse = await axios.get(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${response.data.token}` }
        });
        
        localStorage.setItem('user', JSON.stringify(userResponse.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de connexion' };
    }
  },
  
  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur d\'inscription' };
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

export default authService;

// Configurer l'intercepteur Axios
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Gérer les erreurs d'authentification
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide
      authService.logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);