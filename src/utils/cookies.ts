import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_CONFIG, ROUTES } from "@/lib/constants";

export async function getCookieStore() {
  return await cookies();
}

export function getTokenFromCookies(
  cookieStore: any,
  tokenName: string
): string | null {
  return cookieStore.get(tokenName)?.value || null;
}

export function setCookie(
  cookieStore: any,
  name: string,
  value: string,
  maxAge: number
) {
  cookieStore.set(name, value, {
    ...COOKIE_CONFIG.common,
    maxAge,
  });
}

export function deleteCookie(cookieStore: any, name: string) {
  cookieStore.delete(name);
}

export function handleAuthError(cookieStore: any, tokenName: string): never {
  deleteCookie(cookieStore, tokenName);
  redirect(ROUTES.LOGIN);
}

export async function requireAuth(
  tokenType: "login" | "branch" = "branch"
): Promise<string> {
  const cookieStore = await getCookieStore();
  const tokenName =
    tokenType === "login"
      ? COOKIE_CONFIG.LOGIN_TOKEN.name
      : COOKIE_CONFIG.BRANCH_TOKEN.name;

  const token = getTokenFromCookies(cookieStore, tokenName);

  if (!token) {
    redirect(ROUTES.LOGIN);
  }

  return token;
}
