/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
/* eslint-enable @typescript-eslint/no-unused-vars */

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string; // Add id to user session
      name?: string | null;
      image?: string | null;
    },
    lastActive?:number;
  }

  interface User {
    email: string;
    id: string; // Add id to user object
    name?: string | null;
    image?: string | null;
  }

  interface JWT{
    lastAcive?: number;
  }
}
