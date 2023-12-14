import { auth } from "@/auth";
import IncomesCreateForm from "@/components/ui/incomes/IncomeForm";
import SavingCreateForm from "@/components/ui/savings/SavingForm";
import { fetchSavingsByUserId } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Saving - BudgetBuddy",
};

export default async function CreateSavingPage() {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl text-blue-charcoal-950">Create Income</h1>
      <SavingCreateForm userId={userId} />
    </div>
  );
}
