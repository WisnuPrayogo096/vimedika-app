"use client";

import { DailyReport } from "@/types";
import {
  ChartLine,
  ChartNoAxesColumnIncreasing,
  SignalHigh,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardChartsProps {
  chartMonthlyProfitReport: DailyReport[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
        <p className="text-green-600">
          {`Profit: Rp ${payload[1].value.toLocaleString("id-ID")}`}
          <p className="text-stone-600">
            {`Omset: Rp ${payload[0].value.toLocaleString("id-ID")}`}
          </p>
        </p>
      </div>
    );
  }
  return null;
};

const formatDate = (dateString: string) => {
  return `${dateString}`;
};

// Format currency for Y-axis
const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} JT`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)} RB`;
  }
  return value.toString();
};

export default function DashboardCharts({
  chartMonthlyProfitReport,
}: DashboardChartsProps) {
  if (!Array.isArray(chartMonthlyProfitReport)) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  const chartData = chartMonthlyProfitReport.map((item) => ({
    ...item,
    formatted_date: formatDate(item.report_date),
  }));

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
                  {chartData
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
                  {chartData
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
            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5CB338" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#5CB338" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8C6768" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8C6768" stopOpacity={0.1} />
                </linearGradient>
              </defs>

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

              <Area
                type="monotone"
                dataKey="total_sales"
                stackId="1"
                stroke="#5CB338"
                strokeWidth={2}
                fill="url(#colorSales)"
                name="Omset"
              />

              <Area
                type="monotone"
                dataKey="profit_estimate"
                stackId="2"
                stroke="#8C6768"
                strokeWidth={2}
                fill="url(#colorProfit)"
                name="Profit"
              />
            </AreaChart>
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
                chartData.reduce((sum, item) => sum + item.total_sales, 0) /
                  chartData.length
              ).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Rata-rata Profit Harian</p>
            <p className="text-lg font-semibold text-gray-900">
              Rp{" "}
              {Math.round(
                chartData.reduce((sum, item) => sum + item.profit_estimate, 0) /
                  chartData.length
              ).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Profit Margin</p>
            <p className="text-lg font-semibold text-gray-900">
              {(
                (chartData.reduce(
                  (sum, item) => sum + item.profit_estimate,
                  0
                ) /
                  chartData.reduce((sum, item) => sum + item.total_sales, 0)) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </div>
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
                  {chartData
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
                  {chartData
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
            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5CB338" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#5CB338" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8C6768" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8C6768" stopOpacity={0.1} />
                </linearGradient>
              </defs>

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

              <Area
                type="monotone"
                dataKey="total_sales"
                stackId="1"
                stroke="#5CB338"
                strokeWidth={2}
                fill="url(#colorSales)"
                name="Omset"
              />

              <Area
                type="monotone"
                dataKey="profit_estimate"
                stackId="2"
                stroke="#8C6768"
                strokeWidth={2}
                fill="url(#colorProfit)"
                name="Profit"
              />
            </AreaChart>
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
                chartData.reduce((sum, item) => sum + item.total_sales, 0) /
                  chartData.length
              ).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Rata-rata Profit Harian</p>
            <p className="text-lg font-semibold text-gray-900">
              Rp{" "}
              {Math.round(
                chartData.reduce((sum, item) => sum + item.profit_estimate, 0) /
                  chartData.length
              ).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Profit Margin</p>
            <p className="text-lg font-semibold text-gray-900">
              {(
                (chartData.reduce(
                  (sum, item) => sum + item.profit_estimate,
                  0
                ) /
                  chartData.reduce((sum, item) => sum + item.total_sales, 0)) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
