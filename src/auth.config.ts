import type { NextAuthConfig } from "next-auth";
import { fetchUserByEmail } from "./lib/data";
import db from "./lib/db";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add property to token
      if (user) {
        const dbUser = await fetchUserByEmail(user.email as string);
        token.id = dbUser?.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add property to session object
      if (token?.id) {
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // Fetch the user from your database
        const existingUser = await fetchUserByEmail(user.email as string);
        // If no user exists, create one
        if (!existingUser) {
          await db.user.create({
            data: {
              name: profile?.name,
              image: profile?.picture,
              email: profile?.email as string,
              password: "",
              accounts: {
                create: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  type: account.type,
                },
              },
            },
          });
        }
      }
      return true;
    },
    async authorized({ auth, request: { nextUrl } }) {
      // Middleware that runs whenever someone tries to access a page
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const publicPages = ["/", "/about"];
      if (publicPages.includes(nextUrl.pathname)) {
        return true; // Allow access to public pages
      } else if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
