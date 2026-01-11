import { axiosInstance } from "../config/axios"
import Swal from 'sweetalert2'

export const getUser = async (email) => {
    try {
        const response = await axiosInstance.get(`/users/user?email=${email}`);
        if(response) return response.data;
        return null;
    }
    catch (err) {
        console.log(err);
        Swal.fire('Error','Failed to load user','error');
        return null;
    }
}

export const getUserProfile = async (email) => {
    return getUser(email);
}

export const updateUserProfile = async (userData) => {
    try {
        const response = await axiosInstance.put('/users/user', userData);
        if(response) return response.data;
        return null;
    }
    catch (err) {
        console.log(err);
        Swal.fire('Error','Failed to update profile','error');
        return null;
    }
}