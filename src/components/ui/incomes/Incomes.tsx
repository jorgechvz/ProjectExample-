import { auth } from "@/auth";
import { fetchTotalIncomes } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Incomes() {
  const session = await auth();

  const userId: string = session?.user?.id as string;
  const totalIncome = await fetchTotalIncomes(userId);
  totalIncome ? totalIncome : 0;

  return (
    <>
      <div className="flex justify-around">
        <div>
          <h3>Incomes</h3>
          <p className="text-3xl">{formatCurrency(totalIncome)}</p>
        </div>
        <Image
          src="/income-icon.png"
          alt="Income Icon"
          width={64}
          height={64}
        />
      </div>
      <div className="mt-5 w-[90%] mx-auto flex">
        <Link
          href="/dashboard/incomes/create"
          className="bg-persian-green-950 flex-1 text-black-bean-50 rounded-md p-2 text-center"
        >
          Add Income
        </Link>
      </div>
    </>
  );
}
