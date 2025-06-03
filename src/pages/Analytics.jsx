import React from "react";
import { useHR } from "../contexts/HRContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { BarChart3, Users, TrendingUp, Award } from "lucide-react";

const Analytics = () => {
  const { employees } = useHR();

  const departmentData = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { total: 0, count: 0 };
    }
    acc[emp.department].total += emp.performanceRating;
    acc[emp.department].count += 1;
    return acc;
  }, {});

  const departmentChartData = Object.entries(departmentData).map(
    ([dept, data]) => ({
      department: dept,
      averageRating: Math.round((data.total / data.count) * 10) / 10,
      employeeCount: data.count,
    })
  );

  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    rating: `${rating} Star${rating > 1 ? "s" : ""}`,
    count: employees.filter((emp) => emp.performanceRating === rating).length,
  }));

  const performanceTrends = [
    { quarter: "Q1 2024", averageRating: 3.2 },
    { quarter: "Q2 2024", averageRating: 3.5 },
    { quarter: "Q3 2024", averageRating: 3.8 },
    {
      quarter: "Q4 2024",
      averageRating:
        employees.length > 0
          ? employees.reduce((sum, emp) => sum + emp.performanceRating, 0) /
            employees.length
          : 0,
    },
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#eab308", "#22c55e", "#10b981"];

  const topPerformers = [...employees]
    .sort((a, b) => b.performanceRating - a.performanceRating)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BarChart3 className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Performance insights and trends
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.length > 0
                ? (
                    employees.reduce(
                      (sum, emp) => sum + emp.performanceRating,
                      0
                    ) / employees.length
                  ).toFixed(1)
                : "0"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              High Performers
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.filter((emp) => emp.performanceRating >= 4).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(employees.map((emp) => emp.department)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="department"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="averageRating" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {ratingDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="averageRating"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((employee, index) => (
                <div key={employee.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                      #{index + 1}
                    </span>
                  </div>
                  <img
                    src={employee.image}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {employee.department}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-yellow-500">
                      {employee.performanceRating}
                    </span>
                    <span className="text-gray-400">/5</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
