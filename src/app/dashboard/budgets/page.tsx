import { auth } from "@/auth";
import BudgetsList from "@/components/ui/budget/BudgetList";
import { CreateBudgetButton } from "@/components/ui/commons/Actions";
import Search from "@/components/ui/commons/Search";
import { fetchExpensesPages } from "@/lib/data";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Budgets - Budget Buddy",
};
export default async function BudgetsPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: number };
}) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);

  const totalPages = await fetchExpensesPages(query, userId);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-blue-charcoal-950 text-3xl my-5 font-bold">
        Your Budgets
      </h1>
      <div className="rounded-lg shadow-2xl shadow-persian-green-950 p-5 my-10">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search Expenses" />
          <CreateBudgetButton />
        </div>
        <BudgetsList
          query={query}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
