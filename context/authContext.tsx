'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; 

interface AuthContextType {
  user: string | null;
  login: (formData: LoginForm) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface LoginForm {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token'); // Retrieve token from cookie
    if (token) {
      setUser(token); // Optionally verify token via backend
    }
    setLoading(false);
  }, []);

  const login = async (formData: LoginForm) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true, // Include credentials (cookies)
      });
      const token = response.data.access_token;
      
      Cookies.set('access_token', token, { expires: 1, secure: true, sameSite: 'strict' }); // Set token in cookie
      setUser(token);
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const logout = () => {
    Cookies.remove('access_token'); // Remove cookie
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
