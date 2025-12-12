import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // For now, we will only use the Google provider.
  // In the next phase, we will add the Drizzle adapter here.
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // We can add custom pages here later if we want.
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', 
  //   verifyRequest: '/auth/verify-request', 
  //   newUser: '/auth/new-user'
  // }
};
