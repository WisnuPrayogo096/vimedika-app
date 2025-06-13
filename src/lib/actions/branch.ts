"use server";

import api from "../api";
import { COOKIE_CONFIG, ROUTES } from "../constants";
import { BranchListResponse, BranchResponse, ActionResult } from "@/types";
import {
  getCookieStore,
  getTokenFromCookies,
  setCookie,
  deleteCookie,
  handleAuthError,
  createErrorResponse,
  createSuccessResponse,
  getErrorMessage,
  isAuthError,
  validateBranchId,
  isValidToken,
} from "@/utils";
import { redirect } from "next/navigation";

export async function getBranchesAction(): Promise<ActionResult> {
  const cookieStore = await getCookieStore();
  const jwtToken = getTokenFromCookies(
    cookieStore,
    COOKIE_CONFIG.LOGIN_TOKEN.name
  );

  if (!jwtToken) {
    redirect(ROUTES.LOGIN);
  }

  try {
    const response = await api.get<BranchListResponse>(
      ROUTES.API.LIST_BRANCHES,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    return createSuccessResponse(
      "Branches fetched successfully",
      response.data
    );
  } catch (error: any) {
    console.error(
      "Error fetching branches:",
      error.response?.data || error.message
    );

    if (isAuthError(error)) {
      handleAuthError(cookieStore, COOKIE_CONFIG.LOGIN_TOKEN.name);
    }

    return createErrorResponse(getErrorMessage(error));
  }
}

export async function setBranchAction(
  formData: FormData
): Promise<ActionResult> {
  const cookieStore = await getCookieStore();
  const jwtToken = getTokenFromCookies(
    cookieStore,
    COOKIE_CONFIG.LOGIN_TOKEN.name
  );

  if (!jwtToken) {
    return createErrorResponse("Authentication required.");
  }

  try {
    const branchId = validateBranchId(formData);

    const response = await api.post<BranchResponse>(
      ROUTES.API.SET_BRANCH,
      { branch_id: branchId },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    const branchToken = response.data?.data;

    if (!isValidToken(branchToken)) {
      return createErrorResponse("Invalid branch token received from server.");
    }

    // Replace login token with branch token
    deleteCookie(cookieStore, COOKIE_CONFIG.LOGIN_TOKEN.name);
    setCookie(
      cookieStore,
      COOKIE_CONFIG.BRANCH_TOKEN.name,
      branchToken,
      COOKIE_CONFIG.BRANCH_TOKEN.maxAge
    );

    return createSuccessResponse("Branch set successfully");
  } catch (error: any) {
    console.error(
      "Error setting branch:",
      error.response?.data || error.message
    );

    if (isAuthError(error)) {
      handleAuthError(cookieStore, COOKIE_CONFIG.LOGIN_TOKEN.name);
    }

    return createErrorResponse(getErrorMessage(error));
  }
}
