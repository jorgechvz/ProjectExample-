import {
  MdAccountCircle,
  MdReviews,
  MdSavings,
  MdDashboard
} from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import MenuLink from "./menulink/MenuLink";


const myAccountMenu = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Incomes",
        path: "/dashboard/incomes",
        icon: <FaMoneyBillTrendUp />,
      },
      {
        title: "Expenses",
        path: "/dashboard/expenses",
        icon: <GiPayMoney />,
      },
      {
        title: "Budgets",
        path: "/dashboard/budgets",
        icon: <TbReportMoney  />,
      },
      {
        title: "Savings",
        path: "/dashboard/savings",
        icon: <MdSavings />,
      },
      {
        title: "My Profile",
        path: "/dashboard/profile",
        icon: <MdAccountCircle />,
      },
    ],
  }
];

export default function Asidebar() {
  
  return (
    <div className="md:pt-10 py-5 px-4">
      <ul>
        {myAccountMenu.map((cat) => (
          <li key={cat.title} className="flex flex-row lg:block flex-wrap gap-x-5 md:justify-between">
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};