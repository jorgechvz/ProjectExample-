import { auth } from "@/auth";
import { fetchLastThreeBudgetsByUserId } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
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

export interface IconMap {
  [key: string]: JSX.Element;
}
export const mapIcons: IconMap = {
  IoFastFoodSharp: <IoFastFoodSharp />,
  FaCar: <FaCar />,
  FaDog: <FaDog />,
  FaHome: <FaHome />,
  FaHandHoldingWater: <FaHandHoldingWater />,
  MdHealthAndSafety: <MdHealthAndSafety />,
  FaPhotoFilm: <FaPhotoFilm />,
  FaShoppingBag: <FaShoppingBag />,
  FaBook: <FaBook />,
  GrMoney: <GrMoney />,
  FaSuitcaseRolling: <FaSuitcaseRolling />,
  FaHandHoldingHeart: <FaHandHoldingHeart />,
  PetFaDogs: <FaDog />,
  FaUserShield: <FaUserShield />,
  FaFileInvoiceDollar: <FaFileInvoiceDollar />,
  FaCut: <FaCut />,
  FaClipboardList: <FaClipboardList />,
};

export default async function Budget() {
  /* Get Session */
  const session = await auth();
  const userId = session?.user?.id;

  /* Get Budgets */
  const latestBudget = await fetchLastThreeBudgetsByUserId(userId as string);

  if (latestBudget?.length === 0) {
    return (
      <>
        <div className="flex justify-between items-center">
          <h2 className="md:text-2xl text-lg font-bold">Latest Budgets</h2>
          <Link href="/dashboard/budgets">
            <FaPlus className="md:text-2xl text-lg" />
          </Link>
        </div>
        <Divider className="h-1 mt-2 bg-blue-charcoal-950 rounded-md" />
        <div className="mt-5 flex flex-col justify-center items-center">
          <p className="text-lg">You dont have any budgets yet.</p>
          <p className="text-6xl">
            <TbReportMoney />
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="md:text-2xl text-lg font-bold">Latest Budgets</h2>
        <Link href="/dashboard/budgets">
          <FaPlus className="md:text-2xl text-lg" />
        </Link>
      </div>
      <Divider className="h-1 mt-2 bg-blue-charcoal-950 rounded-md" />
      <div className="my-4">
        {latestBudget?.map((budget) => (
          <div
            key={budget.id}
            className="my-3 flex items-start justify-between"
          >
            <div className="flex items-center gap-x-4">
              <p className="md:text-3xl text-xl text-persian-green-50 bg-blue-charcoal-950 rounded-full p-2">
                {mapIcons[budget.category?.icon as string]}
              </p>
              <div>
                <h3 className="font-bold md:text-lg text-md">{budget.name}</h3>
                <p className="md:text-sm text-xs">{budget.category?.name}</p>
              </div>
            </div>
            <p className="md:text-lg text-md font-bold">
              {formatCurrency(budget.amount)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
