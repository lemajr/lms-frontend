'use client'
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import { FiUser, FiLock } from 'react-icons/fi';
import { useState } from 'react';

interface FormState {
  username: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormState>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setIsLoading(true);
      await login(formData);
    } catch (err) {
      setIsLoading(false);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <section className="h-screen bg-[url('/bg.svg')] bg-no-repeat bg-center bg-cover flex justify-center items-center relative">
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Logo and Form Container */}
      <div className="relative z-10 w-full max-w-md p-6 backdrop-blur-md rounded-lg xl:lg:shadow-lg xl:lg:bg-white/5">
        {/* Logo Image */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="logo"
            height={75}
            width={75}
            priority={true}
            className="filter brightness-0 invert w-[100px]" // This applies a white effect to the logo
          />
        </div>

        {/* Login Form */}
        <form className="px-3" onSubmit={handleSubmit}>
          <div className="relative w-full mb-4">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100" />
            <input
              type="text"
              name='username'
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Username"
              className="w-full pl-10 pr-2 py-3 bg-transparent border-2 border-white text-sm text-gray-100 placeholder-[#f1f1f1b9] focus:outline-none focus:ring-2 focus:ring-[#6d73e6] rounded"
            />
          </div>
          <div className="relative w-full mb-2">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100" />
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
              className="w-full pl-10 pr-2 py-3 bg-transparent border-2 border-white text-sm text-gray-100 placeholder-[#f1f1f1b9] focus:outline-none focus:ring-2 focus:ring-[#6d73e6] rounded"
            />
          </div>
          {error &&
            <div className="text-red-500 " role="alert">
              <strong className="font-bold underline">Oops!</strong>
              <span className="block sm:inline"> {error}</span>

            </div>
          }
          {isLoading ? (
            <button
              type="submit"
              className="w-full mt-3 py-3 text-base font-medium text-[#6d73e6] bg-white shadow-2xl rounded-md hover:bg-white/90"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 mr-3 inline-block text-[#6d73e6]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Processing...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full mt-3 py-3 text-base font-medium text-[#6d73e6] bg-white shadow-2xl rounded-md hover:bg-white/90"
            >
              Login
            </button>
          )}

        </form>
      </div>
    </section>
  );
}
