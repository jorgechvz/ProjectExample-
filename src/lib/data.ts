"use server";

import db from "./db";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

/* ------- Fetch for Users --------- */
export async function fetchUsers() {
  noStore();
  try {
    const users = await db.user.findMany();
    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function fetchUserByEmail(email: string) {
  noStore();
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: { accounts: true },
    });
    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

/* ------- Fetch for Categories ----- */

export async function fetchAllCategories() {
  noStore();
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categories.");
  }
}

/* ------- Fetch for Budget --------- */

export async function fetchAllBudgetsByUserId(userId: string) {
  noStore();
  try {
    const budgets = await db.budget.findMany({
      where: { userId },
      include: { expenses: true, category: true },
    });
    return budgets;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch budgets.");
  }
}

export async function fetchBudgetById(id: string) {
  noStore();
  try {
    const budget = await db.budget.findUnique({
      where: { id },
      include: { expenses: true, category: true },
    });
    return budget;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch budgets.");
  }
}

export async function fetchBudgetsByUserWithoutExpenses(userId: string) {
  noStore();
  try {
    const budgets = await db.budget.findMany({
      where: { userId },
    });
    return budgets;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch budgets.");
  }
}

export async function fetchLastThreeBudgetsByUserId(userId: string) {
  noStore();
  try {
    const budgets = await db.budget.findMany({
      where: { userId },
      include: { expenses: true, category: true },
      take: 7,
      orderBy: { createdAt: "desc" },
    });
    return budgets;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch last 3 budgets.");
  }
}

/* ------- Fetch for Expenses --------- */

export async function fetchExpenses(id: string) {
  noStore();
  try {
    const expenses = await db.expense.findMany({
      where: { id },
    });
    return expenses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expenses.");
  }
}

