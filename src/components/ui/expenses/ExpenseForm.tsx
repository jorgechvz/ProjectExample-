"use client";

import { Category, ExpenseBudget } from "@/lib/types";
import { CreateExpense } from "@/lib/actions";
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

export default function ExpenseForm({
  userId,
  categories,
  budget,
}: {
  userId: string;
  categories: Category[];
  budget: ExpenseBudget[];
}) {
  const initialState = { message: "", errors: {} };
  const [formState, expenseForm] = useFormState(CreateExpense, initialState);
  const [isBudget, setIsBudget] = useState(false);
  const handleToggleClick = () => {
    setIsBudget(!isBudget);
  };
  return (
    <form action={expenseForm}>
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
      <div>
        <div>
          <label
            className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"
            htmlFor="date"
          ></label>
        </div>
        <div>
          <input
            className="block w-full border-2 border-persian-green-950 rounded-lg py-[9px] px-4 text-sm outline-2"
            type="date"
            name="date"
            id="date"
            placeholder="Enter Date"
            required
          />
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
            defaultSelected={isBudget}
            onChange={handleToggleClick}
          >
            {isBudget
              ? "Expense will go to Budgets"
              : "Expense will not go to Budgets"}
          </Switch>
        </div>
        {isBudget && (
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
              name="budgetId"
              id="budgetId"
              placeholder="Select a Budget"
              className="max-w-md"
            >
              {budget.map((budget) => (
                <SelectItem key={budget.id} value={budget.id as string}>
                  {budget.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}
      </div>
      <div className="lg:w-[70%] w-1/2 mx-auto mt-10 bg-persian-green-950 text-persian-green-50 rounded-lg">
        <CreateExpenseSubmit />
      </div>
    </form>
  );
}

function CreateExpenseSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="mt-4 w-full flex justify-center"
      aria-disabled={pending}
    >
      Create Expense
    </Button>
  );
}
