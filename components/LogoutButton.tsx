'use client'

import { useAuth } from "@/context/authContext";
import { TbLogout } from "react-icons/tb";


const LogoutButton = () => {
    const { logout } = useAuth();

  return (
    <div>
         <button onClick={logout} className="flex p-2 text-gray-500 items-center gap-3 py-2 w-full justify-start hover:bg-red-300 rounded-md hover:text-white text-sm font-medium ">
            <TbLogout strokeWidth={1.5} className="size-7" />
            <span className="hidden lg:block ">           
               Log Out
            </span>
          </button>
    </div>
  )
}

export default LogoutButton