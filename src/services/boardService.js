import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8000/api';

const boardService = {
  getLists: async () => {
    try {
      const response = await axios.get(`${API_URL}/lists`, {
        headers: authService.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors du chargement des listes' };
    }
  },
  
  createList: async (title, position = null) => {
    try {
      const response = await axios.post(`${API_URL}/lists`, {
        title,
        position
      }, {
        headers: authService.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la création de la liste' };
    }
  },
  
  updateList: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/lists/${id}`, data, {
        headers: authService.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la mise à jour de la liste' };
    }
  },
  
  deleteList: async (id) => {
    try {
      await axios.delete(`${API_URL}/lists/${id}`, {
        headers: authService.getAuthHeader()
      });
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la suppression de la liste' };
    }
  },
  
  createCard: async (title, description, listId, position = null) => {
    try {
      const response = await axios.post(`${API_URL}/cards`, {
        title,
        description,
        listId,
        position
      }, {
        headers: authService.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la création de la carte' };
    }
  },
  
  updateCard: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/cards/${id}`, data, {
        headers: authService.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la mise à jour de la carte' };
    }
  },
  
  deleteCard: async (id) => {
    try {
      await axios.delete(`${API_URL}/cards/${id}`, {
        headers: authService.getAuthHeader()
      });
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la suppression de la carte' };
    }
  }
};

export default boardService;