import { NextRequest, NextResponse } from "next/server";

// Definisikan tipe untuk middleware handler
type MiddlewareHandler = (
  request: NextRequest
) => NextResponse | Promise<NextResponse>;

// Fungsi withAuth yang akan menerima middleware utama Anda
const withAuth = (handler: MiddlewareHandler) => {
  return async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const jwtTokenLogin = request.cookies.get("jwtTokenLogin")?.value;
    const jwtTokenSetBranch = request.cookies.get("jwtTokenSetBranch")?.value;

    // const ROOT_PATH = "/";
    const LOGIN_PATH = "/auth/login";
    const SELECT_BRANCH_PATH = "/auth/select-branch";
    const DASHBOARD_PATH = "/";

    // 1. Tangani redirect dari root path '/' ke '/login'
    // if (pathname === ROOT_PATH) {
    //   const url = request.nextUrl.clone();
    //   url.pathname = LOGIN_PATH;
    //   return NextResponse.redirect(url);
    // }

    // 2. Jika sudah memiliki jwtTokenSetBranch (token utama setelah pilih cabang)
    if (jwtTokenSetBranch) {
      // Jika mencoba mengakses halaman login atau pilih cabang, redirect ke dashboard
      if (pathname === LOGIN_PATH || pathname === SELECT_BRANCH_PATH) {
        const url = request.nextUrl.clone();
        url.pathname = DASHBOARD_PATH;
        return NextResponse.redirect(url);
      }
      // Jika tidak, lanjutkan ke handler utama
      return handler(request);
    }
    // 3. Jika hanya memiliki jwtTokenLogin (token setelah login, sebelum pilih cabang)
    else if (jwtTokenLogin) {
      // Jika mencoba mengakses halaman login, redirect ke select-branch
      if (pathname === LOGIN_PATH) {
        const url = request.nextUrl.clone();
        url.pathname = SELECT_BRANCH_PATH;
        return NextResponse.redirect(url);
      }
      // Jika mencoba mengakses dashboard tapi hanya punya jwtTokenLogin, redirect ke select-branch
      if (pathname === DASHBOARD_PATH) {
        const url = request.nextUrl.clone();
        url.pathname = SELECT_BRANCH_PATH;
        return NextResponse.redirect(url);
      }
      // Jika di select-branch atau path lain yang perlu jwtTokenLogin, lanjutkan
      return handler(request);
    }
    // 4. Jika tidak memiliki token sama sekali
    else {
      // Jika mencoba mengakses halaman dashboard atau select-branch tanpa token, redirect ke login
      if (pathname === DASHBOARD_PATH || pathname === SELECT_BRANCH_PATH) {
        const url = request.nextUrl.clone();
        url.pathname = LOGIN_PATH;
        return NextResponse.redirect(url);
      }
      // Jika di halaman login, biarkan.
      // Jika di halaman lain yang tidak dilindungi dan tidak butuh auth, biarkan.
      return handler(request);
    }
  };
};

export default withAuth;