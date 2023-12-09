"use client";

import { CreateUser } from "@/lib/actions";
import {
  ArrowRightIcon,
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { Button } from "../commons/Button";

export function RegisterForm() {
  // Form Status
  const initialState = { message: "", errors: {} };
  const [state, formRegister] = useFormState(CreateUser, initialState);

  // Show/Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Validate Passwords for client-side feedback
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordAgainChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordAgain(event.target.value);
  };

  const passwordsMatch = password === passwordAgain && password.length >= 8;

  // End Validate Passwords for client-side feedback

  return (
    <div className="my-20 px-2 lg:flex items-center justify-center max-w-7xl">
      <div className="flex-1">
        <h1 className="text-3xl text-blue-charcoal-950">
          Create Your BudgetBuddy Account
        </h1>
        <Image
          src="/register-image.png"
          width={500}
          height={500}
          alt="login"
          className="mx-auto hidden lg:block"
        />
      </div>
      <div className="flex-1 max-w-xl mx-auto py-4 rounded-xl shadow-persian-green-950 shadow-2xl">
        {state.message &&(
          <div
            className="flex mt-5 h-8 items-center justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-bright-red-800" />
            <div className="text-md text-bright-red-800">{state.message}</div>
          </div>
        )}
        <form action={formRegister} className="mx-auto px-7">
          <div>
            <label
              className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"
              htmlFor="name"
            >
              Name
            </label>
            <div>
              <input
                className="block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-4 text-sm outline-2 placeholder:text-blue-charcoal-950"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
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
          <div>
            <div className="flex items-center">
              <label
                className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"
                htmlFor="password"
              >
                Password
              </label>
              {passwordsMatch && (
                <div className="ml-3 mb-3 mt-5 flex text-bright-red-700">
                  <FaCheck />
                </div>
              )}
            </div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-charcoal-950"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                required
                minLength={8}
                value={password}
                onChange={handlePasswordChange}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-charcoal-950" />
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xl"
                type="button"
                onClick={toggleShowPassword}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <label
                className="mb-3 mt-5 block text-md font-medium text-blue-charcoal-950"
                htmlFor="passwordAgain"
              >
                Re-type password
              </label>
              {passwordsMatch && (
                <div className="ml-3 mb-3 mt-5 flex text-bright-red-700">
                  <FaCheck />
                </div>
              )}
            </div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-blue-charcoal-950 py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-charcoal-950"
                id="passwordAgain"
                type={showPassword ? "text" : "password"}
                name="passwordAgain"
                placeholder="Re-type your password"
                required
                minLength={8}
                value={passwordAgain}
                onChange={handlePasswordAgainChange}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-charcoal-950" />
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xl"
                type="button"
                onClick={toggleShowPassword}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>
          <div className="lg:w-[70%] w-1/2 mx-auto mt-10 bg-persian-green-950 text-persian-green-50 rounded-lg">
            <RegisterButton />
          </div>
        </form>
      </div>
    </div>
  );
}
function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="mt-4 w-full flex justify-center"
      aria-disabled={pending}
    >
      Create Account{" "}
      <ArrowRightIcon className="ml-1 h-5 w-5 text-persian-green-50" />
    </Button>
  );
}
