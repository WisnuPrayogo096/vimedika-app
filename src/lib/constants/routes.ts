export const ROUTES = {
  LOGIN: "/auth/login",
  BRANCHES: "/auth/select-branch",
  DASHBOARD: "/",

  API: {
    LOGIN: "/login",
    LOGOUT: "/logout",
    PROFILE: "/profile",
    LIST_BRANCHES: "/list_branches",
    SET_BRANCH: "/set_branch",
    CHART_MONTHLY_REPORT: "/api/dashboard/monthly_profit_report",
    CHART_WEEKLY_REPORT: "/api/dashboard/weekly_profit_report",
  },
} as const;
