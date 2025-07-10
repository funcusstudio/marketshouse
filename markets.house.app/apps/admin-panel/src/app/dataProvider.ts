import { DataProvider } from 'react-admin';
import axiosInstance from './utils/axios';

export const apiUrl = 'https://mhsale.online/api';

export const dataProvider: DataProvider = {
    getList: async (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}`;
        const { data, headers } = await axiosInstance.get(url, { params: query });
        return {
            data,
            total: parseInt(headers['content-range']?.split('/').pop() || '0', 10),
        };
    },

    getOne: async (resource: string, params: any) => {
        const { data } = await axiosInstance.get(`${apiUrl}/${resource}/${params.id}`);
        return { data };
    },

    create: async (resource: string, params: any) => {
        const { data } = await axiosInstance.post(`${apiUrl}/${resource}`, params.data);
        return { data };
    },

    update: async (resource: string, params: any) => {
        const { data } = await axiosInstance.put(
            `${apiUrl}/${resource}/${params.id}`,
            params.data
        );
        return { data };
    },

    delete: async (resource: string, params: any) => {
        const { data } = await axiosInstance.delete(
            `${apiUrl}/${resource}/${params.id}`
        );
        return { data };
    },

    getMany: async (resource: string, params: { ids: any[] }) => {
        const responses = await Promise.all(
            params.ids.map(id => axiosInstance.get(`${apiUrl}/${resource}/${id}`))
        );
        return { data: responses.map(response => response.data) };
    },
    
    getManyReference: async (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}`;
        const { data, headers } = await axiosInstance.get(url, { params: query });
        console.log('Headers:', headers, data);
        return {
            data,
            total: parseInt(headers['content-range']?.split('/').pop() || '0', 10),
        };
    },

    updateMany: async (resource: string, params: any) => {
        const response = await Promise.all(
            params.ids.map((id: any) => 
                axiosInstance.put(`${apiUrl}/${resource}/${id}`, params.data)
            )
        );
        return { data: response.map(res => res.data) };
    },

    deleteMany: async (resource: string, params: any) => {
        const responses = await Promise.all(
            params.ids.map((id: any) => 
                axiosInstance.delete(`${apiUrl}/${resource}/${id}`)
            )
        );
        return { data: responses.map(res => res.data.id) };
    },
}; 