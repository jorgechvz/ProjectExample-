"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import db from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

/* Actions for Users */

/* User Schema */

const userSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "Please enter your name",
  }),
  email: z
    .string({
      required_error: "Please enter your email",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z
    .string({
      required_error: "Please enter your password",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    }),
  passwordAgain: z
    .string({
      required_error: "Please enter your password again",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    }),
});

const validateUserSchema = userSchema.omit({ id: true });

export type UserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  success?: boolean;
};

/* Create User */

export async function CreateUser(prevState: UserState, formData: FormData) {
  // Validate form data
  console.log(formData.get("name"));
  const validatedFields = validateUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordAgain: formData.get("passwordAgain"),
  });

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Please fill out all fields.",
    };
  }

  // If validation succeeds, create user
  const { name, email, password, passwordAgain } = validatedFields.data;

  // If passwords don't match, return error
  if (password !== passwordAgain) {
    return {
      errors: {
        password: ["Passwords do not match"],
        passwordAgain: ["Passwords do not match"],
      },
      message: "Passwords do not match. Please try again.",
    };
  }

  // If email already exists, return error
  const emailExists = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (emailExists) {
    return {
      errors: {
        email: ["Email already exists"],
      },
      message: "Email already exists. Please try again.",
    };
  }

  // Hash password and create user and return success

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    await db.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create User.",
    };
  }
  redirect("/auth/login");
}
/* Actions for Auth */

/* Credentials Auth */

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

/* Google Auth */

export async function authenticateWithGoogle() {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "OAuthSignInError":
          return "Unable to sign in with Google.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

/* Update Personal Info */

/* Update User Schema */
const FormAccountSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const UpdateNameUserSchema = FormAccountSchema.omit({
  id: true,
  email: true,
  password: true,
  newPassword: true,
});

const UpdatePasswordUserSchema = FormAccountSchema.omit({
  id: true,
  name: true,
  email: true,
});

const UpdateEmailUserSchema = FormAccountSchema.omit({
  id: true,
  name: true,
  password: true,
  newPassword: true,
});

export async function UpdateUserPersonalInformation(
  id: string,
  formData: FormData
) {
  const { name } = UpdateNameUserSchema.parse({
    name: formData.get("name"),
  });

  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update User.",
    };
  }

  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile");
}

export async function UpdateUserPassword(id: string, formData: FormData) {
  const { password } = UpdatePasswordUserSchema.parse({
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
  });

  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return {
      message: "User not found.",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      message: "Current password is incorrect.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        password: passwordHash,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update User.",
    };
  }
  return{
    message: "Password Updated"
  }
}

export async function UpdateUserEmail(id: string, formData: FormData) {
  const { email } = UpdateEmailUserSchema.parse({
    email: formData.get("email"),
  });

  const validEmail = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (validEmail) {
    return {
      message: "Email already in use.",
    };
  }

  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        email: email,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update User.",
    };
  }

  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile");
}

/* Incomes */

/* Income Schema */

const incomeSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "Please enter a name",
  }),
  amount: z.string({
    required_error: "Please enter an amount",
  }),
  date: z.string({
    required_error: "Please enter a date",
  }),
  userId: z.string(),
  savingId: z.string().optional().nullable(),
});

const validateIncomeSchema = incomeSchema.omit({ id: true });

export type IncomeState =
  | {
      errors?: {
        name?: string[];
        amount?: string[];
        date?: string[];
        userId?: string[];
      };
      message?: string | null;
    }
  | undefined;

/* Create Income */

