import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { overviewStats, moodTrendData, engagementData, recentActivity, weeklyActiveUsersData, burnoutForecast } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, Activity, Flame, Route, Heart, AlertTriangle, Calendar } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";

const statIcons = [Activity, Activity, Flame, Heart];
const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back. Here's how your organization is doing.</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, i) => {
          const Icon = statIcons[i];
          const isBurnout = stat.label === "Burnout Risk";
          return (
            <motion.div key={stat.label} variants={item}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {isBurnout ? (
                          <>
                            <TrendingDown className="h-3 w-3 text-primary" />
                            <span className="text-xs text-primary font-medium">{stat.change} from last period</span>
                          </>
                        ) : stat.trend === "up" ? (
                          <>
                            <TrendingUp className="h-3 w-3 text-primary" />
                            <span className="text-xs text-primary font-medium">{stat.change}</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-3 w-3 text-destructive" />
                            <span className="text-xs text-destructive font-medium">{stat.change}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${isBurnout ? 'bg-destructive/10' : 'bg-secondary'}`}>
                      <Icon className={`h-6 w-6 ${isBurnout ? 'text-destructive' : 'text-primary'}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Predictive Burnout Forecasting */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="border-destructive/20 bg-gradient-to-r from-card to-destructive/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg">Burnout Forecast</CardTitle>
              <Badge variant="outline" className="ml-auto border-destructive/30 text-destructive text-xs">
                Predictive
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {burnoutForecast.employeesAtRisk} employees
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    likely to experience burnout in the next {burnoutForecast.timeframe}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-semibold text-foreground">{burnoutForecast.confidence}%</span>
                  </div>
                  <Progress value={burnoutForecast.confidence} className="h-2" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Risk by Department</p>
                {burnoutForecast.riskByDepartment.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{dept.department}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{dept.count}</span>
                      <Badge
                        variant={dept.risk === "high" ? "destructive" : "secondary"}
                        className="text-xs capitalize"
                      >
                        {dept.risk}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Wellbeing Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={moodTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "1px solid hsl(var(--border))",
                    fontSize: "0.875rem",
                    background: "hsl(var(--card))",
                  }}
                />
                <Line type="monotone" dataKey="score" stroke={COLORS[0]} strokeWidth={2.5} name="Wellbeing" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="stress" stroke={COLORS[1]} strokeWidth={2} name="Stress" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="sleep" stroke={COLORS[2]} strokeWidth={2} name="Sleep Quality" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement Mix</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={engagementData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {engagementData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
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
            <CardTitle className="text-lg">Weekly Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyActiveUsersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="users" fill={COLORS[0]} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{a.action}</p>
                    <p className="text-xs text-muted-foreground">{a.user} — {a.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
