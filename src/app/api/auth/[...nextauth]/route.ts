import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Import the auth options from a separate file
import { NextApiHandler } from "next";

export const handler = NextAuth(authOptions) as NextApiHandler;

export { handler as GET, handler as POST };
