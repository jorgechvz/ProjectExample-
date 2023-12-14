"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const isCurrentPath = pathname === item.path;
  return (
    <Link
      href={item.path}
      className={`p-5 lg:mr-4 flex items-center gap-[10px] my-[5px] rounded-md hover:bg-persian-green-950 hover:text-black-bean-50 ${
        isCurrentPath ? "bg-persian-green-950 text-black-bean-50" : ""
      }`}
    >
      <p className="text-[32px]">{item.icon}</p>
      <span className="lg:block hidden">{item.title}</span>
    </Link>
  );
};

export default MenuLink;
