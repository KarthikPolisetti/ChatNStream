import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { axiosInstance } from '../lib/axios';

const ProfilePage = () => {
  const { authUser, refetch } = useAuthUser();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: authUser?.fullName || '',
    email: authUser?.email || '',
    profilePic: authUser?.profilePic || '',
    location: authUser?.location || '',
    // Add other fields as needed
  });


  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axiosInstance.patch('/user/profile', form);
    setEditing(false);
  } catch (err) {
    alert("Failed to update profile: " + (err.response?.data?.error || err.message));
  }
};

  if (!authUser) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 rounded">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {!editing ? (
        <div>
          <img src={authUser.profilePic} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <p><strong>Name:</strong> {authUser.fullName}</p>
          <p><strong>Email:</strong> {authUser.email}</p>
          <p><strong>Location:</strong> {authUser.location}</p>
          {/* Add more fields as needed */}
          <button className="btn btn-primary mt-4" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Email"
            disabled
          />
          <input
            type="text"
            name="profilePic"
            value={form.profilePic}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Profile Picture URL"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Location"
          />
   
          {/* Add more fields as needed */}
          <button className="btn btn-success" type="submit">Save</button>
          <button className="btn btn-ghost ml-2" onClick={() => setEditing(false)} type="button">Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;