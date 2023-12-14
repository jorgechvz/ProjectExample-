import { auth } from "@/auth";
import { CreateIncomeButton } from "@/components/ui/commons/Actions";
import Search from "@/components/ui/commons/Search";
import IncomesList from "@/components/ui/incomes/IncomesList";
import {
  fetchIncomesByLastMonth,
  fetchIncomesPages,
  fetchTotalIncomes,
  fetchTotalIncomesInSavings,
} from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { MdCalendarMonth } from "react-icons/md";
import { FaPiggyBank } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";

export default async function IncomesPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: number };
}) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);

  const totalIncome = await fetchTotalIncomes(userId);
  const totalIncomeMonth = await fetchIncomesByLastMonth(userId);
  const totalIncomeSaving = await fetchTotalIncomesInSavings(userId);

  const totalPages = await fetchIncomesPages(query, userId);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-blue-charcoal-950 text-3xl my-5 font-bold">
        Your Incomes
      </h1>
      <div className="lg:flex gap-4">
        <div className="flex lg:mb-0 mb-5 p-5 justify-around items-center flex-1 gap-x-5 rounded-xl shadow-2xl shadow-blue-charcoal-950">
          <div>
            <h3>Incomes</h3>
            <p className="text-2xl">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="text-[42px]">
            <GrMoney />
          </div>
        </div>
        <div className="flex lg:mb-0 mb-5 p-5 justify-around items-center flex-1 gap-x-5 rounded-xl shadow-2xl shadow-blue-charcoal-950">
          <div>
            <h3>Incomes Last Month</h3>
            <p className="text-2xl">{formatCurrency(totalIncomeMonth)}</p>
          </div>
          <div className="text-[42px]">
            <MdCalendarMonth />
          </div>
        </div>
        <div className="flex lg:mb-0 mb-5 p-5 justify-around items-center flex-1 gap-x-5 rounded-xl shadow-2xl shadow-blue-charcoal-950">
          <div>
            <h3>Incomes Savings</h3>
            <p className="text-2xl">{formatCurrency(totalIncomeSaving)}</p>
          </div>
          <div className="text-[42px]">
            <FaPiggyBank />
          </div>
        </div>
      </div>
      <div className="rounded-lg shadow-2xl shadow-persian-green-950 p-5 my-10">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search Incomes" />
          <CreateIncomeButton />
        </div>
        <div>
          <IncomesList
            query={query}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
