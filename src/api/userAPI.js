import { axiosInstance } from "../config/axios"

export const getUser = async (email) => {
    try {
        const response = await axiosInstance.get(`/users/user?email=${email}`);
        if(response) return response.data;
    }
    catch (err) {
        console.log(err);
    }
}