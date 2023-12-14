import { deleteBudget, deleteExpense, deleteIncome, fetchDeleteSaving } from "@/lib/data";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

/* Buttons for Incomes */

export function CreateIncomeButton() {
  return (
    <Link
      href="/dashboard/incomes/create"
      className="flex h-10 text-black-bean-50 items-center rounded-lg bg-blue-charcoal-950 px-4 text-sm font-medium text-white transition-colors hover:bg-persian-green-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-charcoal-950"
    >
      <span className="hidden md:block">Create Income</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteIncomeButton({ id }: { id: string }) {
  const deleteItem = deleteIncome.bind(null, id);
  return (
    <>
      <form action={deleteItem}>
        <button className="rounded-md border p-2 bg-bright-red-500 text-black-bean-50">
          <span className="sr-only hidden">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}


/* Buttons for Expenses */

export function CreateExpenseButton() {
  return (
    <Link
      href="/dashboard/expenses/create"
      className="flex h-10 text-black-bean-50 items-center rounded-lg bg-blue-charcoal-950 px-4 text-sm font-medium text-white transition-colors hover:bg-persian-green-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-charcoal-950"
    >
      <span className="hidden md:block">Create Expense</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteExpenseButton({ id }: { id: string }) {
  const deleteItem = deleteExpense.bind(null, id);
  return (
    <>
      <form action={deleteItem}>
        <button className="rounded-md border p-2 bg-bright-red-500 text-black-bean-50">
          <span className="sr-only hidden">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

/* Buttons for Budgets */

export function CreateBudgetButton() {
  return (
    <Link
      href="/dashboard/budgets/create"
      className="flex h-10 text-black-bean-50 items-center rounded-lg bg-blue-charcoal-950 px-4 text-sm font-medium text-white transition-colors hover:bg-persian-green-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-charcoal-950"
    >
      <span className="hidden md:block">Create Budget</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteBudgetButton({ id }: { id: string }) {
  const deleteItem = deleteBudget.bind(null, id);
  return (
    <>
      <form action={deleteItem}>
        <button className="rounded-md border p-2 bg-bright-red-500 text-black-bean-50">
          <span className="sr-only hidden">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

export function EditBudgetButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/budgets/${id}/edit`}
      className="flex h-10 text-black-bean-50 items-center rounded-lg bg-blue-charcoal-950 px-4 text-sm font-medium text-white transition-colors hover:bg-persian-green-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-charcoal-950"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

/* Buttons for Savings */

export function CreateSavingButton() {
  return (
    <Link
      href="/dashboard/savings/create"
      className="flex h-10 text-black-bean-50 items-center rounded-lg bg-blue-charcoal-950 px-4 text-sm font-medium text-white transition-colors hover:bg-persian-green-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-charcoal-950"
    >
      <span className="hidden md:block">Create Saving</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteSavingButton({ id }: { id: string }) {
  const deleteItem = fetchDeleteSaving.bind(null, id);
  return (
    <>
      <form action={deleteItem}>
        <button className="rounded-md border p-2 bg-bright-red-500 text-black-bean-50">
          <span className="sr-only hidden">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}