import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Import the auth options from a separate file


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
