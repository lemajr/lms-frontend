'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from "@/context/authContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <div>Hello</div>
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

export default Dashboard;
