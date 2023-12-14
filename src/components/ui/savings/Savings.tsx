import { auth } from "@/auth";
import { fetchLastSaving } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Divider, Progress } from "@nextui-org/react";
import { MdOutlineSavings } from "react-icons/md";

export default async function Savings() {
  const session = await auth();
  const userId: string = session?.user?.id as string;
  const lastSaving = await fetchLastSaving(userId);
  const goalSaving = lastSaving?.goal;
  const incomeInSaving = lastSaving?.incomes
    .map((income) => income.amount)
    .reduce((a, b) => a + b, 0);
  if (lastSaving != null) {
    return (
      <>
        <div>
          <h2 className="md:text-2xl text-lg font-bold">Last Saving</h2>
          <Divider className="h-1 mt-2 bg-blue-charcoal-950 mb-3" />
          <div className="flex justify-between md:text-xl text-md">
            <p>Goal for {lastSaving?.name}</p>
            <p className="font-bold">
              {goalSaving != undefined
                ? formatCurrency(goalSaving as number)
                : formatCurrency(0)}
            </p>
          </div>
          <p className="my-4 md:text-lg text-sm font-bold">Your Progress</p>
        </div>
        {lastSaving && (
          <Progress
            className="md:text-lg text-md"
            label="Income in saving"
            size="lg"
            value={incomeInSaving}
            maxValue={goalSaving}
            formatOptions={{ style: "currency", currency: "USD" }}
            showValueLabel={true}
            classNames={{
              label: "text-white",
              track: "border",
              base: "bg-royal-blue-100",
              indicator: "bg-persian-green-950",
            }}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <h2 className="md:text-2xl text-lg font-bold">Last Saving</h2>
        <Divider className="h-1 mt-2 bg-blue-charcoal-950 mb-3" />
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg">You don't have any savings yet.</p>
          <p className="text-6xl">
            <MdOutlineSavings />
          </p>
        </div>
      </>
    );
  }
}
