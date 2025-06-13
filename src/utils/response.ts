import { ActionResult } from "../types";

export function createErrorResponse(message: string): ActionResult {
  return { success: false, message };
}

export function createSuccessResponse(
  message: string,
  data?: any
): ActionResult {
  return { success: true, message, data };
}

export function getErrorMessage(error: any): string {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "An unexpected error occurred"
  );
}

export function isAuthError(error: any): boolean {
  return error.response?.status === 401 || error.response?.status === 403;
}
