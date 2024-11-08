'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/home.png", label: "Home", href: "/dashboard" },
      { icon: "/teacher.png", label: "Lecturers", href: "/dashboard/lecturers" },
      { icon: "/student.png", label: "Students", href: "/dashboard/students" },
      { icon: "/class.png", label: "Classes", href: "/dashboard/classes" },
      { icon: "/announcement.png", label: "Announcements", href: "/dashboard/announcements" },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Profile", href: "/dashboard/profile" },
      { icon: "/setting.png", label: "Settings", href: "/dashboard/settings" },
    ],
  },
];

const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>
          {section.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.label}
                className={`flex items-center justify-center p-2 lg:justify-start gap-4 py-2 rounded-md ${isActive
                    ? "bg-purple-400 text-white"
                    : "text-gray-500 hover:bg-purple-300 hover:text-white"
                  }`}
              >
                <Image width={20} height={20} src={item.icon} alt={item.label} />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
