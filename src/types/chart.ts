import { ApiResponse } from "./common";

export interface DailyReport {
  report_date: string;
  total_sales: number;
  profit_estimate: number;
}

export interface MonthlyProfitReportData {
  status: string;
  message: string;
  month_sales: number;
  month_profit: number;
  data: DailyReport[];
}

export type MonthlyProfitReportResponse = ApiResponse<MonthlyProfitReportData>;

export interface DailyProfit {
  report_date: string;
  total_sales: number;
  profit_estimate: number;
}

export interface DailyProfitReportData {
  status: string;
  message: string;
  data: DailyProfit[];
}

export interface DailyProfitReportResponse {
  data: ApiResponse<string>;
}
