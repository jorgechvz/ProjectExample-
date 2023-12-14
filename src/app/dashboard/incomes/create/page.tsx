import { auth } from "@/auth";
import IncomesCreateForm from "@/components/ui/incomes/IncomeForm";
import { fetchSavingsByUserId } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Income - BudgetBuddy",
};

export default async function IncomesCreatePage() {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const savings = await fetchSavingsByUserId(userId);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl text-blue-charcoal-950">Create Income</h1>
      <IncomesCreateForm userId={userId} savings={savings} />
    </div>
  );
}
