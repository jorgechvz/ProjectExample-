"use server";

import { auth } from "@/auth";
import { fetchFilteredSavings } from "@/lib/data";

import Pagination from "../commons/Pagination";
import { formatCurrency } from "@/lib/utils";
import { DeleteSavingButton } from "../commons/Actions";

export default async function SavingsList({
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

  const savings = await fetchFilteredSavings(userId, query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block lg:min-w-full md:min-w-full max-w-full align-middle">
        <div className="p-2 md:pt-0 scroll-smooth overflow-x-auto">
          <table className="min-w-full table scroll-auto">
            <thead className="border-b-2">
              <tr>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Saving Name
                </td>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Amount
                </td>
                <td scope="col" className="px-3 py-3 font-bold text-lg">
                  Action
                </td>
              </tr>
            </thead>
            <tbody className="bg-silverSand-50 text-silverSand-950 ">
              {savings?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">{item.name}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(item.goal)}
                  </td>
                  <td>
                    <div className="flex items-center justify-start lg:pl-4">
                      <DeleteSavingButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 pt-2 border-t-2 flex justify-center items-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
