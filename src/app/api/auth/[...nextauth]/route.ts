import NextAuth from 'next-auth';
import { NextApiHandler } from 'next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvide from 'next-auth/providers/google'
import FacebookProvide from 'next-auth/providers/facebook';
import prisma from '../../../../../lib/prisma';

export const authOptions = {
  providers: [
    GoogleProvide({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvide({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = user.id;
      
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };