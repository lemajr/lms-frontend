'use client';

import { useAdmin } from '@/lib/useAdmin';
import Link from 'next/link';
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const adminDashboard = () => {
  const { logout } = useAuth();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    // Retrieve the token from cookies
    const storedToken = Cookies.get('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const { admin, loading, error } = useAdmin(token || '');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>Error fetching admin data.</p>;
  }


  return (
    <div>
      <div>Hello {admin?.full_name}</div>
      <br />
      <div>
        <button onClick={logout} className='py-2 bg-red-500 p-4 hover:bg-red-400'>Log Out</button>
      </div>
      <div className="mt-12">
        <Link className="p-4 bg-green-500" href="/dashboard/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default adminDashboard;

