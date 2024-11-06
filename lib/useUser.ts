import { useState, useEffect } from 'react';
import axios from 'axios';

export interface UserBase {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  is_active: boolean;
}

export interface Admin extends UserBase {
  admin_id: string;
}

export interface Lecturer extends UserBase {
  lecturer_id: string;
  courses: { id: string; name: string }[];
}

export interface Student extends UserBase {
  student_reg_no: string;
  courses: { id: string; name: string }[];
}

type User = Admin | Lecturer | Student;

export const useUser = (token: string, role: 'admin' | 'lecturer' | 'student') => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const endpoint = `http://localhost:8000/api/v1/${role}/me`;
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError(`Failed to fetch ${role} data`);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, role]);

  return { user, loading, error };
};
