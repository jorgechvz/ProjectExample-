"use client";

import classNames, { navigation } from "@/lib/constants";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthActions from "./AuthActions";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  /* Get Pathname */
  const pathname = usePathname();

  /* Get Session */
  const { data: session } = useSession();
  const isSessionActive = !!session;
  const imgUrl = session?.user?.image;

  return (
    <Disclosure as="nav" className="bg-black-bean-800 fixed top-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 md:items-center md:justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black-bean-50 hover:black-bean-50 hover:text-black-bean-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black-bean-50">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu </span>
                  {open ? (
                    <XMarkIcon
                      className="block h-6 w-6 text-black-bean-50"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6 text-black-bean-50"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex md:flex-none flex-1 items-center justify-center md:items-center md:justify-start">
                <Link href="/" className="flex items-center">
                  <Image
                    className="h-[35px] lg:h-[45px] w-auto"
                    src="/budgetbuddy-logo.png"
                    alt="Budget Buddy Logo"
                    width={80}
                    height={40}
                    priority
                  />
                  <div className="hidden lg:ml-2 lg:text-md font-bold text-black-bean-50 lg:block">
                    <p className="m-0 p-0">Budget</p>
                    <p className="m-0 p-0">Buddy</p>
                  </div>
                </Link>
              </div>
              <div className="hidden ml-6 md:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      href={item.href}
                      key={item.name}
                      className={classNames(
                        item.current
                          ? "bg-blue-charcoal-950 text-black-bean-50"
                          : "text-black-bean-50 hover:bg-blue-charcoal-950 hover:text-black-bean-50",
                        "rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                {/*  Profile Menu / Auth actions  */}
                {!isSessionActive ? (
                  <AuthActions />
                ) : (
                  <ProfileMenu imageUrl={imgUrl as string} />
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div key="Navigation Items" className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-persian-green-50 text-blue-charcoal-950"
                      : "text-black-bean-50 hover:bg-blue-charcoal-950 hover:text-black-bean-50",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
