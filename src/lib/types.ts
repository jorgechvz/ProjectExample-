import { Role } from "@prisma/client";

// Landing Page Testimonials
export interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}
/* --------------- Types for Users -------------- */
export type User = {
  id: string;
  email: string;
  password: string;
  role: Role;
};

export type UserPersonalInfo = {
  id: string;
  name: string;
};

export type UserEmailInfo = {
  id: string;
  email: string;
};

export type UserPasswordInfo = {
  id: string;
  password: string;
  newPassword: string;
};

/* ---------------- Types for Budget ------------------ */

export type Budget = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  amount: number;
  categoryId: string;
  userId: string;
  expenses: {
    id: string;
    createdAt: Date;
    amount: number;
    date: Date;
    categoryId: string;
    userId: string;
    budgetId: string | null;
  }[];
  category: {
    id: string;
    name: string;
    icon: string | null;
    userId: string | null;
};
};

export type ExpenseBudget = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  amount: number;
  categoryId: string;
  userId: string;
};

/* ---------------- Types for Expense ---------------- */

export type Expense = {
  id: string;
  name: string;
  amount: number;
  budgetId: string;
};

/* ---------------- Types for Income ---------------- */

export type Income = {
  id: string;
  name: string;
  amount: number;
  budgetId: string;
};

/* ---------------- Types for Savings ---------------- */

export type Savings = {
  id: string;
  name: string;
  amount: number;
  budgetId: string;
};

export type IncomeSaving = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  goal: number;
  startDate: Date;
  endDate: Date;
  userId: string;
};

/* ---------------- Types for Goals ----------------- */

export type Goal = {
  id: string;
  name: string;
  amount: number;
  userId: string;
};

/* ----------------- Types for Categories ------------- */

export type Category = {
  id: string;
  name: string;
  icon: string | null;
  userId: string | null;
};
