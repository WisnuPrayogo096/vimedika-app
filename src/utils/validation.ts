export function validateString(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required and must be a non-empty string`);
  }
  return value.trim();
}

export function validateLoginCredentials(formData: FormData): {
  username: string;
  password: string;
} {
  const username = validateString(formData.get("username"), "Username");
  const password = validateString(formData.get("password"), "Password");

  return { username, password };
}

export function validateBranchId(formData: FormData): string {
  return validateString(formData.get("branch_id"), "Branch ID");
}

export function isValidToken(token: unknown): token is string {
  return typeof token === "string" && token.length > 0;
}
