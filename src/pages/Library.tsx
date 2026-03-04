import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, Headphones, FileText } from "lucide-react";

const libraryItems = [
  { title: "Understanding Burnout", type: "Article", category: "Stress", icon: FileText, reads: 892 },
  { title: "5-Minute Breathing Exercise", type: "Audio", category: "Mindfulness", icon: Headphones, reads: 1243 },
  { title: "Sleep Hygiene 101", type: "Video", category: "Sleep", icon: Video, reads: 756 },
  { title: "Building Emotional Intelligence", type: "Article", category: "Leadership", icon: FileText, reads: 634 },
  { title: "Guided Body Scan", type: "Audio", category: "Relaxation", icon: Headphones, reads: 987 },
  { title: "Managing Work-Life Balance", type: "Article", category: "Wellbeing", icon: BookOpen, reads: 543 },
];

const Library = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">Library</h1>
      <p className="text-muted-foreground mt-1">Curated wellness content for your organization.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {libraryItems.map((item) => (
        <Card key={item.title} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="outline">{item.type}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-base mb-2">{item.title}</CardTitle>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{item.category}</Badge>
              <span className="text-xs text-muted-foreground">{item.reads} reads</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Library;
