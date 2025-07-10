// Переменные окружения доступны через import.meta.env
export const config = {
  apiUrl: "https://mhsale.online/api/",
  appTitle: import.meta.env.VITE_APP_TITLE,
  isDevelopment: import.meta.env.DEV,
}; 