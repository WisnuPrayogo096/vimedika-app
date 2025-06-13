// middleware.ts
import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth"; // Path ke file withAuth

export function mainMiddleware() {
  // Middleware utama Anda. Anda bisa menambahkan logika global di sini
  // sebelum withAuth dieksekusi, jika diperlukan.
  // Dalam kasus ini, withAuth akan menangani sebagian besar logika rute.
  return NextResponse.next();
}

export default withAuth(mainMiddleware);

// Konfigurasi matcher untuk middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any other static assets in /public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};