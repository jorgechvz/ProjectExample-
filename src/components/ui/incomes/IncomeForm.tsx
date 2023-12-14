"use client";

import { CreateIncome } from "@/lib/actions";
import { IncomeSaving } from "@/lib/types";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Select, SelectItem, Switch, cn } from "@nextui-org/react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { MdAttachMoney } from "react-icons/md";
import { Button } from "../commons/Button";

export default function IncomesCreateForm({
  userId,
  savings,
}: {
  userId: string;
  savings: IncomeSaving[];
}) {
  const initialState = { message: "", errors: {} };
  const [formState, incomeForm] = useFormState(CreateIncome, initialState);
  const [isSaving, setIsSaving] = useState(false);
  const handleToggleClick = () => {
    setIsSaving(!isSaving);
  };

  return (
    <form action={incomeForm}>
      {formState?.message && (
        <div
          className="flex mt-5 h-8 items-center justify-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <ExclamationCircleIcon className="h-5 w-5 text-bright-red-800" />
          <div className="text-md text-bright-red-800">{formState.message}</div>
        </div>
      )}
      <div>
        <input
          type="text"
          className="hidden"
          name="userId"
          defaultValue={userId}
          id="userId"
        />
      </div>
      <div>
        <div>
          <label
            className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"
            htmlFor="name"
          >
            Income Name
          </label>
        </div>
        <div>
          <input
            className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-4 text-sm outline-2 placeholder:text-blue-charcoal-950"
            type="text"
            name="name"
            id="name"
            placeholder="Enter Income Name"
            required
          />
        </div>
      </div>
      <div>
        <div>
          <label className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950">
            Enter Amount
          </label>
        </div>
        <div className="relative">
          <input
            className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-charcoal-950"
            type="text"
            name="amount"
            id="amount"
            placeholder="Enter Amount"
            required
          />
          <MdAttachMoney className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-charcoal-950 peer-focus:text-blue-charcoal-950" />
        </div>
      </div>
      <div>
        <div>
          <label
            className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"
            htmlFor="date"
          >
            Enter Date
          </label>
        </div>
        <div>
          <input
            className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] px-4 text-sm outline-2"
            type="date"
            name="date"
            id="date"
            placeholder="Enter Date"
            required
          />
        </div>
      </div>
      <div>
        <div className="mt-5">
          <Switch
            classNames={{
              base: cn(
                "inline-flex flex-row-reverse w-full max-w-md items-center",
                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary"
              ),
              wrapper: "p-0 h-4 overflow-visible bg-black-bean-200 ",
              thumb: cn(
                "w-6 h-6 border-2 shadow-lg shadow-blue-charcoal-950 bg-black-bean-800",
                "group-data-[hover=true]:border-blue-charcoal-900",
                //selected
                "group-data-[selected=true]:ml-6",
                // pressed
                "group-data-[pressed=true]:w-7",
                "group-data-[selected]:group-data-[pressed]:ml-4"
              ),
            }}
            defaultSelected={isSaving}
            onChange={handleToggleClick}
          >
            {isSaving
              ? "Income will go to savings"
              : "Income will not go to savings"}
          </Switch>
        </div>
        {isSaving && (
          <div className="mt-5">
            <Select
              classNames={{
                trigger: "border-2 border-persian-green-950 rounded-lg",
                listboxWrapper:
                  "bg-persian-green-950 text-black-bean-50 rounded-lg",
              }}
              name="savingId"
              id="savingId"
              placeholder="Select a Saving"
              className="max-w-md"
            >
              {savings.map((saving) => (
                <SelectItem key={saving.id} value={saving.id as string}>
                  {saving.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}
      </div>
      <div className="lg:w-[70%] w-1/2 mx-auto mt-10 bg-persian-green-950 text-persian-green-50 rounded-lg">
        <CreateIncomeSubmit />
      </div>
    </form>
  );
}

function CreateIncomeSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="mt-4 w-full flex justify-center"
      aria-disabled={pending}
    >
      Create Income
    </Button>
  );
}
