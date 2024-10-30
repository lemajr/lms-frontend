import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Lecturer {
  id: string;
  full_name: string;
  email: string;
  lecturer_id: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  is_active: boolean;
  courses: { id: string; name: string }[];
}

export const useLecturer = (token: string) => {
  const [lecturer, setLecturer] = useState<Lecturer>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchLecturer = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/lecturer/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLecturer(response.data);
      } catch (error) {
        setError('Failed to fetch Lecturer data');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchLecturer();
    }
  }, [token]);

  return { lecturer, loading, error };
};
