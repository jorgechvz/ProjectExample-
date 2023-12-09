import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <div className="max-w-7xl mx-auto block md:flex items-center">
        <div className="md:py-[100px] py-12 md:px-9 px-5">
          <h1 className="text-[35px] lg:mt-[70px] mb-7 max-w-xl font-bold">Unleash Your Financial Potential with BudgetBuddy!</h1>
          <p className="text-xl">Your Ultimate Companion for Effortless Personal Finance Management</p>
          <p className="text-xl">Take Control of Your Finances Today!</p>
          <div className="mt-7">
            <Link href="/auth/login" className="bg-blue-charcoal-900 hover:bg-persian-green-700 text-black-bean-50 py-2 px-7 rounded-full">
              Get Started
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center md:justify-end">
          <Image
            className="object-center w-auto h-auto"
            src="/hero-3.png"
            alt="BudgetBuddy Hero Image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
