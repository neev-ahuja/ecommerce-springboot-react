import axiosClient from './axiosClient';


// Defining request types here for simplicity for now, or we can move to a types file
export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    username: string;
    password: string;
}

export const authApi = {
    login: async (data: LoginRequest) => {
        const response = await axiosClient.post<string>('/login', data);
        if (response.data) {
            localStorage.setItem('token', response.data);
        }
        return response.data;
    },

    register: async (data: RegisterRequest) => {
        const response = await axiosClient.post<string>('/register', data);
        return response.data;
    }
};
