'use client'
import { useState } from "react";
import Image from "next/image";

const SettingsPage = () => {
  // Mock user data
  const [user] = useState({
    id: "1",
    name: "lemajr",
    email: "lema.jr@example.com",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  const [settings, setSettings] = useState({
    email: user.email,
    password: "",
    notifications: true,
    theme: "light",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setSettings({ ...settings, [name]: checked });
    } else {
      setSettings({ ...settings, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated Settings:", settings);
    // Here you can add logic to update the user settings (e.g., make an API call)
  };

  return (
    <div className="flex flex-wrap gap-8 p-8 bg-gray-50 ">
      {/* Settings Form (Left) */}
      <div className="flex-1 w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={settings.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="New password"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-medium">Enable Notifications</label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>

          <div>
            <label className="block font-medium">Theme</label>
            <select
              name="theme"
              value={settings.theme}
              // onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Profile Details (Right) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
        <Image
          src={user.img}
          alt={user.name}
          width={120}
          height={120}
          className="rounded-full w-40 h-40 object-cover"
        />
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">ID: {user.id}</p>
      </div>
    </div>
  );
};

export default SettingsPage;
