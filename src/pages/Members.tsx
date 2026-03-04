import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { members as allMembers } from "@/lib/mock-data";
import { Search, Upload, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

const PAGE_SIZE = 20;

const Members = () => {
  const [search, setSearch] = useState("");
  const [localMembers, setLocalMembers] = useState(allMembers);
  const [page, setPage] = useState(1);
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const [csvPreview, setCsvPreview] = useState<Array<Record<string, string>>>([]);

  const filtered = useMemo(() =>
    localMembers.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
    ), [search, localMembers]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split("\n");
      if (lines.length < 2) return;
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const rows = lines.slice(1).map((line) => {
        const vals = line.split(",").map((v) => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => (obj[h] = vals[i] || ""));
        return obj;
      });
      setCsvPreview(rows);
      setCsvDialogOpen(true);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const importCsv = () => {
    const newMembers = csvPreview.map((row, i) => ({
      id: `csv${Date.now()}${i}`,
      name: row.name || row.full_name || `${row.first_name || ""} ${row.last_name || ""}`.trim() || "Unknown",
      email: row.email || "",
      department: row.department || "Unassigned",
      joinedDate: new Date().toISOString().split("T")[0],
      status: "active" as const,
      journeysCompleted: 0,
    }));
    setLocalMembers((prev) => [...newMembers, ...prev]);
    setCsvDialogOpen(false);
    setCsvPreview([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Members</h1>
          <p className="text-muted-foreground mt-1">{localMembers.length.toLocaleString()} members across your organization.</p>
        </div>
        <div className="relative">
          <Button variant="outline" className="gap-2" onClick={() => document.getElementById("csv-input")?.click()}>
            <Upload className="h-4 w-4" /> Upload CSV
          </Button>
          <input id="csv-input" type="file" accept=".csv" className="hidden" onChange={handleCsvUpload} />
        </div>
      </div>

      {csvDialogOpen && csvPreview.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <p className="font-medium text-sm">CSV Preview — {csvPreview.length} rows detected</p>
            <div className="max-h-48 overflow-auto text-xs border rounded">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    {Object.keys(csvPreview[0]).map((k) => (
                      <th key={k} className="px-2 py-1 text-left">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvPreview.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-t">
                      {Object.values(row).map((v, j) => (
                        <td key={j} className="px-2 py-1">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={importCsv}>Import {csvPreview.length} Members</Button>
              <Button size="sm" variant="outline" onClick={() => { setCsvDialogOpen(false); setCsvPreview([]); }}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search members..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Journeys Done</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {m.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{m.department}</TableCell>
                  <TableCell>
                    <Badge variant={m.status === "active" ? "default" : "secondary"}>
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{m.journeysCompleted}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{m.joinedDate}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
