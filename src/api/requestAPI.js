import { secureAxios } from "../config/axios"

export const sendRequest = async (id) => {
    try {
        const request = await secureAxios.post(`/request/asset?id=${id}`);
        if(request) return request.data;
    }
    catch(err) {
        console.log(err);
    }
}