import { AuthProvider } from 'react-admin';
import axios from 'axios';
import { apiUrl } from './dataProvider';

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                email: username,
                password,
            });
            
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return Promise.resolve();
            }
            return Promise.reject();
        } catch (error) {
            return Promise.reject(error);
        }
    },
    
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.resolve();
    },
    
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    
    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },
    
    getPermissions: () => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            return Promise.resolve(parsedUser.isAdmin ? 'admin' : 'user');
        }
        return Promise.reject();
    },
}; 