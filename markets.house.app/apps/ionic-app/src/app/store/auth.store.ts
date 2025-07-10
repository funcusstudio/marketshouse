import { create } from 'zustand';
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

interface AuthState {
  user: User | null;
  loading: boolean;
  token: string | null;
  
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setToken: (token: string | null) => void;
  
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    phoneNumber: string;
    userType: 'client' | 'executor';
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  token: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setToken: (token) => set({ token }),

  initialize: async () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      set({ 
        token,
        user: JSON.parse(userData),
        loading: false
      });
    } else {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    try {
      const { data } = await apiService.login({ email, password });
      console.log("data - ", data);

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      set({
        token: data.access_token,
        user: data.user
      });

      return true;
    } catch (error: unknown) {
      console.error("email - ",email)
      console.error("password - ",password)
      // Преобразуем error в читаемый вид
      if (error instanceof Error) {
        console.error('Ошибка входа:', error.message);
        console.error('Stack trace:', error.stack);
      } else if (typeof error === 'object' && error !== null) {
        console.error('Ошибка входа:', JSON.stringify(error, null, 2));
      } else {
        console.error('Неизвестная ошибка:', error);
      }

      return false;
    }
  },

  register: async (userData) => {
    try {
      await apiService.register(userData);
      return get().login(userData.email, userData.password);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ 
      user: null,
      token: null
    });
  },

  updateUser: (userData) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      set({ user: updatedUser });
    }
  },
})); 