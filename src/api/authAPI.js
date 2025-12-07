import { axiosInstance } from "../config/axios.js"

export const createUserInDB = async (user) => {

    if(!user){ 
        console.log("No user sent in database");
        return null
    }

    try {
        const response = await axiosInstance.post('/auth/employee/register', user)
        return response;
    }
    catch(err) {
        console.log(err);
        return null
    }
} 

export const createHRInDB = async (hrData) => {


    if(!hrData) {
        console.log("No user sent in database");
        return null
    }

    try {
        const result = axiosInstance.post('/auth/hr/register', hrData);
        return result;
    }
    catch (err) {
        console.log(err);
    }
}

export const setJWT = async (email) => {
    if(!email){ 
        console.log("No user sent in database");
        return null
    }

    try {
        const result = await axiosInstance.post(`/auth/login?email=${email}`);
        const token = result?.data?.token;
        localStorage.setItem('token', token);
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

