import { auth } from "@/auth";
import BudgetForm from "@/components/ui/budget/BudgetForm";
import { fetchAllCategories, fetchBudgetById } from "@/lib/data";

export default async function EditBudgetPage({
  params,
}: {
  params: { id: string };
}) {
  const categories = await fetchAllCategories();
  const budget = await fetchBudgetById(params.id);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl text-blue-charcoal-950">Edit Budget</h1>
      {/* <BudgetEditForm userId={params.id} categories={categories} /> */}
    </div>
  );
}
