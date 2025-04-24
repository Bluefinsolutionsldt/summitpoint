import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define the User type
type User = {
  id: string;
  name: string;
  email: string;
};

// Create the auth config
const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" }
      },
      async authorize(credentials, req): Promise<User | null> {
        // Simple credential validation
        if (!credentials?.name || !credentials?.email) {
          return null;
        }
        
        // Return a mock user
        return {
          id: "1",
          name: credentials.name as string,
          email: credentials.email as string
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt" as const
  },
  // Add the required secret
  secret: process.env.NEXTAUTH_SECRET || "9e6ec95787d88faf34da55b2e27ca5ed0e5b9c2be11a0a9d17e95ed60ca43e25"
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions); 