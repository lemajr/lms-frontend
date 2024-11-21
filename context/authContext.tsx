'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// Define interfaces
interface User {
  token: string;
  role: 'admin' | 'lecturer' | 'student';
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

// Create AuthContext
const AuthContext = createContext<AuthContextType | null>(null);

// Utility: check token expiration
const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= exp; // True if expired
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Utility: set cookies
const setAuthCookies = (token: string, role: string) => {
  Cookies.set('access_token', token, { expires: 1, secure: true, sameSite: 'strict' });
  Cookies.set('role', role, { expires: 1, secure: true, sameSite: 'strict' });
};

// Utility: clear cookies
const clearAuthCookies = () => {
  Cookies.remove('access_token');
  Cookies.remove('role');
};

// AuthProvider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Login handler
  const login = async (formData: LoginForm) => {
    try {
      const response = await axios.post(
        'https://backend-lms-api.vercel.app/api/v1/auth/login',
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true }
      );

      const { access_token: token, role } = response.data;
      if (["admin", "lecturer", "student"].includes(role)) {
        setAuthCookies(token, role);
        setUser({ token, role: role as User["role"] });
        router.push('/dashboard');
      } else {
        throw new Error("Invalid role");
      }
    } catch (err) {
      console.error('Login error:', err);
      throw new Error('Login failed. Please check your credentials.');
    }
  };


  // Logout handler
  const logout = () => {
    clearAuthCookies();
    setUser(null);
    router.push('/login');
  };

  // Refresh session to extend expiration
  const refreshSession = async () => {
    const currentAccessToken = Cookies.get('access_token');
    const role = Cookies.get('role') as User["role"];

    if (!currentAccessToken || !role || !["admin", "lecturer", "student"].includes(role)) {
      return logout();
    }

    try {
      const response = await axios.post(
        'https://backend-lms-api.vercel.app/api/v1/auth/token/refresh',
        {},
        { headers: { Authorization: `Bearer ${currentAccessToken}` }, withCredentials: true }
      );

      const newToken = response.data.access_token;
      setAuthCookies(newToken, role);
      setUser({ token: newToken, role });
    } catch (error) {
      logout();
    }
  };

  // Token expiration handling
  const handleTokenExpiration = () => {
    const token = Cookies.get('access_token');
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        logout();
      }
    }
  };

  // Initialize session on mount
  useEffect(() => {
    const token = Cookies.get('access_token');
    const role = Cookies.get('role') as User["role"];
    if (token && role && !isTokenExpired(token) && ["admin", "lecturer", "student"].includes(role)) {
      setUser({ token, role });
    } else {
      logout();
    }
    setLoading(false);

    const interval = setInterval(handleTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext) as AuthContextType;
