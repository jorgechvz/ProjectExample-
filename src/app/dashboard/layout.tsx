import { Metadata } from "next";
import Asidebar from "@/components/ui/asidebar/Asidebar";
import { Providers } from "../providers";

export const metadata: Metadata = {
  title: "Dashboard - Budget Buddy",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="bg-persian-green-50 pb-[75px]">
        <div className="max-w-7xl m-auto pt-8">
          <div className="flex lg:flex-row flex-col px-2">
            <div className="flex-1 rounded-lg">
              <Asidebar />
            </div>
            <div className="flex-[4] px-2 mx-5 min-h-screen py-2  shadow-2xl shadow-persian-green-950 rounded-xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Providers>
  );
}
