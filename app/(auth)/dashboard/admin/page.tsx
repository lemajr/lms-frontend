// 'use client';

// import { useAdmin } from '@/lib/useAdmin';
// import Link from 'next/link';
// import { useAuth } from "@/context/authContext";
// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

// const adminDashboard = () => {
//   const { logout } = useAuth();
//   const [token, setToken] = useState<string>();

//   useEffect(() => {
//     // Retrieve the token from cookies
//     const storedToken = Cookies.get('access_token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   const { admin, loading, error } = useAdmin(token || '');

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     console.log(error);
//     return <p>Error fetching admin data.</p>;
//   }


//   return (
//     <div>
//       <div>Hello {admin?.full_name}</div>
//       <br />
//       <div>
//         <button onClick={logout} className='py-2 bg-red-500 p-4 hover:bg-red-400'>Log Out</button>
//       </div>
//       <div className="mt-12">
//         <Link className="p-4 bg-green-500" href="/dashboard/register">
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default adminDashboard;







// pages/dashboard.js

import { FiHome, FiClock, FiBarChart, FiPackage, FiUsers } from 'react-icons/fi';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 bg-purple-600 flex flex-col items-center py-8 space-y-6">
        <FiHome className="text-white text-2xl cursor-pointer hover:text-purple-300" />
        <FiClock className="text-white text-2xl cursor-pointer hover:text-purple-300" />
        <FiBarChart className="text-white text-2xl cursor-pointer hover:text-purple-300" />
        <FiPackage className="text-white text-2xl cursor-pointer hover:text-purple-300" />
        <FiUsers className="text-white text-2xl cursor-pointer hover:text-purple-300" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            RELATÓRIO DE <span className="font-bold text-purple-600">VENDAS</span>
          </h1>
        </header>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Large Card */}
          <div className="col-span-2 h-52 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg"></div>

          {/* Small Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 col-span-2 gap-4">
            <div className="h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
              <FiHome className="text-purple-600 text-3xl" />
            </div>
            <div className="h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
              <FiClock className="text-purple-600 text-3xl" />
            </div>
            <div className="h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
              <FiBarChart className="text-purple-600 text-3xl" />
            </div>
            <div className="h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
              <FiPackage className="text-purple-600 text-3xl" />
            </div>
          </div>

          {/* Bottom Large Card */}
          <div className="col-span-4 h-32 bg-white rounded-lg shadow-lg mt-4"></div>
        </section>
      </main>
    </div>
  );
}
