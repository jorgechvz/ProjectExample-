import { auth } from "@/auth";
import { fetchTotalExpenses } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Expenses() {
  const session = await auth();

  const userId: string = session?.user?.id as string;
  const totalExpense = await fetchTotalExpenses(userId);

  return (
    <>
      <div className="flex justify-around">
        <div>
          <h3>Expenses</h3>
          <p className="text-3xl text-bright-red-500">
            {formatCurrency(totalExpense)}
          </p>
        </div>
        <Image
          src="/expenses-icon.png"
          className="w-auto h-auto"
          alt="Income Icon"
          width={64}
          height={64}
        />
      </div>
      <div className="mt-5 w-[90%] mx-auto flex">
        <Link
          href="/dashboard/expenses/create"
          className="bg-persian-green-950 flex-1 text-black-bean-50 rounded-md p-2 text-center"
        >
          Add Expense
        </Link>
      </div>
    </>
  );
}
