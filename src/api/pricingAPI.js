import { secureAxios } from "../config/axios.js"

export const fetchPricingPackages = async () => {
    try {
        const packages = await secureAxios.get('/pricing/all-packages');
        if(packages) return packages.data;
    }
    catch(err) {
        console.log(err);
    }
}