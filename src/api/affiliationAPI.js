import { secureAxios } from "../config/axios"
import Swal from 'sweetalert2'

export const getAffiliations = async (hrEmail) => {
    try {
        const response = await secureAxios.get(`/affiliations/affiliation?email=${hrEmail}`);
        if(!response) return [];
        const data = response.data;
        // support both plain array and pagination object { items, total, page }
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.items)) return data.items;
        return [];
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to load employees','error');
        return [];
    }
}

export const removeAffiliation = async (id) => {
    try {
        const should = await Swal.fire({
            title: 'Are you sure?',
            text: "Remove this employee from team?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove',
            cancelButtonText: 'Cancel'
        });
        if (!should.isConfirmed) return null;

        const response = await secureAxios.patch(`/affiliations/remove?id=${id}`);
        if(response) return response.data;
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to remove employee','error');
    }
}
