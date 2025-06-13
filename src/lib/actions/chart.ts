"use server";

import { ActionResult } from "@/types";
import {
  WeeklyProfitReportResponse,
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

type ChartEndpointConfig<T> = {
  route: string;
  successMessage: string;
};

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

export async function getMonthlyProfitReport(): Promise<
  ActionResult<MonthlyProfitReportResponse>
> {
  return fetchChartData<MonthlyProfitReportResponse>({
    route: ROUTES.API.CHART_MONTHLY_REPORT,
    successMessage: "Monthly Profit successfully",
  });
}

export async function getWeeklyProfitReport(): Promise<
  ActionResult<WeeklyProfitReportResponse>
> {
  return fetchChartData<WeeklyProfitReportResponse>({
    route: ROUTES.API.CHART_WEEKLY_REPORT,
    successMessage: "Weekly Profit successfully",
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


