import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { journeyTemplates } from "@/lib/mock-data";
import { Plus, MoreHorizontal } from "lucide-react";

const Journeys = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Journey Templates</h1>
        <p className="text-muted-foreground mt-1">Manage and assign guided wellness pathways.</p>
      </div>
      <Button className="gap-2">
        <Plus className="h-4 w-4" /> New Journey
      </Button>
    </div>

    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Assigned</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journeyTemplates.map((j) => (
              <TableRow key={j.id}>
                <TableCell className="font-medium">{j.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{j.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={j.status === "published" ? "default" : "outline"}>
                    {j.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{j.assignedCount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={j.completionRate} className="h-2 w-20" />
                    <span className="text-xs text-muted-foreground">{j.completionRate}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default Journeys;
