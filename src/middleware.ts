import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// export { auth as middleware } from "@/auth";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/" ||
    path === "/signin" ||
    path === "/signup" ||
    path === "/authprovider";

  const isAuthPath = path === "/signin" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";
  const authJsToken = request.cookies.get("authjs.session-token")?.value || "";

  const isLoggedIn = token || authJsToken;

  if (isAuthPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signin", "/signup", "/profile"],
};
