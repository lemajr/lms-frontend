'use client'
import { useState } from "react";
import Image from "next/image";

const ProfilePage = () => {
  // Mock user data
  const [user, setUser] = useState({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "Dar es salaam",
    role: "Admin",
    img: "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg",
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    setUser({ ...user, ...formData }); // Update user state
  };

  return (
    <div className="flex flex-wrap gap-8 p-8 bg-gray-50 ">
      {/* Profile Details (Left) */}
      <div className="flex flex-col  justify-center items-center w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
        <Image
          src={user.img}
          alt={user.name}
          width={400}
          height={400}
          className="rounded-full w-40 h-40 object-cover"
        />
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.phone}</p>
        <p className="text-gray-600">{user.address}</p>
        <p className="text-gray-600 capitalize">{user.role}</p>
      </div>

      {/* Update Profile Form (Right) */}
      <div className="flex-1 w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
