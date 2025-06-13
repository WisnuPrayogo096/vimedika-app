"use server";

import api from "../api";
import { COOKIE_CONFIG, ROUTES } from "../constants";
import { ActionResult } from "@/types";
import {
  getCookieStore,
  getTokenFromCookies,
  handleAuthError,
  createErrorResponse,
  createSuccessResponse,
  getErrorMessage,
  isAuthError,
} from "@/utils";
import { redirect } from "next/navigation";

export async function getProfileAction(): Promise<ActionResult> {
  const cookieStore = await getCookieStore();
  const jwtToken = getTokenFromCookies(
    cookieStore,
    COOKIE_CONFIG.BRANCH_TOKEN.name
  );

  if (!jwtToken) {
    redirect(ROUTES.LOGIN);
  }

  try {
    const response = await api.get(ROUTES.API.PROFILE, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return createSuccessResponse("Profile fetched successfully", response.data);
  } catch (error: any) {
    console.error(
      "Error fetching profile:",
      error.response?.data || error.message
    );

    if (isAuthError(error)) {
      handleAuthError(cookieStore, COOKIE_CONFIG.BRANCH_TOKEN.name);
    }

    return createErrorResponse(getErrorMessage(error));
  }
}
