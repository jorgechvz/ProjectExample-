"use client";

import { Category, ExpenseBudget } from "@/lib/types";
import CreateBudget, { CreateExpense } from "@/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Select, SelectItem, Switch, cn } from "@nextui-org/react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { MdAttachMoney } from "react-icons/md";
import { Button } from "../commons/Button";
import { FaPlus } from "react-icons/fa";

import { IoFastFoodSharp } from "react-icons/io5";
import {
  FaCar,
  FaHome,
  FaHandHoldingWater,
  FaShoppingBag,
  FaBook,
  FaHandHoldingHeart,
  FaUserShield,
  FaFileInvoiceDollar,
  FaCut,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import {
  FaPhotoFilm,
  FaSuitcaseRolling,
  FaDog,
  FaClipboardList,
} from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";
import { mapIcons } from "../budget/Budget";

export default function BudgetForm({
  userId,
  categories,
}: {
  userId: string;
  categories: Category[];
}) {
  const initialState = { message: "", errors: {} };
  const [formState, budgetForm] = useFormState(CreateBudget, initialState);

  return (
    <form action={budgetForm}>
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
          <label className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"></label>
        </div>
        <div className="relative">
          <input
            className="block w-full border-2 border-persian-green-950 rounded-lg py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-charcoal-950"
            type="text"
            name="amount"
            id="amount"
            placeholder="Enter Amount"
            required
          />
          <MdAttachMoney className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-charcoal-950 peer-focus:text-blue-charcoal-950" />
        </div>
      </div>
      <div className="mt-5">
        <Select
          scrollShadowProps={{
            isEnabled: false,
          }}
          disableSelectorIconRotation
          classNames={{
            trigger: "border-2 border-persian-green-950 rounded-lg",
            listboxWrapper:
              "bg-persian-green-950 text-black-bean-50 rounded-lg h-[200px]",
          }}
          name="categoryId"
          id="categoryId"
          placeholder="Select a Category"
          className="max-w-md"
        >
          {categories.map((category) => (
            <SelectItem
              startContent={mapIcons[category.icon as string]}
              key={category.id}
              value={category.id as string}
            >
              {category.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="lg:w-[70%] w-1/2 mx-auto mt-10 bg-persian-green-950 text-persian-green-50 rounded-lg">
        <CreateBudgetSubmit />
      </div>
    </form>
  );
}

function CreateBudgetSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="mt-4 w-full flex justify-center"
      aria-disabled={pending}
    >
      Create Budget
    </Button>
  );
}
