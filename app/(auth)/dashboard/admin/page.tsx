// 'use client';

import UserCard from "@/components/UserCard"

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





const Dashboard = () => {


  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3">

      {/* USER CARD */}
      <div className="flex gap-4 justify-between">
          <UserCard type="student" />
          <UserCard type="lecturer" />
          <UserCard type="staff" />
          </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3">
      Right
      </div>
    </div>
  )
}

export default Dashboard
