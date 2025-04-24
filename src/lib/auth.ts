import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google, Twitter],
});
