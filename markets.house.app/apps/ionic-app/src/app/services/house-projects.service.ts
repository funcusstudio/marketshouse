import { api } from './api.service';
import { User } from '../hooks/useAuth';

export interface HouseProject {
  id: number;
  externalId: number;
  name: string;
  description: string;
  shortDescription: string;
  permalink: string;
  dateCreated: Date;
  dateModified: Date;
  price: number;
  salePrice?: number;
  onSale: boolean;
  images: {
    id: number;
    src: string;
    name: string;
    alt: string;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  attributes: {
    id: number;
    name: string;
    options: string[];
  }[];
  isActive: boolean;
}

export interface UserHouseProject {
  id: number;
  userId: number;
  houseProjectId: number;
  isConfirmed: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  houseProject?: HouseProject;
  user?: User;
}

export interface ReportsResponse {
  reports: ReportModel[];
  total: number;
}

export interface ReportModel {
  id: number;
  description: string;
  createdAt: string;
  executor: Executor;
  project: UserHouseProject;
}

export interface Executor {
  id: number;
  email: string;
  password: string;
  userType: 'client' | 'executor';
  isAdmin: boolean;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

// Интерфейс для коттеджных поселков
export interface CottageSettlement {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  permalink: string;
  price: number;
  regularPrice: number;
  salePrice: number;
  mainImage: string;
  galleryImages: string[];
  characteristics: Record<string, any>;
  attributes: any[];
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  syncedAt: Date;
}

export const houseProjectsService = {
  // Получение списка всех активных проектов
  getProjects: () => api.get('/house-projects/client/list'),

  // Получение одного проекта по ID
  getProject: (id: number) => api.get(`/house-projects/${id}`),

  // Выбор проекта клиентом
  selectProject: (houseProjectId: number, notes?: string) =>
    api.post('/user-house-projects', { houseProjectId, notes }),

  selectProjectByExecutor: (houseProjectId: number, notes?: string) =>
    api.post(`/user-house-projects/${houseProjectId}/take`, { houseProjectId, notes }),

  // Получение выбранных проектов текущего пользователя
  getUserProjects: () => api.get('/user-house-projects/my-projects'),

  // Получение выполненных проектов текущего пользователя
  getMyExecutedProjects: () => api.get('/user-house-projects/my-executed-projects'),

  getUserProjectsById: (id: number) => api.get(`/user-house-projects/my-projects/${id}`),

  getReport: (id: number) => api.get(`/reports/project/${id}`),

  getProjectForExecutor: () => api.get(`/user-house-projects/unassigned`),

  getProjectForExecutorById: (id: number) => api.get(`/user-house-projects/executor-projects/${id}`),

  createReport: (projectId: number, data: { description: string; date: string }) =>
    api.post('/reports', { ...data, projectId }),

  // Новый метод для поиска коттеджных поселков
  searchCottageSettlements: (name: string) =>
    api.get(`/cottage-villages/search?name=${name}`),
};