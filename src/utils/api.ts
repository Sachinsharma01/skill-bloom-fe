import { isNullOrUndefined } from ".";
import config from "../config";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: config.api.baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const makeAPICall = async (api: string, payload?: any, token?: string) => {
    const headers: any = {
        'Content-Type': 'application/json',
    };
    

    if (!isNullOrUndefined(token)) {
        headers.Authorization = `Bearer ${token}`;
    }
   
    try {
        const response = await API[api](payload, { headers });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        return {
            error: true,
            message: error.message,
        }
    }
}

const API = {
    signin: async (payload: any) => {
        const response = await axiosInstance.post('/auth/signin', payload);
        return response.data
    },
    signup: async (payload: any) => {
        const response = await axiosInstance.post('/auth/signup', payload);
        return response.data
    },
    username: async (payload: any) => {
        const response = await axiosInstance.get('/validate/username', { params: payload });
        return response.data.data
    },
    profile: async (payload: { id: number }, headers: any) => {
        const response = await axiosInstance.get(`/user/profile/${payload.id}`, headers);
        return response.data
    },
    updateProfile: async (payload: any, headers: any) => {
        const response = await axiosInstance.put(`/user/profile/${payload.id}`, payload, headers);
        return response.data
    },
    enrolledCourses: async (payload: any, headers: any) => {
        const response = await axiosInstance.get(`/user/${payload.userId}/enrolled_courses`, headers);
        return response.data
    },
    createOrder: async (payload: any, headers: any) => {
        const response = await axiosInstance.post('/orders', payload, headers);
        return response.data
    },
    updateOrder: async (payload: any, headers: any) => {
        const response = await axiosInstance.put(`/orders/${payload.id}`, payload, headers);
        return response.data
    }
}