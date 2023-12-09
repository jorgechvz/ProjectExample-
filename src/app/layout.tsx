import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/ui/layout/Navbar";
import NextAuthProvider from "./context/NextAuthProvider";
import Footer from "@/components/ui/layout/Footer";

export const metadata: Metadata = {
  title: "Budget Buddy",
  description: "Author by Jorge A Chavez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="hide-scrollbar">
        <NextAuthProvider>
          <Providers>
            <header>
              <Navbar />
            </header>
            <main className="pt-[60px]">{children}</main>
            <footer>
              <Footer />
            </footer>
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
