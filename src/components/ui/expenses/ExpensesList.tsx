"use server";

import { auth } from "@/auth";
import Pagination from "../commons/Pagination";
import { fetchFilteredExpenses } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { DeleteExpenseButton } from "../commons/Actions";

export default async function ExpensesList({
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

  const expenses = await fetchFilteredExpenses(userId, query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block lg:min-w-full md:min-w-full max-w-full align-middle">
        <div className="p-2 md:pt-0 scroll-smooth overflow-x-auto">
          <table className="min-w-full table scroll-auto">
            <thead className="border-b-2">
              <tr>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Expense Category
                </td>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Amount
                </td>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Budget
                </td>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Action
                </td>
              </tr>
            </thead>
            <tbody className="bg-silverSand-50 text-silverSand-950 ">
              {expenses?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.category.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex items-center justify-start lg:pl-2">
                      <p
                        className={`whitespace-nowrap w-14 text-center text-black-bean-50 px-4 py-2 rounded-xl ${
                          item.budgetId
                            ? "bg-blue-charcoal-900"
                            : "bg-persian-green-950"
                        }`}
                      >
                        {item.budgetId ? "Yes" : "No"}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div>
                      <DeleteExpenseButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
