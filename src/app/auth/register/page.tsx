import { RegisterForm } from "@/components/ui/auth/RegisterForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Account - Budget Buddy",
};
export default function Regiter() {
  return (
    <div className="max-w-7xl m-auto">
      <RegisterForm />
    </div>
  );
}
