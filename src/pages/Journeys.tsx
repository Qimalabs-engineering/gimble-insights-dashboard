import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { journeyTemplates, members } from "@/lib/mock-data";
import { Plus, MoreHorizontal, Search, CheckSquare, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Journeys = () => {
  const [open, setOpen] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [assignMode, setAssignMode] = useState<string>("members");
  const { toast } = useToast();

  const activeMembers = members.filter((m) => m.status === "active");
  const filteredMembers = activeMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allSelected = activeMembers.length > 0 && selectedMembers.size === activeMembers.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(activeMembers.map((m) => m.id)));
    }
  };

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAssign = () => {
    if (!selectedJourney || selectedMembers.size === 0) {
      toast({ title: "Missing selection", description: "Please select a journey and at least one member.", variant: "destructive" });
      return;
    }
    const journey = journeyTemplates.find((j) => j.id === selectedJourney);
    toast({
      title: "Journey Assigned",
      description: `"${journey?.title}" assigned to ${selectedMembers.size} member${selectedMembers.size > 1 ? "s" : ""}.`,
    });
    setSelectedJourney("");
    setSelectedMembers(new Set());
    setSearchQuery("");
    setOpen(false);
  };

  const resetAndClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedJourney("");
      setSelectedMembers(new Set());
      setSearchQuery("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Journey Templates</h1>
          <p className="text-muted-foreground mt-1">Manage and assign guided wellness pathways.</p>
        </div>
        <Dialog open={open} onOpenChange={resetAndClose}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Assign Journey
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Assign Journey to Members</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Journey Template</Label>
                <Select value={selectedJourney} onValueChange={setSelectedJourney}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a journey..." />
                  </SelectTrigger>
                  <SelectContent>
                    {journeyTemplates
                      .filter((j) => j.status === "published")
                      .map((j) => (
                        <SelectItem key={j.id} value={j.id}>
                          {j.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Select Members</Label>
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={toggleAll}>
                    <CheckSquare className="h-3 w-3" />
                    {allSelected ? "Deselect All" : "Select All"}
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or department..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-56 border rounded-md">
                  <div className="p-1">
                    {filteredMembers.map((m) => (
                      <label
                        key={m.id}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/50 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedMembers.has(m.id)}
                          onCheckedChange={() => toggleMember(m.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.department}</p>
                        </div>
                      </label>
                    ))}
                    {filteredMembers.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">No members found.</p>
                    )}
                  </div>
                </ScrollArea>
                {selectedMembers.size > 0 && (
                  <p className="text-xs text-muted-foreground">{selectedMembers.size} member{selectedMembers.size > 1 ? "s" : ""} selected</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAssign}>Assign Journey</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
};

export default Journeys;
