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

export const getJWT = async (email) => {
    if(!email){ 
        console.log("No user sent in database");
        return null
    }

    try {
        const result = await axiosInstance.post(`/auth/login?email=${email}`);
        if(result) return result?.data?.token;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}