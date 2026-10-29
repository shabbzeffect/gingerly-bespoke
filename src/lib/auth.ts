import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export type ExtendedUser = DefaultSession["user"] & {
  role: string;
  id: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
  interface JWT {
    role: string;
    id: number;
  }
}

const DEMO_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gingerly.local";
const DEMO_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;

        // Demo credentials (dev only, no DATABASE_URL). With a real database,
        // look the user up via serverDb() in a server-side auth flow instead.
        if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
          return { id: "1", name: "Atelier Admin", email: DEMO_ADMIN_EMAIL, role: "admin" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/sign-in" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as unknown as ExtendedUser).role;
        token.id = (user as unknown as ExtendedUser).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-change-me",
};
