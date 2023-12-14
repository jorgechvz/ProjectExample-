"use server";

import { auth } from "@/auth";
import Pagination from "../commons/Pagination";
import { formatCurrency } from "@/lib/utils";
import { fetchAllBudgetsByUserId } from "@/lib/data";
import { DeleteBudgetButton, EditBudgetButton } from "../commons/Actions";

export default async function BudgetsList({
  query,
  currentPage,
  totalPages,
}: {
  query: string;
  currentPage: number;
  totalPages: number;
}) {
  const session = await auth();
  const userId: string = session?.user?.id as string;

  const budgets = await fetchAllBudgetsByUserId(userId);

  const getTotalExpenses = budgets.reduce((acc, budget) => {
    return (
      acc +
      budget.expenses.reduce((acc, expense) => {
        return acc + expense.amount;
      }, 0)
    );
  }, 0);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block lg:min-w-full md:min-w-full max-w-full align-middle">
        <div className="p-2 md:pt-0 scroll-smooth overflow-x-auto">
          <table className="min-w-full table scroll-auto">
            <thead className="border-b-2">
              <tr>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Budget Name
                </td>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Budget Amount
                </td>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Budget Category
                </td>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Budget Expenses
                </td>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Action
                </td>
              </tr>
            </thead>
            <tbody className="bg-silverSand-50 text-silverSand-950 ">
              {budgets?.map((item) => (
                <tr key={item.id} className="w-full py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap px-3 py-3">{item.name}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.category.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.expenses.length != 0
                      ? formatCurrency(getTotalExpenses)
                      : "No Expenses"}
                  </td>
                  <td className="flex whitespace-nowrap py-3 pl-6 pr-3">
                    <div>
                      <DeleteBudgetButton id={item.id} />
                    </div>
                    {/* <div>
                      <EditBudgetButton id={item.id} />
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t-2 mt-2 py-3 flex justify-center items-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
