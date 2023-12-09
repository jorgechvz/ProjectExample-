import { auth } from "@/auth";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About - Budget Buddy",
};
export default async function About() {
  const session = await auth();
  const nameUser = session?.user?.name;
  return (
    <div>
      <h1>About</h1>
      <h2>{nameUser}</h2>
    </div>
  );
}
