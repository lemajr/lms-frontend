'use client';

import Image from 'next/image';
import { useUser } from '@/lib/useUser';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/authContext';

const Navbar = () => {
  const { user } = useAuth();
  const token = user?.token || '';

  // Check role from AuthContext or cookies, then narrow it to expected types
  const role = (user?.role || Cookies.get('role')) as string;
  const validRole = ["admin", "lecturer", "student"].includes(role) ? role as "admin" | "lecturer" | "student" : undefined;

  // Conditionally fetch user data based on role if it’s a valid role
  const { user: userData } = validRole ? useUser(token, validRole) : { user: null };

  return (
    <div className='flex items-center justify-between p-4 top-0 sticky z-10'>
      {/* Welcome Note */}
      <div className='hidden md:flex'>
        <p className='text-gray-700 text-lg poppins'>Dashboard</p>
      </div>

      {/* Icons and User Information */}
      <div className='flex items-center gap-6 justify-end w-full'>
        {/* Message Icon */}
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image src="/message.png" alt='message' width={20} height={20} />
        </div>

        {/* Announcement Icon with Notification */}
        <div className='relative bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image src="/announcement.png" alt='announcement' width={20} height={20} />
          <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 rounded-full text-white'>2</div>
        </div>

        {/* User Info */}
        <div className='flex flex-col'>
          <span className='text-xs leading-3 font-medium'>
            {userData?.full_name || 'User'}
          </span>
          <span className='text-[10px] text-gray-500 text-right capitalize'>
            {validRole || 'Role'}
          </span>
        </div>

        {/* Avatar */}
        <Image src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt='avatar' width={36} height={36} className='rounded-full h-[36px]' />
      </div>
    </div>
  );
}

export default Navbar;
