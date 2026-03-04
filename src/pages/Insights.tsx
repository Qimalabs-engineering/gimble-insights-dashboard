import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { departmentWellbeing, assessmentResults, moodTrendData } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area,
} from "recharts";

const COLORS = [
  "hsl(170, 45%, 32%)",
  "hsl(34, 80%, 55%)",
  "hsl(200, 60%, 50%)",
  "hsl(280, 50%, 55%)",
];

const radarData = departmentWellbeing.map((d) => ({
  department: d.department,
  wellbeing: d.wellbeing * 10,
  engagement: d.engagement,
  stressInverse: (10 - d.stress) * 10,
}));

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

      <TabsContent value="overview" className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Wellbeing & Stress Over Time</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={moodTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
                <XAxis dataKey="month" fontSize={12} stroke="hsl(180,10%,45%)" />
                <YAxis fontSize={12} stroke="hsl(180,10%,45%)" domain={[0, 10]} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.15} name="Wellbeing" strokeWidth={2} />
                <Area type="monotone" dataKey="stress" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.1} name="Stress" strokeWidth={2} />
                <Area type="monotone" dataKey="sleep" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.1} name="Sleep" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="departments" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Department Wellbeing Scores</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentWellbeing} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
                  <XAxis type="number" fontSize={12} domain={[0, 10]} stroke="hsl(180,10%,45%)" />
                  <YAxis dataKey="department" type="category" fontSize={12} width={90} stroke="hsl(180,10%,45%)" />
                  <Tooltip />
                  <Bar dataKey="wellbeing" fill={COLORS[0]} radius={[0, 6, 6, 0]} name="Wellbeing" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Department Radar</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(160,15%,90%)" />
                  <PolarAngleAxis dataKey="department" fontSize={11} />
                  <PolarRadiusAxis fontSize={10} domain={[0, 100]} />
                  <Radar name="Wellbeing" dataKey="wellbeing" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.2} />
                  <Radar name="Engagement" dataKey="engagement" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.15} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Engagement by Department</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentWellbeing}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160,15%,90%)" />
                <XAxis dataKey="department" fontSize={12} stroke="hsl(180,10%,45%)" />
                <YAxis fontSize={12} stroke="hsl(180,10%,45%)" domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="engagement" fill={COLORS[2]} radius={[6, 6, 0, 0]} name="Engagement %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

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
