import LogoutButton from "@/components/LogoutButton";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";


const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  return (
    <div className="h-dvh flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[14%] p-2 flex flex-col">
        <Link href="/dashboard" className="flex flex-col justify-start gap-2">
          <Image src="/logo.png" alt="logo" width={80} height={80} className="" />
        </Link>
        <div className="flex-1 mt-4">
          <Menu/>
        </div>
        <div>
          {/* logi out */}
         <LogoutButton />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-y-auto">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout;
