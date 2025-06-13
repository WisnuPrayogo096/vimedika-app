import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardCharts from "./dashboard-charts";
import {
  getWeeklyProfitReport,
  getMonthlyProfitReport,
} from "@/lib/actions/chart";
import { DailyReport, WeeklyReport } from "@/types/chart";

export default async function DashboardPage() {
  const cookieDashboard = await cookies();
  const jwtTokenSetBranch = cookieDashboard.get("jwtTokenSetBranch")?.value;

  if (!jwtTokenSetBranch) {
    redirect("/auth/login");
  }

  const chart1 = await getMonthlyProfitReport();
  const chart2 = await getWeeklyProfitReport();

  // console.log("Full API Response:", JSON.stringify(chart1, null, 2));
  // console.log("Response data:", chart1.data);
  // console.log("Response data.data:", chart1.data?.data);

  const chartMonthlyProfitReport = (chart1.data?.data ?? []) as DailyReport[];
  const chartWeeklyProfitReport = (chart2.data?.data ?? []) as WeeklyReport[];

  return (
    <DashboardCharts
      chartMonthlyProfitReport={chartMonthlyProfitReport}
      chartWeeklyProfitReport={chartWeeklyProfitReport}
    />
  );
}
