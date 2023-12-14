import { Budget, Category, ExpenseBudget } from "@/lib/types";

type BudgetEditFormProps = {
    budget: Budget | null;
    expenses: ExpenseBudget[];
  };

export default function BudgetEditForm({
    budget,
    categories,
}: {
    budget: BudgetEditFormProps;
    categories: Category[];
}){

} 
    