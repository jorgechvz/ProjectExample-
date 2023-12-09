"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../commons/Button";
import { authenticate, authenticateWithGoogle } from "@/lib/actions";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginForm() {
  const [errorMessageCredentials, credentialsForm] = useFormState(
    authenticate,
    undefined
  );
  const [errorMessageGoogle, googleForm] = useFormState(
    authenticateWithGoogle,
    undefined
  );

  // Show/Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-28 px-2">
      <div className="max-w-xl mx-auto py-12 lg:my-28 rounded-xl shadow-persian-green-950 shadow-2xl">
        <h1 className="text-3xl text-center text-blue-charcoal-950">
          Sign in to your account
        </h1>
        <div
          className="flex mt-5 h-8 items-center justify-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessageCredentials ||
            (errorMessageGoogle && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-bright-red-800" />
                <p className="text-md text-bright-red-800">
                  {errorMessageCredentials || errorMessageGoogle}
                </p>
              </>
            ))}
        </div>
        <form action={credentialsForm} className="mx-auto">
          <div className="px-6 pb-4">
            <div className="lg:w-[70%] mx-auto">
              <div>
                <label
                  className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-charcoal-950"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-charcoal-950 peer-focus:text-blue-charcoal-950" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-md font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-charcoal-950"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-charcoal-950" />
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xl"
                    type="button"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:w-[70%] w-1/2 mx-auto mt-10 bg-persian-green-950 text-persian-green-50 rounded-lg">
              <LoginButton />
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center text-center">
          <hr className="w-[100px] border-gray-300" />
          <p className="mx-2">Or continue with</p>
          <hr className="w-[100px]  border-gray-300" />
        </div>
        <form action={googleForm} className="px-6">
          <div className="mx-auto lg:w-[70%] w-1/2 mt-5 bg-persian-green-950 text-persian-green-50 rounded-lg">
            <GoogleButton />
          </div>
        </form>
        <p className="mt-7 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/auth/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="mt-4 w-full flex justify-center"
      aria-disabled={pending}
    >
      Sign in <ArrowRightIcon className="ml-1 h-5 w-5 text-persian-green-50" />
    </Button>
  );
}
function GoogleButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full text-lg flex justify-center"
      aria-disabled={pending}
    >
      <FcGoogle className="mr-3 h-5 w-5" />
      Google
    </Button>
  );
}
