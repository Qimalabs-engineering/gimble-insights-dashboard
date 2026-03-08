import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { journeyTemplates, JourneyTemplate } from "@/lib/admin-mock-data";
import { Plus, Search, Pencil, Archive, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminTemplates = () => {
  const [templates, setTemplates] = useState<JourneyTemplate[]>(journeyTemplates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<JourneyTemplate | null>(null);
  const [form, setForm] = useState({ title: "", category: "", description: "", modules: "", estimatedDays: "", status: "draft" as JourneyTemplate["status"] });
  const { toast } = useToast();

  const filtered = templates.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCreate = () => {
    setEditingTemplate(null);
    setForm({ title: "", category: "", description: "", modules: "", estimatedDays: "", status: "draft" });
    setDialogOpen(true);
  };

  const openEdit = (t: JourneyTemplate) => {
    setEditingTemplate(t);
    setForm({ title: t.title, category: t.category, description: t.description, modules: String(t.modules), estimatedDays: String(t.estimatedDays), status: t.status });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.category) return;
    if (editingTemplate) {
      setTemplates((prev) =>
        prev.map((t) => t.id === editingTemplate.id ? { ...t, ...form, modules: Number(form.modules), estimatedDays: Number(form.estimatedDays) } : t)
      );
      toast({ title: "Template updated", description: `"${form.title}" has been updated.` });
    } else {
      const newTemplate: JourneyTemplate = {
        id: `jt${Date.now()}`,
        title: form.title,
        category: form.category,
        description: form.description,
        modules: Number(form.modules) || 1,
        estimatedDays: Number(form.estimatedDays) || 7,
        status: form.status,
        usedByOrgs: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTemplates((prev) => [newTemplate, ...prev]);
      toast({ title: "Template created", description: `"${form.title}" has been created.` });
    }
    setDialogOpen(false);
  };

  const handleArchive = (id: string) => {
    setTemplates((prev) => prev.map((t) => t.id === id ? { ...t, status: "archived" as const } : t));
    toast({ title: "Template archived" });
  };

  const statusColor = (s: string) => s === "published" ? "default" : s === "draft" ? "secondary" : "outline";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Journey Templates</h1>
          <p className="text-muted-foreground mt-1">Create and manage journey templates for all organizations.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4 mr-2" /> New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingTemplate ? "Edit Template" : "Create Journey Template"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Managing Stress" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Stress" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe this journey..." rows={3} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Modules</Label>
                  <Input type="number" value={form.modules} onChange={(e) => setForm({ ...form, modules: e.target.value })} placeholder="8" />
                </div>
                <div className="space-y-2">
                  <Label>Est. Days</Label>
                  <Input type="number" value={form.estimatedDays} onChange={(e) => setForm({ ...form, estimatedDays: e.target.value })} placeholder="21" />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as JourneyTemplate["status"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">{editingTemplate ? "Save Changes" : "Create Template"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <Card key={t.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{t.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{t.category}</p>
                  </div>
                </div>
                <Badge variant={statusColor(t.status)} className="capitalize text-xs">{t.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{t.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>{t.modules} modules · {t.estimatedDays} days</span>
                <span>Used by {t.usedByOrgs} orgs</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(t)}>
                  <Pencil className="h-3 w-3 mr-1" /> Edit
                </Button>
                {t.status !== "archived" && (
                  <Button variant="ghost" size="sm" onClick={() => handleArchive(t.id)}>
                    <Archive className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminTemplates;
