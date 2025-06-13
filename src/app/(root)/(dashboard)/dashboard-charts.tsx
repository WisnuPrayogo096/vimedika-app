"use client";

import { DailyReport, WeeklyReport } from "@/types";
import { ChartLine, ChartNoAxesColumnIncreasing } from "lucide-react";
import {
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Footer from "@/components/ui/footer";
import { formatCurrency, formatDate } from "@/utils/word-formatter";

interface DashboardChartsProps {
  chartMonthlyProfitReport: DailyReport[];
  chartWeeklyProfitReport: WeeklyReport[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
        <p className="text-stone-600">
          {`Omset : Rp ${payload[0].value.toLocaleString("id-ID")}`}
        </p>
        <p className="text-green-600">
          {`Profit : Rp ${payload[1].value.toLocaleString("id-ID")}`}
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={15}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function DashboardCharts({
  chartMonthlyProfitReport,
  chartWeeklyProfitReport,
}: DashboardChartsProps) {
  if (!Array.isArray(chartMonthlyProfitReport || chartWeeklyProfitReport)) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  const simpleLineChartData = chartMonthlyProfitReport.map((item) => ({
    ...item,
    formatted_date: formatDate(item.report_date),
  }));

  const pieChartData =
    chartWeeklyProfitReport.length > 0
      ? [
          {
            name: "HPP",
            value: chartWeeklyProfitReport[0].total_hpp,
            percentage: chartWeeklyProfitReport[0].hpp_percentage,
            fill: "#AAD575", // hijau muda
          },
          {
            name: "Profit",
            value: chartWeeklyProfitReport[0].profit,
            percentage: chartWeeklyProfitReport[0].profit_percentage,
            fill: "#8C6768", // coklat
          },
        ]
      : [];

  const pieChartDataOmset =
    chartWeeklyProfitReport.length > 0
      ? [
          {
            name: "Omset",
            value: chartWeeklyProfitReport[0].omset,
            fill: "#FFFFFF",
          },
        ]
      : [];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Monthly Profit Report
          </h2>
          <p className="text-gray-600">Sales & Profit Report this month</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-stone-50 to-stone-100 p-6 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-stone-600 mb-1">
                  Total Monthly Sales
                </h3>
                <p className="text-2xl font-bold text-stone-900">
                  Rp{" "}
                  {simpleLineChartData
                    .reduce((sum, item) => sum + item.total_sales, 0)
                    .toLocaleString("id-ID")}
                </p>
              </div>
              <ChartNoAxesColumnIncreasing className="w-8 h-8 text-stone-500" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-green-600 mb-1">
                  Total Monthly Profit
                </h3>
                <p className="text-2xl font-bold text-green-900">
                  Rp{" "}
                  {simpleLineChartData
                    .reduce((sum, item) => sum + item.profit_estimate, 0)
                    .toLocaleString("id-ID")}
                </p>
              </div>
              <ChartLine className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Area Chart */}
        <div className="h-96 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Daily Sales & Profit Trend
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={simpleLineChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

              <XAxis
                dataKey="formatted_date"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
              />

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="total_sales"
                stroke="#8C6768"
                strokeWidth={3}
                fill="url(#colorSales)"
                name="Omset"
              />

              <Line
                type="monotone"
                dataKey="profit_estimate"
                stroke="#5CB338"
                strokeWidth={3}
                fill="url(#colorProfit)"
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-stone-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Omset</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Profit</span>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">Rata-rata Penjualan Harian</p>
            <p className="text-lg font-semibold text-gray-900">
              Rp{" "}
              {Math.round(
                simpleLineChartData.reduce(
                  (sum, item) => sum + item.total_sales,
                  0
                ) / simpleLineChartData.length
              ).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Rata-rata Profit Harian</p>
            <p className="text-lg font-semibold text-gray-900">
              Rp{" "}
              {Math.round(
                simpleLineChartData.reduce(
                  (sum, item) => sum + item.profit_estimate,
                  0
                ) / simpleLineChartData.length
              ).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Profit Margin</p>
            <p className="text-lg font-semibold text-gray-900">
              {(
                (simpleLineChartData.reduce(
                  (sum, item) => sum + item.profit_estimate,
                  0
                ) /
                  simpleLineChartData.reduce(
                    (sum, item) => sum + item.total_sales,
                    0
                  )) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-l from-primary to-secondary flex flex-col items-center justify-center rounded-lg shadow-md pt-6 px-12 space-y-12">
          <div className="bg-white flex rounded-lg shadow-lg p-6 items-center justify-center w-full">
            <div className="bg-gradient-to-l from-primary to-secondary inline-block text-transparent bg-clip-text font-bold text-4xl">
              Rp 300.000
            </div>
          </div>
          <div className="border-t border-white p-6 w-3/4">
            <p className="text-center text-white">Omset Hari Ini</p>
          </div>
        </div>
        <div className="bg-gradient-to-l from-primary to-secondary flex flex-col items-center justify-center rounded-lg shadow-md pt-6 px-12 space-y-12">
          <div className="bg-white flex rounded-lg shadow-lg p-6 items-center justify-center w-full">
            <div className="bg-gradient-to-l from-primary to-secondary inline-block text-transparent bg-clip-text font-bold text-4xl">
              Rp 300.000
            </div>
          </div>
          <div className="border-t border-white p-6 w-3/4">
            <p className="text-center text-white">Profit Hari Ini</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-gradient-to-l from-primary to-secondary shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="text-white text-xl font-semibold mb-4">
              Omset dan profit minggu ini
            </div>
            <div className="relative w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    data={pieChartDataOmset}
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                  >
                    {pieChartDataOmset.map((entry, index) => (
                      <Cell key={`cell-omset-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>

                  {/* Pie chart utama (dalam) dengan label */}
                  <Pie
                    dataKey="value"
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `Rp ${value.toLocaleString("id-ID")}`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-row mt-4">
              <div className="flex items-center mr-4">
                <div className="bg-white w-4 h-4 mr-1 rounded-full"></div>
                <div className="text-white">Omset</div>
              </div>
              <div className="flex items-center mr-4">
                <div className="bg-[#AAD575] w-4 h-4 mr-1 rounded-full"></div>
                <div className="text-white">HPP</div>
              </div>
              <div className="flex items-center">
                <div className="bg-[#8C6768] w-4 h-4 mr-1 rounded-full"></div>
                <div className="text-white">Profit</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 shadow-md rounded-lg p-6"></div>
      </div>
      <Footer />
    </div>
  );
}
