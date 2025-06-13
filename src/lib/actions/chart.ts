"use server";

import { ActionResult } from "@/types";
import {
  DailyProfitReportResponse,
  MonthlyProfitReportResponse,
} from "@/types/chart";
import {
  createErrorResponse,
  createSuccessResponse,
  getCookieStore,
  getErrorMessage,
  getTokenFromCookies,
  handleAuthError,
  isAuthError,
} from "@/utils";
import { COOKIE_CONFIG, ROUTES } from "../constants";
import api from "../api";

// Define a type for the endpoint configuration
type ChartEndpointConfig<T> = {
  route: string;
  successMessage: string;
};

// Generic function to fetch chart data
async function fetchChartData<T>(
  config: ChartEndpointConfig<T>
): Promise<ActionResult<T>> {
  const cookieStore = await getCookieStore();
  const jwtToken = getTokenFromCookies(
    cookieStore,
    COOKIE_CONFIG.BRANCH_TOKEN.name
  );

  try {
    const response = await api.get(config.route, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return createSuccessResponse(config.successMessage, response.data);
  } catch (error: any) {
    console.error(
      `Error fetching ${config.successMessage.toLowerCase()}:`,
      error.response?.data || error.message
    );

    if (isAuthError(error)) {
      handleAuthError(cookieStore, COOKIE_CONFIG.BRANCH_TOKEN.name);
    }

    return createErrorResponse(getErrorMessage(error));
  }
}

// Specific functions for each endpoint
export async function getMonthlyProfitReport(): Promise<
  ActionResult<MonthlyProfitReportResponse>
> {
  return fetchChartData<MonthlyProfitReportResponse>({
    route: ROUTES.API.CHART_MONTHLY_REPORT,
    successMessage: "Monthly Profit successfully",
  });
}

export async function getDailyProfitReport(): Promise<
  ActionResult<DailyProfitReportResponse>
> {
  return fetchChartData<DailyProfitReportResponse>({
    route: ROUTES.API.DAILY_PROFIT_REPORT,
    successMessage: "Daily Profit successfully",
  });
}

// Add the other 5 endpoints similarly
// export async function getWeeklyProfitReport(): Promise<
//   ActionResult<WeeklyProfitReportResponse>
// > {
//   return fetchChartData<WeeklyProfitReportResponse>({
//     route: ROUTES.API.CHART_WEEKLY_REPORT,
//     successMessage: "Weekly Profit successfully",
//   });
// }


