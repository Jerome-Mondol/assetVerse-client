import React, { useEffect, useState } from "react";
import { getAssets, addAsset } from "../api/assetAPI.js";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddAsset = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [assetCount, setAssetCount] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    productImage: "",
    productType: "",
    productQuantity: 1,
    availableQuantity: 1,
  });

  const productTypes = ["Electronic", "Mechanical", "Furniture", "Vehicle", "Equipment", "Software", "Tool", "Other"];
  const conditions = ["new", "excellent", "good", "fair", "poor"];
  const departments = ["IT", "HR", "Finance", "Operations", "Marketing", "Sales", "Research & Development", "Administration"];

  useEffect(() => {
    const load = async () => {
      try {
        if (!user) return;
        const assets = await getAssets(user.email);
        setAssetCount(assets.length);
      } catch {
        toast.error("Failed to load");
      }
    };
    load();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "productQuantity") {
      const q = parseInt(value) || 1;
      setFormData({ ...formData, productQuantity: q, availableQuantity: q });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.productType) {
      toast.error("Missing fields");
      return;
    }
    try {
      setLoading(true);
      const data = {
        ...formData,
        hrEmail: user.email,
        companyName: user.companyName || "Company",
        dateAdded: new Date().toISOString()
      };
      Object.keys(data).forEach((k) => data[k] === "" && k !== "productImage" && delete data[k]);
      await addAsset(data);
      setFormData({
        productName: "",
        productImage: "",
        productType: "",
        productQuantity: 1,
      });
      const assets = await getAssets(user.email);
      setAssetCount(assets.length);
      toast.success("Added");
    } catch {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-3xl mx-auto bg-white shadow-lg text-gray-700 my-10 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add Asset</h1>
      <p>Total Assets: {assetCount ?? "..."}</p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label>Product Name *</label>
          <input name="productName" value={formData.productName} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label>Type *</label>
          <select name="productType" value={formData.productType} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select</option>
            {productTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity *</label>
          <input type="number" name="productQuantity" min={1} value={formData.productQuantity} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label>Image URL</label>
          <input name="productImage" value={formData.productImage} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded w-full">
          {loading ? "Adding..." : "Add Asset"}
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