export async function fetchTotalExpenses(userId: string) {
  noStore();
  try {
    const expenses = await db.expense.findMany({
      where: { userId },
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    return totalExpenses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total expense.");
  }
}

export async function fetchExpensesByBudgetId(budgetId: string) {
  noStore();
  try {
    const expenses = await db.expense.findMany({
      where: { budgetId },
    });
    return expenses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expenses in budgets.");
  }
}

export async function fetchTotalExpensesByLastMonth(userId: string) {
  noStore();
  try {
    const expenses = await db.expense.findMany({
      where: {
        userId,
        date: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
    });
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return totalExpenses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expenses.");
  }
}
const EXPENSES_PER_PAGE = 10;
export async function fetchFilteredExpenses(
  userId: string,
  query: string,
  currentPage: number
) {
  try {
    noStore();
    const offset = (currentPage - 1) * INCOMES_PER_PAGE;

    const expenses = await db.expense.findMany({
      where: {
        userId,
        OR: [
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: { category: true },
      orderBy: { date: "desc" },
      take: EXPENSES_PER_PAGE,
      skip: offset,
    });
    return expenses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expenses.");
  }
}

export async function fetchExpensesPages(query: string, id: string) {
  noStore();
  try {
    const totalExpenses = await db.expense.count({
      where: {
        userId: id,
        OR: [{ category: { name: { contains: query, mode: "insensitive" } } }],
      },
    });
    const pages = Math.ceil(totalExpenses / EXPENSES_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expenses.");
  }
}

export async function fetchTotalExpensesInBudgets(userId: string) {
  noStore();
  try {
    const expenses = await db.expense.findMany({
      where: { userId },
      include: { budget: true },
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => (expense.budget ? sum + expense.amount : sum),
      0
    );

    return totalExpenses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total expense.");
  }
}

export async function deleteBudget(id: string) {
  try {
    const budget = await db.budget.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/budgets");
    return { message: "Budget Deleted." };
  } catch (error) {
    throw new Error("Failed to delete Budget!");
  }
}

export async function deleteExpense(id: string) {
  try {
    const expense = await db.expense.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/expenses");
    return { message: "Expense Deleted." };
  } catch (error) {
    throw new Error("Failed to delete Expense!");
  }
}

/* ------- Fetch for Incomes --------- */
const INCOMES_PER_PAGE = 10;

export async function fetchIncomes() {
  noStore();
  try {
    const incomes = await db.income.findMany();
    return incomes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch incomes.");
  }
}

export async function fetchTotalIncomes(userId: string) {
  noStore();
  try {
    const incomes = await db.income.findMany({
      where: { userId },
    });

    const totalIncomes = incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    return totalIncomes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total income.");
  }
}

export async function fetchFilteredIncomes(
  userId: string,
  query: string,
  currentPage: number
) {
  try {
    noStore();
    const offset = (currentPage - 1) * INCOMES_PER_PAGE;

    const incomes = await db.income.findMany({
      where: {
        userId,
        OR: [{ source: { contains: query, mode: "insensitive" } }],
      },
      orderBy: { date: "desc" },
      take: INCOMES_PER_PAGE,
      skip: offset,
    });
    return incomes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch incomes.");
  }
}

export async function fetchIncomesPages(query: string, id: string) {
  noStore();
  try {
    const totalIncomes = await db.income.count({
      where: {
        userId: id,
        OR: [{ source: { contains: query, mode: "insensitive" } }],
      },
    });
    const pages = Math.ceil(totalIncomes / INCOMES_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch incomes.");
  }
}

export async function fetchIncomesByLastMonth(userId: string) {
  noStore();
  try {
    const incomes = await db.income.findMany({
      where: {
        userId,
        date: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
    });
    const totalIncomes = incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    return totalIncomes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch incomes.");
  }
}

export async function fetchTotalIncomesInSavings(userId: string) {
  noStore();
  try {
    const incomes = await db.income.findMany({
      where: { userId },
      include: { saving: true },
    });

    const totalIncomes = incomes.reduce(
      (sum, income) => (income.saving ? sum + income.amount : sum),
      0
    );

    return totalIncomes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total income.");
  }
}

export async function fetchSavingsByUserId(userId: string) {
  noStore();
  try {
    const savings = await db.saving.findMany({
      where: { userId },
    });
    return savings;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch savings.");
  }
}

export async function deleteIncome(id: string) {
  try {
    const income = await db.income.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/incomes");
    return { message: "Income Deleted." };
  } catch (error) {
    throw new Error("Failed to delete Income!");
  }
}

export async function fetchSavingsPages(query: string, id: string) {
  noStore();
  try {
    const totalSavings = await db.saving.count({
      where: {
        userId: id,
        OR: [{ name: { contains: query, mode: "insensitive" } }],
      },
    });
    const pages = Math.ceil(totalSavings / INCOMES_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch savings.");
  }
}


/* ------- Fetch for Savings ---------- */

export async function fetchLastSaving(userId: string) {
  noStore();
  try {
    const lastSaving = await db.saving.findFirst({
      where: { userId: userId },
      include: {
        incomes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });
    return lastSaving;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch savings.");
  }
}


export async function fetchSavingByUserId(userId: string) {
  noStore();
  try {
    const saving = await db.saving.findMany({
      where: { userId },
    });
    return saving;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch savings.");
  }
}

const SAVINGS_PER_PAGE = 10;

export async function fetchFilteredSavings(
  userId: string,
  query: string,
  currentPage: number
) {
  try {
    noStore();
    const offset = (currentPage - 1) * SAVINGS_PER_PAGE;

    const savings = await db.saving.findMany({
      where: {
        userId,
        OR: [{ name: { contains: query, mode: "insensitive" } }],
      },
      orderBy: { createdAt: "desc" },
      take: SAVINGS_PER_PAGE,
      skip: offset,
    });
    return savings;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch savings.");
  }
}

export async function fetchDeleteSaving(id: string) {
  try {
    const saving = await db.saving.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/savings");
    return { message: "Saving Deleted." };
  } catch (error) {
    throw new Error("Failed to delete Saving!");
  }
}

/* Last Transactions */

export async function fetchLastThreeTransactions(userId: string) {
  noStore();
  try {
    const expenses = await db.expense.findMany({
      where: { userId },
      include: { category: true },
      take: 3,
      orderBy: { date: "desc" },
    });

    const getExpenses = expenses.map((expense) => ({
      ...expense,
      type: "Expense",
      category: expense.category.name,
    }));

    const incomes = await db.income.findMany({
      where: { userId },
      take: 3,
      orderBy: { date: "desc" },
    });
    const getIncomes = incomes.map((income) => ({
      ...income,
      type: "Income",
      category: income.source,
    }));

    const transactions = [...getExpenses, ...getIncomes];
    transactions.sort((a, b) => b.date.getTime() - a.date.getTime());

    const lastThreeTransactions = transactions.slice(0, 3);

    return lastThreeTransactions;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions.");
  }
}
