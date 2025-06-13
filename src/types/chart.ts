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

export interface WeeklyReport {
  omset: string;
  profit: string;
  total_hpp: string;
  profit_percentage: string;
  hpp_percentage: string;
}

export interface WeeklyProfitReportData {
  status: string;
  message: string;
  data: WeeklyReport[];
}

export interface WeeklyProfitReportResponse {
  data: ApiResponse<string>;
}
