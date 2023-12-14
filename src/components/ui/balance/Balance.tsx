import { auth } from "@/auth";
import { fetchTotalExpenses, fetchTotalIncomes } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import BalanceChart from "../charts/BalanceChart";

export default async function Balance() {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const totalIncome = await fetchTotalIncomes(userId);
  const totalExpense = await fetchTotalExpenses(userId);

  const total = totalIncome - totalExpense;
  return (
    <div className="flex flex-col text-center">
      <BalanceChart data1={totalIncome} data2={totalExpense} total={total} />
    </div>
  );
}