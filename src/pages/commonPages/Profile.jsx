import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUser, updateUserProfile } from '../../api/userAPI';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getUser(user?.email);
        setProfile(data);
        setForm({
          name: data?.name || '',
          email: data?.email || '',
          phone: data?.phone || '',
          role: data?.role || '',
        });
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await updateUserProfile(form);
      setSuccess('Profile updated successfully!');
      setEditMode(false);
      setProfile({ ...profile, ...form });
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (error) return <div className="text-red-600 text-center my-8">{error}</div>;

  return (
    <div className="max-w-xl text-gray-500   mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
      {success && <div className="mb-4 p-2 bg-green-50 border border-green-200 text-green-700 rounded">{success}</div>}
      {!editMode ? (
        <>
          <div className="mb-4 flex flex-col gap-2">
            <div><span className="font-semibold">Name:</span> {profile?.name}</div>
            <div><span className="font-semibold">Email:</span> {profile?.email}</div>
            <div><span className="font-semibold">Phone:</span> {profile?.phone || 'N/A'}</div>
            <div><span className="font-semibold">Role:</span> {profile?.role}</div>
          </div>
          <button onClick={() => setEditMode(true)} className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Profile</button>
        </>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="input input-bordered w-full" required disabled />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input name="role" value={form.role} className="input input-bordered w-full" disabled />
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
            <button type="button" onClick={() => setEditMode(false)} className="px-5 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
