import { auth } from "@/auth";
import { fetchLastThreeTransactions } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export default async function Transactions() {
  const session = await auth();
  const userId: string = session?.user?.id as string;
  const getTransactions = await fetchLastThreeTransactions(userId);

  if (getTransactions && getTransactions?.length > 0) {
    return (
      <>
        <div>
          <h2 className="md:text-2xl text-lg font-bold">Last Transactions</h2>
          <Divider className="h-1 mt-2 bg-blue-charcoal-950 mb-3" />
        </div>
        <div>
          {getTransactions?.map((transaction) => (
            <div key={transaction.id} className="flex justify-between h-14">
              <div>
                <p className="md:text-lg text-md font-bold">
                  {transaction.type}
                </p>
                <p className="md:text-sm text-xs">{transaction.category}</p>
              </div>
              <div>
                <p
                  className={`${
                    transaction.type === "Expense"
                      ? "text-bright-red-500"
                      : "text-blue-charcoal-900"
                  }`}
                >
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <h2 className="md:text-2xl text-lg font-bold">Last Transactions</h2>
          <Divider className="h-1 mt-2 bg-blue-charcoal-950 mb-3" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg">You don't have any transactions yet.</p>
          <p className="text-6xl">
            <FaMoneyBillTransfer />
          </p>
        </div>
      </>
    );
  }
}
