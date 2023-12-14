import { auth } from "@/auth";
import BudgetForm from "@/components/ui/budget/BudgetForm";
import { fetchAllCategories } from "@/lib/data";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Budget - Budget Buddy",
};
export default async function CreateBudgetPage() {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const categories = await fetchAllCategories();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl text-blue-charcoal-950">Create Budget</h1>
      <BudgetForm userId={userId} categories={categories}  />
    </div>
  );
}
