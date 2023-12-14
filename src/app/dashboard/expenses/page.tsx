import { auth } from "@/auth";
import { CreateExpenseButton } from "@/components/ui/commons/Actions";
import Search from "@/components/ui/commons/Search";
import ExpensesList from "@/components/ui/expenses/ExpensesList";
import {
  fetchExpensesPages,
  fetchTotalExpenses,
  fetchTotalExpensesByLastMonth,
  fetchTotalExpensesInBudgets,
} from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { FaPiggyBank } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { MdCalendarMonth } from "react-icons/md";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Expenses - Budget Buddy",
};
export default async function ExpensesPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: number };
}) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);

  const totalExpense = await fetchTotalExpenses(userId);
  const totalExpenseMonth = await fetchTotalExpensesByLastMonth(userId);
  const totalExpenseSaving = await fetchTotalExpensesInBudgets(userId);

  const totalPages = await fetchExpensesPages(query, userId);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-blue-charcoal-950 text-3xl my-5 font-bold">
        Your Expenses
      </h1>
      <div className="lg:flex gap-4">
        <div className="flex lg:mb-0 mb-5 p-5 justify-around items-center flex-1 gap-x-5 rounded-xl shadow-2xl shadow-blue-charcoal-950">
          <div>
            <h3>Expenses</h3>
            <p className="text-2xl">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="text-[42px]">
            <GrMoney />
          </div>
        </div>
        <div className="flex lg:mb-0 mb-5 p-5 justify-around items-center flex-1 gap-x-5 rounded-xl shadow-2xl shadow-blue-charcoal-950">
          <div>
            <h3>Expenses Last Month</h3>
            <p className="text-2xl">{formatCurrency(totalExpenseMonth)}</p>
          </div>
          <div className="text-[42px]">
            <MdCalendarMonth />
          </div>
        </div>
        <div className="flex lg:mb-0 mb-5 p-5 justify-around items-center flex-1 gap-x-5 rounded-xl shadow-2xl shadow-blue-charcoal-950">
          <div>
            <h3>Expenses Savings</h3>
            <p className="text-2xl">{formatCurrency(totalExpenseSaving)}</p>
          </div>
          <div className="text-[42px]">
            <FaPiggyBank />
          </div>
        </div>
      </div>
      <div className="rounded-lg shadow-2xl shadow-persian-green-950 p-5 my-10">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search Expenses" />
          <CreateExpenseButton />
        </div>
        <div>
          <ExpensesList
            query={query}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
