import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

// Define user role enum (match with your existing enum)
export enum UserRole {
  ADMIN = "ADMIN",
  COACH = "COACH",
  STUDENT = "STUDENT",
  SALES_REP = "SALES_REP",
  AGENT = "AGENT",
}

// Define role-based route patterns
const ROLE_ROUTES: Record<UserRole, RegExp> = {
  [UserRole.ADMIN]: /^\/\(routes\)\/(admin)\//,
  [UserRole.COACH]: /^\/\(routes\)\/(coach)\//,
  [UserRole.STUDENT]: /^\/\(routes\)\/(student)\//,
  [UserRole.SALES_REP]: /^\/\(routes\)\/(sales_rep)\//,
  [UserRole.AGENT]: /^\/\(routes\)\/(agent)\//,
};

// Interface for decoded token
interface DecodedToken {
  id: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Utility function to validate and decode token
async function validateToken(token: string): Promise<DecodedToken | null> {
  try {
    // Replace with your actual JWT secret
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT Secret is not defined");
    }

    // Verify the token
    const decoded = verify(token, JWT_SECRET) as DecodedToken;

    // Additional validation (optional)
    if (!decoded.role || !Object.values(UserRole).includes(decoded.role)) {
      return null;
    }

    // Fetch user details from database to ensure active user
    const user = await fetchUserById(decoded.id);

    if (!user) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Token validation error:", error);
    return null;
  }
}

// Utility function to fetch user details (replace with your actual database logic)
async function fetchUserById(userId: string) {
  try {
    // Example: Replace with your actual database call
    const response = await fetch(`${process.env.API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers like authorization
        Authorization: `Bearer ${process.env.INTERNAL_API_TOKEN}`,
      },
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("User fetch error:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Extract token from cookies
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/login",
    "/forget-password",
    "/resetpassword",
    "/unauthorized",
  ];

  // Skip authentication for public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validate token
  const decodedUser = await validateToken(token);

  // If token is invalid, redirect to login
  if (!decodedUser) {
    // Clear invalid token
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  // Check if the current route matches the user's role
  const roleRoutePattern = ROLE_ROUTES[decodedUser.role];

  // If route doesn't match user's role, redirect to role-specific dashboard
  if (roleRoutePattern && !roleRoutePattern.test(pathname)) {
    const dashboardPath = `/\(${decodedUser.role.toLowerCase()}\)/dashboard`;
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
