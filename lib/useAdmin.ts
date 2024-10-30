import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Admin {
  id: string;
  full_name: string;
  email: string;
  admin_id: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  is_active: boolean;
}

export const useAdmin = (token: string) => {
  const [admin, setAdmin] = useState<Admin>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admin/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmin(response.data);
      } catch (error) {
        setError('Failed to fetch Admin data');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAdmin();
    }
  }, [token]);

  return { admin, loading, error };
};
