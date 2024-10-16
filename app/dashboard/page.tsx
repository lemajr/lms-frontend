'use client';

import { useAuth } from "@/context/authContext"
import Link from "next/link";

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { User } from '@/types'; 
// import { isStudent, isLecturer, isAdmin } from '@/app/utils/user'; 

// export default function Dashboard() {
//   const [user, setUser] = useState<User | null>(null);  // Union type for user state
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     // Fetch user data or other protected information
//     axios
//       .get('http://localhost:8000/api/v1/auth/me', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setUser(response.data);  // response.data should match the User type
//       })
//       .catch((err) => {
//         console.error('Error fetching user data:', err);
//         router.push('/login');
//       });
//   }, [router]);

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {user.full_name}!</h1>

//       {isStudent(user) && <p>Registration Number: {user.student_reg_no}</p>}
//       {isLecturer(user) && <p>Lecturer ID: {user.lecturer_id}</p>}
//       {isAdmin(user) && <p>Admin ID: {user.admin_id}</p>}

//       <p>This is a protected route.</p>
//     </div>
//   );
// }




const Dashboard = () => {

  const { logout } = useAuth()
  return (
    <div>
      <div>Hello</div>
      <br />
      <div>
        <button
        onClick={logout}
        className='py-2 bg-red-500 p-4 hover:bg-red-400'>Log Out</button>
      </div>


      <div className="mt-12">
      <Link className="p-4 bg-green-500 " href="/dashboard/register" >
          Register
      </Link>
      </div>
    </div>
  )
}

export default Dashboard