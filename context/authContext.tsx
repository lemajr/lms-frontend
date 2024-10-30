'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

interface User {
  token: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (formData: LoginForm) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface LoginForm {
  username: string;
  password: string;
}

interface DecodedToken {
  exp: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to handle session refresh
  const refreshSession = async () => {
    const currentAccessToken = Cookies.get('access_token');
    if (!currentAccessToken) return logout(); // Ensure token is present

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/auth/token/refresh',
        {},
        {
          headers: { Authorization: `Bearer ${currentAccessToken}` },
          withCredentials: true,
        }
      );

      const newToken = response.data.access_token;
      Cookies.set('access_token', newToken, { expires: 1, secure: true, sameSite: 'strict' });
      setUser((prevUser) => (prevUser ? { ...prevUser, token: newToken } : null)); // Update token in state
    } catch (error) {
      logout(); // Log out if token refresh fails
    }
  };

  // Handle logout
  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('role');
    setUser(null);
    router.push('/login');
  };

  // Unified effect for token expiration and session management
  useEffect(() => {
    const handleTokenExpiration = () => {
      const token = Cookies.get('access_token');
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = decodedToken.exp - currentTime;

        if (timeLeft <= 120) {
          const stayLoggedIn = window.confirm('Your session is about to expire. Do you want to stay logged in?');
          if (stayLoggedIn) {
            refreshSession();
          } else {
            logout();
          }
        }
      }
    };

    const token = Cookies.get('access_token');
    const role = Cookies.get('role');
    if (token && role) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTime) {
        setUser({ token, role });
      } else {
        logout();
      }
    }
    setLoading(false);

    const interval = setInterval(handleTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle login
  const login = async (formData: LoginForm) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/auth/login',
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true }
      );

      const { access_token: token, role } = response.data;
      Cookies.set('access_token', token, { expires: 1, secure: true, sameSite: 'strict' });
      Cookies.set('role', role, { expires: 1, secure: true, sameSite: 'strict' });

      setUser({ token, role });

      // Role-based redirection
      if (role === 'admin') router.push('/dashboard/admin');
      else if (role === 'lecturer') router.push('/dashboard/lecturer');
      else if (role === 'student') router.push('/dashboard/student');
    } catch (err) {
      console.error('Login error:', err);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
