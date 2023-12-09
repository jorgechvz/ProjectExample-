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
