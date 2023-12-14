"use client";

import Link from "next/link";
import classNames, { profileNavigation } from "@/lib/constants";
import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function ProfileMenu({ imageUrl }: { imageUrl: string }) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Menu as="div" className="relative ml-3" key="Profile Dropdown">
      <div>
        <Menu.Button className="relative flex rounded-full bg-black-bean-50 text-sm focus:outline-none focus:ring-2 focus:ring-black-bean-50 focus:ring-offset-2 focus:ring-offset-blue-charcoal-950">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src={imageUrl || "/no-profile-image.png"}
            alt="Profile image of the user"
            width={32}
            height={32}
          />
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-persian-green-950 py-1 shadow-lg ring-1 ring-persian-green-50 ring-opacity-5 focus:outline-none">
        {profileNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <Link
                href={item.href}
                className={classNames(
                  active ? "bg-persian-green-50  rounded-sm" : "",
                  "block px-4 py-2 text-sm text-black-bean-50 hover:text-blue-charcoal-950"
                )}
              >
                {item.name}
              </Link>
            )}
          </Menu.Item>
        ))}
        <Menu.Item>
          {({ active }) => (
            <button
              className={classNames(
                active ? "bg-persian-green-50 rounded-sm" : "",
                "block px-4 py-2 text-sm text-black-bean-50 w-full text-left cursor-pointer hover:text-blue-charcoal-950"
              )}
              key="signup"
              onClick={handleSignOut}
            >
              <div className="md:block">Logout</div>
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
