"use client";

import { CreateIncome, CreateSaving } from "@/lib/actions";
import { IncomeSaving } from "@/lib/types";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Select, SelectItem, Switch, cn } from "@nextui-org/react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { MdAttachMoney } from "react-icons/md";
import { Button } from "../commons/Button";

export default function SavingCreateForm({ userId }: { userId: string }) {
  const initialState = { message: "", errors: {} };
  const [formState, savingForm] = useFormState(CreateSaving, initialState);

  return (
    <form action={savingForm}>
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
            Saving Name
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
          <label
            className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"
            htmlFor="description"
          >
            Saving Description
          </label>
        </div>
        <div>
          <input
            className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-4 text-sm outline-2 placeholder:text-blue-charcoal-950"
            type="text"
            name="description"
            id="description"
            placeholder="Enter Income Name"
            required
          />
        </div>
      </div>
      <div>
        <div>
          <label className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950">
            Enter Goal
          </label>
        </div>
        <div className="relative">
          <input
            className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-charcoal-950"
            type="text"
            name="goal"
            id="goal"
            placeholder="Enter goal"
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
            Enter Start Date
          </label>
        </div>
        <div>
          <input
            className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] px-4 text-sm outline-2"
            type="date"
            name="startDate"
            id="startDate"
            placeholder="Enter Date"
            required
          />
        </div>
      </div>
      <div>
        <div>
          <label
            className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"
            htmlFor="date"
          >
            Enter End Date
          </label>
        </div>
        <div>
          <input
            className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] px-4 text-sm outline-2"
            type="date"
            name="endDate"
            id="endDate"
            placeholder="Enter Date"
            required
          />
        </div>
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
      Create Saving
    </Button>
  );
}
