"use client"

import { formatCurrency } from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: "65%",
};

export default function BalanceChart({ data1, data2, total } : { data1: number, data2: number, total: number }) {
  const data = {
    datasets: [
      {
        data: [data1, data2],
        backgroundColor: ["#00357a", "#ac0606"],
        borderColor: ["#00357a", "#ac0606"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="relative">
      <Doughnut data={data} options={options} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:text-2xl text-xl font-bold">
        <h2 className="text-[.7em] font-normal">Balance</h2>
        {formatCurrency(total)}
      </div>
    </div>
  );
}