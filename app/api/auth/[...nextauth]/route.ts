import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { AUTH_CONFIG } from "@/lib/auth"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        if (credentials.email === AUTH_CONFIG.username && 
            credentials.password === AUTH_CONFIG.password) {
          return {
            id: '1',
            email: AUTH_CONFIG.username,
            name: 'Admin'
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: 'your-secret-key', // In production, use a proper secret
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
