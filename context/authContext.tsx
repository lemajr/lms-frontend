'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

// Define interfaces for user and auth types
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

// AuthContext for sharing auth data across the app
const AuthContext = createContext<AuthContextType | null>(null);

// Utility function to check token expiration
const isTokenExpired = (token: string): number => {
  const { exp } = jwtDecode<DecodedToken>(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return exp - currentTime; // Returns the remaining time in seconds
};


// Utility function to set cookies
const setAuthCookies = (token: string, role: string) => {
  Cookies.set('access_token', token, { expires: 1, secure: true, sameSite: 'strict' });
  Cookies.set('role', role, { expires: 1, secure: true, sameSite: 'strict' });
};


// Utility function to clear cookies
const clearAuthCookies = () => {
  Cookies.remove('access_token');
  Cookies.remove('role');
};

// AuthProvider component to provide auth functionality to the app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Handle login and role-based redirection
  const login = async (formData: LoginForm) => {
    
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/auth/login',
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true }
      );

      const { access_token: token, role } = response.data;
      setAuthCookies(token, role);
      setUser({ token, role });
      redirectToDashboard(role);
    } catch (err) {
      console.error('Login error:', err);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  // Redirect users based on their role
  const redirectToDashboard = (role: string) => {
    if (role === 'admin') router.push('/dashboard/admin');
    else if (role === 'lecturer') router.push('/dashboard/lecturer');
    else if (role === 'student') router.push('/dashboard/student');
  };

  // Handle logout and cleanup
  const logout = () => {
    clearAuthCookies();
    setUser(null);
    router.push('/login');
  };

  // Refresh session to extend token expiration
  const refreshSession = async () => {
    const currentAccessToken = Cookies.get('access_token');
    const role = Cookies.get('role');

    console.log("Access Token:", currentAccessToken);
    console.log("Role:", role);

    if (!currentAccessToken || !role) return logout();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/auth/token/refresh',
        {},
        { headers: { Authorization: `Bearer ${currentAccessToken}` }, withCredentials: true }
      );

      const newToken = response.data.access_token;
      setAuthCookies(newToken, user?.role || '');
      setUser((prevUser) => (prevUser ? { ...prevUser, token: newToken } : null));
    } catch (error) {
      logout();
    }
  };

  const handleTokenExpiration = () => {
    const token = Cookies.get('access_token');
  
    if (token) {
      const timeRemaining = isTokenExpired(token);
  
      if (timeRemaining > 0 && timeRemaining <= 120) {
        const stayLoggedIn = window.confirm('Your session is about to expire in 2 minutes. Do you want to stay logged in?');
        stayLoggedIn ? refreshSession() : logout();
      } else if (timeRemaining <= 0) {
        // Log out immediately if the token has already expired
        logout();
      }
    }
  };
  

  // Initialize user session on component mount
  useEffect(() => {
    const token = Cookies.get('access_token');
    const role = Cookies.get('role');
    if (token && role && !isTokenExpired(token)) {
      setUser({ token, role });
    } else {
      logout();
    }
    setLoading(false);

    const interval = setInterval(handleTokenExpiration, 60000);
    return () => clearInterval(interval);     
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext) as AuthContextType;
