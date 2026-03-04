import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { overviewStats, moodTrendData, engagementData, recentActivity, weeklyActiveUsersData } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, Activity, Users, Route, Heart } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";

const statIcons = [Users, Activity, Route, Heart];
const COLORS = [
  "hsl(170, 45%, 32%)",
  "hsl(34, 80%, 55%)",
  "hsl(200, 60%, 50%)",
  "hsl(280, 50%, 55%)",
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const Dashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard Overview</h1>
      <p className="text-muted-foreground mt-1">Welcome back. Here's how your organization is doing.</p>
    </div>

    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewStats.map((stat, i) => {
        const Icon = statIcons[i];
        return (
          <motion.div key={stat.label} variants={item}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-primary" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )}
                      <span className="text-xs text-primary font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Wellbeing Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={moodTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
              <XAxis dataKey="month" fontSize={12} stroke="hsl(180,10%,45%)" />
              <YAxis fontSize={12} stroke="hsl(180,10%,45%)" domain={[0, 10]} />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid hsl(160,15%,90%)",
                  fontSize: "0.875rem",
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
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
              <XAxis dataKey="day" fontSize={12} stroke="hsl(180,10%,45%)" />
              <YAxis fontSize={12} stroke="hsl(180,10%,45%)" />
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

export default Dashboard;
