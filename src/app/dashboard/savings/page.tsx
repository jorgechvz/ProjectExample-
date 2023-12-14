import { auth } from "@/auth";
import { CreateSavingButton } from "@/components/ui/commons/Actions";
import Search from "@/components/ui/commons/Search";
import SavingsList from "@/components/ui/savings/SavingsList";
import {
  fetchSavingsByUserId,
  fetchSavingsPages,
  fetchTotalIncomesInSavings,
} from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { GrMoney } from "react-icons/gr";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Saving - Budget Buddy",
};
export default async function SavingsPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: number };
}) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);

  const totalSavings = await fetchSavingsByUserId(userId);
  const totalIncomeSaving = await fetchTotalIncomesInSavings(userId);

  const totalPages = await fetchSavingsPages(query, userId);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-blue-charcoal-950 text-3xl my-5 font-bold">
        Your Savings
      </h1>
      <div className="lg:flex gap-4">
        <div className="flex lg:mb-0 mb-5 p-5 justify-around items-center flex-1 gap-x-5 rounded-xl shadow-2xl shadow-blue-charcoal-950">
          <div>
            <h3>Savings</h3>
            <p className="text-2xl">{formatCurrency(totalIncomeSaving)}</p>
          </div>
          <div className="text-[42px]">
            <GrMoney />
          </div>
        </div>
      </div>
      <div className="rounded-lg shadow-2xl shadow-persian-green-950 p-5 my-10">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search Incomes" />
          <CreateSavingButton />
        </div>
        <div>
          <SavingsList
            query={query}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
