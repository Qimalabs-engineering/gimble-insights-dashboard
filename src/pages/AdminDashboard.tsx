import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminStats, organizations, journeyTemplates } from "@/lib/admin-mock-data";
import { Building2, Users, Route, Activity, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const statIcons = [Building2, Users, Route, Activity];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const orgChartData = organizations
  .filter((o) => o.status !== "suspended")
  .map((o) => ({ name: o.name, members: o.memberCount, active: o.activeUsers }));

const AdminDashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">Platform Overview</h1>
      <p className="text-muted-foreground mt-1">Gimble platform administration dashboard.</p>
    </div>

    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {adminStats.map((stat, i) => {
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
                      <TrendingUp className="h-3 w-3 text-primary" />
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

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Users by Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={orgChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" fontSize={11} stroke="hsl(var(--muted-foreground))" />
              <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="members" fill="hsl(var(--chart-1))" name="Total Members" radius={[4, 4, 0, 0]} />
              <Bar dataKey="active" fill="hsl(var(--chart-2))" name="Active Users" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizations.slice(0, 5).map((org) => (
              <div key={org.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{org.name}</p>
                    <p className="text-xs text-muted-foreground">{org.memberCount} members</p>
                  </div>
                </div>
                <Badge variant={org.status === "active" ? "default" : org.status === "trial" ? "secondary" : "destructive"} className="capitalize text-xs">
                  {org.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default AdminDashboard;
