import axios from 'axios';
import { config } from '../config/env';

export const api = axios.create({
  baseURL: config.apiUrl,
});

// Добавляем перехватчик для установки токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  
  register: (data: {
    email: string;
    password: string;
    phoneNumber: string;
  }) => api.post('/auth/register', data),
  
  getCurrentUser: () => api.get('/users/me'),
  
  updateProfile: (id: number, data: any) => 
    api.put(`/users/${id}`, data),
  
  // Добавленные методы для работы с проектами домов
  getHouseProjects: () => 
    api.get('/house-projects/client/list'),
  
  getHouseProject: (id: number) => 
    api.get(`/house-projects/${id}`),
  
  selectHouseProject: (houseProjectId: number, notes?: string) => 
    api.post('/user-house-projects', { houseProjectId, notes }),
  
  getUserHouseProjects: () => 
    api.get('/user-house-projects/my-projects'),
}; 
