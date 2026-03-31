import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const allowedEmails = process.env.ADMIN_EMAILS?.split(",") ?? []
      if (allowedEmails.length === 0) return true
      return allowedEmails.includes(user.email ?? "")
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }