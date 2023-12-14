import { auth } from "@/auth";
import ExpenseForm from "@/components/ui/expenses/ExpenseForm";
import {
  fetchAllCategories,
  fetchBudgetsByUserWithoutExpenses,
} from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Income - BudgetBuddy",
};

export default async function ExpenseCreatePage() {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const budgets = await fetchBudgetsByUserWithoutExpenses(userId);

  const categories = await fetchAllCategories();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl text-blue-charcoal-950">Create Expense</h1>
      <ExpenseForm userId={userId} categories={categories} budget={budgets} />
    </div>
  );
}
