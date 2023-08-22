import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin";
      }
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

// export function middleware(request: NextRequest) {
//     if (request.nextUrl.pathname === "/") {
//         return NextResponse.redirect(new URL('/dashboard', request.url))
//     }
//     return NextResponse.next();
// }
export const config = {
  matcher: ["/((?!register|login).*)"],
};
