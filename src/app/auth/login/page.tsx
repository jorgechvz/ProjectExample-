import LoginForm from "@/components/ui/auth/LoginForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In - Budget Buddy",
};
export default function Login() {
  return (
    <LoginForm />
  )
}
