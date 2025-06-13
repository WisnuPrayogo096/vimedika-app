"use server";

import api from "../api";
import { COOKIE_CONFIG, ROUTES } from "../constants";
import { LoginResponse, ActionResult, FormActionState } from "@/types";
import {
  getCookieStore,
  setCookie,
  deleteCookie,
  getTokenFromCookies,
  createErrorResponse,
  createSuccessResponse,
  getErrorMessage,
  validateLoginCredentials,
  isValidToken,
} from "@/utils";
import { redirect } from "next/navigation";

export async function loginAction(
  _state: FormActionState,
  formData: FormData
): Promise<ActionResult> {
  try {
    const { username, password } = validateLoginCredentials(formData);

    const response = await api.post<LoginResponse>(ROUTES.API.LOGIN, {
      username,
      password,
    });

    const jwtToken = response.data?.data;

    if (!isValidToken(jwtToken)) {
      return createErrorResponse("Invalid token received from server.");
    }

    const cookieStore = await getCookieStore();
    setCookie(
      cookieStore,
      COOKIE_CONFIG.LOGIN_TOKEN.name,
      jwtToken,
      COOKIE_CONFIG.LOGIN_TOKEN.maxAge
    );

    return createSuccessResponse(response.data?.message || "Login successful");
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    return createErrorResponse(getErrorMessage(error));
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await getCookieStore();
  const jwtToken = getTokenFromCookies(
    cookieStore,
    COOKIE_CONFIG.BRANCH_TOKEN.name
  );

  if (jwtToken) {
    try {
      await api.post(
        ROUTES.API.LOGOUT,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    } catch (error: any) {
      // Log error but don't throw - we still want to clear cookies
      console.error(
        "Backend logout error:",
        error.response?.data || error.message
      );
    }
  }

  // Always clear cookies regardless of backend call success
  deleteCookie(cookieStore, COOKIE_CONFIG.BRANCH_TOKEN.name);
  deleteCookie(cookieStore, COOKIE_CONFIG.LOGIN_TOKEN.name);

  redirect(ROUTES.LOGIN);
}
