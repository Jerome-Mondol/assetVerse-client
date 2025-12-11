import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { getSpecificAsset, updateAsset } from '../../api/assetAPI.js'
import { secureAxios } from '../../config/axios.js'
import Swal from 'sweetalert2'

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    productName: '',
    productImage: '',
    productType: '',
    productQuantity: 1
  });

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const asset = await getSpecificAsset(id);
        if (asset) {
          setForm({
            productName: asset.productName || '',
            productImage: asset.productImage || '',
            productType: asset.productType || '',
            productQuantity: asset.productQuantity || 1
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error','Failed to load asset','error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'productQuantity' ? Number(value) : value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productName || !form.productType) {
      Swal.fire('Error','Missing fields','error');
      return;
    }

    try {
      const res = await updateAsset(id, form);
      if (res) navigate('/assets-list');
    } catch (err) {
      console.error(err);
      Swal.fire('Error','Failed to update','error');
    }
  }

  if (loading) return <div className="p-10">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-8 text-gray-700">
      <h1 className="text-2xl font-semibold mb-4">Edit Asset</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input name="productName" value={form.productName} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <input name="productType" value={form.productType} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input name="productQuantity" value={form.productQuantity} onChange={handleChange} type="number" className="w-full border p-2 rounded" min={1} />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input name="productImage" value={form.productImage} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div className="flex gap-3">
          <button className="btn btn-primary" type="submit">Save</button>
          <button className="btn btn-ghost" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditAsset
