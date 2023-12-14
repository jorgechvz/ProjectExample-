  import Balance from "@/components/ui/balance/Balance";
  import Budget from "@/components/ui/budget/Budget";
  import Expenses from "@/components/ui/expenses/Expenses";
  import Incomes from "@/components/ui/incomes/Incomes";
  import Savings from "@/components/ui/savings/Savings";
  import Transactions from "@/components/ui/transactions/Transactions";
  export default function Page() {
    return (
      <div className="lg:p-4 p-2">
        <section className="flex flex-col md:justify-evenly md:flex-row md:gap-x-8 gap-y-4">
          <div className="self-center flex-1 w-full bg-black-bean-100 p-4 rounded-lg">
            <Incomes />
          </div>
          <div className="md:max-w-xs w-60 self-center">
            <Balance />
          </div>
          <div className="self-center flex-1 bg-black-bean-100 w-full p-4 rounded-lg">
            <Expenses />
          </div>
        </section>
        <section className="md:grid grid-cols-2 gap-4">
          <div className="w-full mt-10 shadow-xl shadow-blue-charcoal-950 p-4 rounded-md">
            <Savings />
          </div>
          <div className="col-start-2 mb-10 col-end-3 row-start-1 row-end-3 w-full mt-10 rounded-lg shadow-xl shadow-blue-charcoal-950 p-4">
            <Budget />
          </div>
          <div className="row-start-2 row-end-3 col-start-1 col-end-2 w-full shadow-xl shadow-blue-charcoal-950 p-4 rounded-md">
            <Transactions />
          </div>
        </section>
      </div>
    );
  }
