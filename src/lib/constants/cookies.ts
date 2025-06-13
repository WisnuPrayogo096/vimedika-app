export const COOKIE_CONFIG = {
  LOGIN_TOKEN: {
    name: "jwtTokenLogin",
    maxAge: 60 * 10, // 10 minutes
  },
  BRANCH_TOKEN: {
    name: "jwtTokenSetBranch",
    maxAge: 60 * 60 * 8, // 8 hours
  },
  common: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  },
} as const;
