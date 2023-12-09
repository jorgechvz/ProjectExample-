export default function Features() {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <p>Everything you need</p>
            <h2 className="text-3xl font-extrabold text-white">
              A better way to manage your finances
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Take charge of your financial destiny and embrace a new era of
              money management. BudgetBuddy offers a seamless experience,
              ensuring your path to financial success is both rewarding and
              stress-free.
            </p>
          </div>
          <div className="mt-12 lg:mt-7 lg:col-span-2">
            <div className="space-y-8">
              <div>
                <p className="text-lg leading-6 font-medium text-white">
                  Intuitive Interface
                </p>
                <p className="mt-2 text-base text-gray-400">
                  Easily add and categorize your income and expenses with our
                  user-friendly interface.
                </p>
              </div>
              <div>
                <p className="text-lg leading-6 font-medium text-white">
                  Budget Tracking
                </p>
                <p className="mt-2 text-base text-gray-400">
                  Visualize your spending habits with easy-to-understand
                  representations of your various spending categories.
                </p>
              </div>
              <div>
                <p className="text-lg leading-6 font-medium text-white">
                  Savings Goal Setting
                </p>
                <p className="mt-2 text-base text-gray-400">
                  Set and achieve your savings goals with progress indicators
                  that keep you motivated.
                </p>
              </div>
              <div>
                <p className="text-lg leading-6 font-medium text-white">
                  Financial Insights
                </p>
                <p className="mt-2 text-base text-gray-400">
                  Gain basic financial insights and generate simple reports to
                  stay informed about your financial health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