export async function CreateIncome(prevState: IncomeState, formData: FormData) {
  // Validate form data
  const validatedFields = validateIncomeSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    userId: formData.get("userId"),
    savingId: formData.get("savingId"),
  });

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Please fill out all fields.",
    };
  }

  // If validation succeeds, create income
  const { name, amount, date, userId, savingId } = validatedFields.data;

  const convertedAmount = parseFloat(amount);
  const convertDate = new Date(date);
  try {
    await db.income.create({
      data: {
        source: name,
        amount: convertedAmount,
        date: convertDate,
        userId: userId,
        savingId: savingId,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Income.",
    };
  }
  revalidatePath("/dashboard/incomes");
  redirect("/dashboard/incomes");
}

/* Expenses */

/* Expense Schema */

const expenseSchema = z.object({
  id: z.string(),
  amount: z.string({
    required_error: "Please enter an amount",
  }),
  date: z.string({
    required_error: "Please enter a date",
  }),
  userId: z.string(),
  categoryId: z.string(),
  budgetId: z.string().optional().nullable(),
});

const validateExpenseSchema = expenseSchema.omit({ id: true });

export type ExpenseState =
  | {
      errors?: {
        amount?: string[];
        date?: string[];
        userId?: string[];
        categoryId?: string[];
      };
      message?: string | null;
    }
  | undefined;

/* Create Expense */

export async function CreateExpense(
  prevState: ExpenseState,
  formData: FormData
) {
  // Validate form data
  const validatedFields = validateExpenseSchema.safeParse({
    amount: formData.get("amount"),
    date: formData.get("date"),
    userId: formData.get("userId"),
    categoryId: formData.get("categoryId"),
  });

  console.log(formData.get("budgetId"));
  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Please fill out all fields.",
    };
  }

  // If validation succeeds, create expense
  const { amount, date, userId, categoryId } = validatedFields.data;

  const budgetId = formData.get("budgetId") as string;

  const convertedAmount = parseFloat(amount);
  const convertDate = new Date(date);
  try {
    await db.expense.create({
      data: {
        amount: convertedAmount,
        date: convertDate,
        userId: userId,
        categoryId: categoryId,
        budgetId: budgetId,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Expense.",
    };
  }
  revalidatePath("/dashboard/expenses");
  redirect("/dashboard/expenses");
}

/* Budgets */

/* Budget Schema */

const budgetSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "Please enter a name",
  }),
  amount: z.string({
    required_error: "Please enter an amount",
  }),
  categoryId: z.string({
    required_error: "Please select a category",
  }),
  userId: z.string(),
});

const validateBudgetSchema = budgetSchema.omit({ id: true });

export type BudgetState =
  | {
      errors?: {
        name?: string[];
        amount?: string[];
        categoryId?: string[];
        userId?: string[];
      };
      message?: string | null;
    }
  | undefined;

/* Create Budget */

export default async function CreateBudget(
  prevState: BudgetState,
  formData: FormData
) {
  const validatedFields = validateBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    categoryId: formData.get("categoryId"),
    userId: formData.get("userId"),
  });

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Please fill out all fields.",
    };
  }

  // If validation succeeds, create budget

  const { name, amount, categoryId, userId } = validatedFields.data;

  const convertedAmount = parseFloat(amount);

  try {
    await db.budget.create({
      data: {
        name: name,
        amount: convertedAmount,
        categoryId: categoryId,
        userId: userId,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Expense.",
    };
  }
  revalidatePath("/dashboard/budgets");
  redirect("/dashboard/budgets");
}

/* Edit Budget */

const editBudgetSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "Please enter a name",
  }),
  amount: z.string({
    required_error: "Please enter an amount",
  }),
  categoryId: z.string({
    required_error: "Please select a category",
  }),
  userId: z.string(),
});

/* Edit Budget */

export async function EditBudget(id: string, formData: FormData) {
  const { name, amount, categoryId, userId } = editBudgetSchema.parse({
    name: formData.get("name"),
    amount: formData.get("amount"),
    categoryId: formData.get("categoryId"),
    userId: formData.get("userId"),
  });

  const convertedAmount = parseFloat(amount);

  try {
    await db.budget.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        amount: convertedAmount,
        categoryId: categoryId,
        userId: userId,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Uodate Budget.",
    };
  }
  revalidatePath("/dashboard/budgets");
  redirect("/dashboard/budgets");
}

/* Savings */

/* Saving Schema */

const savingSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "Please enter a name",
  }),
  description: z.string().optional(),
  goal: z.string({
    required_error: "Please enter a goal",
  }),
  startDate: z.string({
    required_error: "Please enter a start date",
  }),
  endDate: z.string({
    required_error: "Please enter an end date",
  }),
  userId: z.string(),
});

const validateSavingSchema = savingSchema.omit({ id: true });

export type SavingState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        goal?: string[];
        startDate?: string[];
        endDate?: string[];
        userId?: string[];
      };
      message?: string | null;
    }
  | undefined;

/* Create Saving */

export async function CreateSaving(
  prevState: SavingState,
  formData: FormData
) {

  console.log(formData)
  const validatedFields = validateSavingSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    goal: formData.get("goal"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    userId: formData.get("userId"),
  });
  console.log(validatedFields)
  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Please fill out all fields.",
    };
  }

  // If validation succeeds, create saving

  const { name, description, goal, startDate, endDate, userId } =
    validatedFields.data;

  const convertedGoal = parseFloat(goal);
  const convertStartDate = new Date(startDate);
  const convertEndDate = new Date(endDate);

  try {
    await db.saving.create({
      data: {
        name: name,
        description: description,
        goal: convertedGoal,
        startDate: convertStartDate,
        endDate: convertEndDate,
        userId: userId,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Saving.",
    };
  }
  revalidatePath("/dashboard/savings");
  redirect("/dashboard/savings");
}