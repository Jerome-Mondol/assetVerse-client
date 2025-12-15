import { secureAxios } from "../config/axios"
import Swal from 'sweetalert2'

export const getAssets = async(email) => {
    try {
        const response = await secureAxios.get(`/assets/hr?email=${email}`);
        if(!response) return [];
        const data = response.data;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.items)) return data.items;
        return [];
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to load assets','error');
        return [];
    }
}

export const addAsset = async (data) => {
    try {
         const response = await secureAxios.post('/assets/create', data);
         if(response) {
             Swal.fire('Success','Asset added','success');
         }
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to add asset','error');
    }
}

export const getAssetsOfEmployee = async (email) => {
    try {
        const asset = await secureAxios.get(`/assets/employee?email=${email}`);
        if(asset) return asset.data;
        return [];
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to load your assets','error');
        return [];
    }
}

export const getAllAssets = async () => {
    try {
        const assets = await secureAxios.get(`/assets/get-all-assets`)
        if(assets) return assets.data;
        return [];
    }
    catch(err) {
        console.log(err)
        Swal.fire('Error','Failed to load assets','error');
        return [];
    }
}

export const getSpecificAsset = async (id) => {
    if(!id) {
        console.log("No ID provided");
        return null;
    }
    try {
        const asset = await secureAxios.get(`/assets/asset?id=${id}`)
        if(asset) return asset.data;
        return null;
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to load asset details','error');
        return null;
    }
}

// update an asset
export const updateAsset = async (id, data) => {
    if (!id) {
        Swal.fire('Error','No asset id provided','error');
        return null;
    }
    try {
        const res = await secureAxios.patch(`/assets/update?id=${id}`, data);
        if (res) {
            Swal.fire('Success','Asset updated','success');
            return res.data;
        }
        return null;
    } catch (err) {
        console.error(err);
        Swal.fire('Error','Failed to update asset','error');
        return null;
    }
}   


export const assignAsset = async (employeeEmail, hrEmail, assetId) => {

    const data = {
        employeeEmail,
        hrEmail,
        assetId
    }

    try{
        if(data) {
            const response = await secureAxios.post(`/assigned/assign-assets`, data)
            Swal.fire('Success','Asset Assigned','success');
            if(response) return response.data;
        }
    }
    catch(err) {
        console.error(err);
        Swal.fire('Error','Failed to assign asset','error');
        return null;
    }
}
