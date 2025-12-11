import { secureAxios } from "../config/axios"

export const getAffiliations = async (hrEmail) => {
    try {
        const response = await secureAxios.get(`/affiliations/affiliation?email=${hrEmail}`);
        if(response) return response.data;
    }
    catch(err) {
        console.log(err);
    }
}
