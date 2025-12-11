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

export const getAllRequestOfAHR = async (email) => {
    try {
        const allRequests = await secureAxios.get(`/request/all-requests?email=${email}`)
        if(allRequests) return allRequests.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const acceptRequest = async (id) => {
    try {
        const response = await secureAxios.patch(`/request/${id}/accept`)
        if(response) return response.data;
    }
    catch(err) {
        console.log(err);
    }
}