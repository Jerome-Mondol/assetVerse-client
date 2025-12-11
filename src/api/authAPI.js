import { axiosInstance } from "../config/axios.js"
import Swal from 'sweetalert2'

export const createUserInDB = async (user) => {

    if(!user){ 
        Swal.fire('Error','No user provided','error');
        return null
    }

    try {
        const response = await axiosInstance.post('/auth/employee/register', user)
        Swal.fire('Success','User created','success')
        return response;
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to create user','error')
        return null
    }
} 

export const createHRInDB = async (hrData) => {


    if(!hrData) {
        Swal.fire('Error','No user provided','error');
        return null
    }

    try {
        const result = axiosInstance.post('/auth/hr/register', hrData);
        Swal.fire('Success','HR Created','success');
        return result;
    }
    catch (err) {
        console.log(err);
        Swal.fire('Error','Failed to create HR','error');
    }
}

export const setJWT = async (email) => {
    if(!email){ 
        Swal.fire('Error','No email provided','error');
        return null
    }

    try {
        const result = await axiosInstance.post(`/auth/login?email=${email}`);
        const token = result?.data?.token;
        if(token) localStorage.setItem('token', token);
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to login','error');
        return null;
    }
}

