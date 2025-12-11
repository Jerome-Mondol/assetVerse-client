import { secureAxios } from "../config/axios";
import Swal from 'sweetalert2'

export const returnAssignedAsset = async (id) => {
  if (!id) return null;
  try {
    const res = await secureAxios.patch(`/assigned/return?id=${id}`);
    if (res) {
      Swal.fire('Success','Return processed','success');
      return res.data;
    }
  } catch (err) {
    console.error(err);
    Swal.fire('Error','Failed to return asset','error');
  }
};

export const getAssignedForEmployee = async (email) => {
  if (!email) return null;
  try {
    const res = await secureAxios.get(`/assets/employee?email=${email}`);
    if (res) return res.data;
  } catch (err) {
    console.error(err);
    Swal.fire('Error','Failed to load assigned assets','error');
  }
};
