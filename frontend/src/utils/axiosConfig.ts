import axois from 'axios';
import { error } from 'console';

const instance = axois.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        const profile = JSON.parse(localStorage.getItem('profile') || '');
        if(profile && profile.token){
            config.headers.Authorization = `Bearer ${profile.token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;