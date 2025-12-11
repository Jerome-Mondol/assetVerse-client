import { secureAxios } from "../config/axios"
import Swal from 'sweetalert2'

export const sendRequest = async (id) => {
    try {
        const request = await secureAxios.post(`/request/asset?id=${id}`);
        if(request) return request.data;
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to send request','error');
    }
}

export const getAllRequestOfAHR = async (email) => {
    try {
        const allRequests = await secureAxios.get(`/request/all-requests?email=${email}`)
        if(allRequests) return allRequests.data;
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to load requests','error');
    }
}

export const acceptRequest = async (id) => {
    try {
        const should = await Swal.fire({
            title: 'Are you sure?',
            text: "Accept this request?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept',
            cancelButtonText: 'Cancel'
        });
        if (!should.isConfirmed) return null;

        const response = await secureAxios.patch(`/request/${id}/accept`)
        if(response) return response.data;
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to accept request','error');
    }
}


export const rejectRequest = async (id) => {
    try {
        const should = await Swal.fire({
            title: 'Are you sure?',
            text: "Reject this request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reject',
            cancelButtonText: 'Cancel'
        });
        if (!should.isConfirmed) return null;

        const response = await secureAxios.patch(`/request/${id}/reject`)
        if(response) return response.data;
    }
    catch(err) {
        console.log(err);
        Swal.fire('Error','Failed to reject request','error');
    }
}