import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { departmentWellbeing, assessmentResults, moodTrendData, engagementData } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const COLORS = [
  "hsl(170, 45%, 32%)",
  "hsl(34, 80%, 55%)",
  "hsl(200, 60%, 50%)",
  "hsl(280, 50%, 55%)",
  "hsl(340, 55%, 50%)",
  "hsl(120, 40%, 45%)",
];

const radarData = departmentWellbeing.map((d) => ({
  department: d.department,
  wellbeing: d.wellbeing * 10,
  engagement: d.engagement,
  stressInverse: (10 - d.stress) * 10,
  satisfaction: d.satisfaction * 10,
  burnoutInverse: (100 - d.burnout),
}));

// Compute mood summary stats
const latestMood = moodTrendData[moodTrendData.length - 1];
const prevMood = moodTrendData[moodTrendData.length - 2];

const moodCards = [
  {
    label: "Wellbeing Score",
    value: latestMood.score.toFixed(1),
    prev: prevMood.score,
    current: latestMood.score,
    suffix: "/10",
  },
  {
    label: "Stress Level",
    value: latestMood.stress.toFixed(1),
    prev: prevMood.stress,
    current: latestMood.stress,
    suffix: "/10",
    inverse: true,
  },
  {
    label: "Sleep Quality",
    value: latestMood.sleep.toFixed(1),
    prev: prevMood.sleep,
    current: latestMood.sleep,
    suffix: "/10",
  },
];

const Insights = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">Insights & Analytics</h1>
      <p className="text-muted-foreground mt-1">Anonymous, aggregated wellbeing metrics across your organization.</p>
    </div>

    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="departments">By Department</TabsTrigger>
        <TabsTrigger value="assessments">Assessments</TabsTrigger>
      </TabsList>

      {/* =================== OVERVIEW =================== */}
      <TabsContent value="overview" className="space-y-6">
        {/* Mood summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {moodCards.map((c) => {
            const diff = c.current - c.prev;
            const improving = c.inverse ? diff < 0 : diff > 0;
            const neutral = Math.abs(diff) < 0.05;
            return (
              <Card key={c.label}>
                <CardContent className="pt-5">
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-bold">{c.value}</span>
                    <span className="text-sm text-muted-foreground mb-1">{c.suffix}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {neutral ? (
                      <Minus className="h-3 w-3 text-muted-foreground" />
                    ) : improving ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <span className={`text-xs font-medium ${neutral ? "text-muted-foreground" : improving ? "text-green-600" : "text-destructive"}`}>
                      {diff > 0 ? "+" : ""}{diff.toFixed(1)} from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mood trend */}
        <Card>
          <CardHeader><CardTitle>Mood Trends Over Time</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={moodTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
                <XAxis dataKey="month" fontSize={12} stroke="hsl(180,10%,45%)" />
                <YAxis fontSize={12} stroke="hsl(180,10%,45%)" domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="score" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.15} name="Wellbeing" strokeWidth={2} />
                <Area type="monotone" dataKey="stress" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.1} name="Stress" strokeWidth={2} />
                <Area type="monotone" dataKey="sleep" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.1} name="Sleep Quality" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement pie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Engagement Breakdown</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={engagementData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {engagementData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Wellbeing vs Stress</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={moodTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
                  <XAxis dataKey="month" fontSize={12} stroke="hsl(180,10%,45%)" />
                  <YAxis fontSize={12} stroke="hsl(180,10%,45%)" domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4 }} name="Wellbeing" />
                  <Line type="monotone" dataKey="stress" stroke={COLORS[4]} strokeWidth={2} dot={{ r: 4 }} name="Stress" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* =================== DEPARTMENTS =================== */}
      <TabsContent value="departments" className="space-y-6">
        {/* Summary badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {departmentWellbeing.map((d) => (
            <Card key={d.department}>
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xs text-muted-foreground">{d.department}</p>
                <p className="text-2xl font-bold mt-1">{d.wellbeing}</p>
                <Badge variant={d.wellbeing >= 7.5 ? "default" : d.wellbeing >= 7 ? "secondary" : "outline"} className="mt-1 text-[10px]">
                  {d.wellbeing >= 7.5 ? "Good" : d.wellbeing >= 7 ? "Fair" : "Needs Attention"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Multi-metric bar chart */}
          <Card>
            <CardHeader><CardTitle>All Metrics by Department</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={departmentWellbeing} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
                  <XAxis type="number" fontSize={12} domain={[0, 10]} stroke="hsl(180,10%,45%)" />
                  <YAxis dataKey="department" type="category" fontSize={11} width={85} stroke="hsl(180,10%,45%)" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="wellbeing" fill={COLORS[0]} name="Wellbeing" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="stress" fill={COLORS[1]} name="Stress" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="satisfaction" fill={COLORS[2]} name="Satisfaction" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radar with all metrics */}
          <Card>
            <CardHeader><CardTitle>Department Radar</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(160,15%,90%)" />
                  <PolarAngleAxis dataKey="department" fontSize={11} />
                  <PolarRadiusAxis fontSize={10} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Radar name="Wellbeing" dataKey="wellbeing" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.15} />
                  <Radar name="Engagement" dataKey="engagement" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.1} />
                  <Radar name="Satisfaction" dataKey="satisfaction" stroke={COLORS[5]} fill={COLORS[5]} fillOpacity={0.1} />
                  <Radar name="Low Burnout" dataKey="burnoutInverse" stroke={COLORS[3]} fill={COLORS[3]} fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Engagement + Burnout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Engagement by Department</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={departmentWellbeing}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
                  <XAxis dataKey="department" fontSize={11} stroke="hsl(180,10%,45%)" />
                  <YAxis fontSize={12} stroke="hsl(180,10%,45%)" domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="engagement" fill={COLORS[2]} radius={[6, 6, 0, 0]} name="Engagement %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Burnout Risk by Department</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={departmentWellbeing}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
                  <XAxis dataKey="department" fontSize={11} stroke="hsl(180,10%,45%)" />
                  <YAxis fontSize={12} stroke="hsl(180,10%,45%)" domain={[0, 40]} />
                  <Tooltip />
                  <Bar dataKey="burnout" fill={COLORS[4]} radius={[6, 6, 0, 0]} name="Burnout Risk %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* =================== ASSESSMENTS =================== */}
      <TabsContent value="assessments" className="space-y-6">
        {assessmentResults.map((assessment) => (
          <Card key={assessment.name}>
            <CardHeader><CardTitle>{assessment.name} — Distribution</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[assessment]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
                  <XAxis dataKey="name" fontSize={12} hide />
                  <YAxis fontSize={12} stroke="hsl(180,10%,45%)" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="minimal" fill={COLORS[0]} name="Minimal" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="mild" fill={COLORS[2]} name="Mild" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="moderate" fill={COLORS[1]} name="Moderate" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="severe" fill={COLORS[3]} name="Severe" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  </div>
);

export default Insights;
