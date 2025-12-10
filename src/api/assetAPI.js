import { secureAxios } from "../config/axios"

export const getAssets = async(email) => {
    try {
        const response = await secureAxios.get(`/assets/hr?email=${email}`);
        if(response) return response.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const addAsset = async (data) => {
    try {
         const response = await secureAxios.post('/assets/create', data);
         if(response) console.log(response);
    }
    catch(err) {
        console.log(err);
    }
}

export const getAssetsOfEmployee = async (email) => {
    try {
        const asset = await secureAxios.get(`/assets/employee?email=${email}`);
        if(asset) return asset.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const getAllAssets = async () => {
    try {
        const assets = await secureAxios.get(`/assets/get-all-assets`)
        if(assets) return assets.data;
    }
    catch(err) {
        console.log(err)
    }
}