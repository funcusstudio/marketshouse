import { useState, useEffect } from 'react';
import { apiService } from '../services/api.service';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'client' | 'executor';
  phoneNumber?: string;
  isAdmin: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await apiService.login({ email, password });
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Ошибка входа:', error);
      return false;
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: 'client' | 'executor';
    phoneNumber: string;
  }) => {
    try {
      await apiService.register(userData);
      return await login(userData.email, userData.password);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };
}; 