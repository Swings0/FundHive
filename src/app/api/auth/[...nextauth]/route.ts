import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("Missing credentials");
          }
          const { email, password } = credentials as { email: string; password: string };
          console.log("Attempting login with email", email);

          // Connect to database
          await dbConnect();

          // Find user by email
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Invalid credentials");
          }

          // Compare password
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Invalid credentials");
          }

          // Return user object with id if validation passes
          return { email: user.email, id: user._id.toString() }; // Convert ObjectId to string
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message);
            throw new Error("Invalid credentials");
          }
          throw new Error("An unexpected error occurred");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt", // Store session as JWT
  },

  callbacks: {
    async jwt({ token, user }) {
      // Store user data in JWT token when user logs in
      if (user) {
        console.log("JWT Callback: User", user);
        token.email = user.email;
        token.id = user.id; // Store the user ID in JWT token
        token.lastActive = Date.now(); // Add lastActive timestamp
      }
      return token;
    },
  
    async session({ session, token }) {
      // Attach user data from token to session
      if (token) {
        console.log("Session Callback: Token", token);
        
        // Ensure token.lastActive is treated as a number
        const lastActive = typeof token.lastActive === 'number' ? token.lastActive : undefined;
  
        session.user = {
          email: token.email as string,
          id: token.id as string, // Add the user id to the session
        };
        session.lastActive = lastActive; // Add lastActive timestamp to session
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    error: "/login", // Customize error page
    signIn: "/dashboard", // Customize sign-in page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


