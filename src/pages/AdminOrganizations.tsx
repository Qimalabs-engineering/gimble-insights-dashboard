import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { organizations, Organization } from "@/lib/admin-mock-data";
import { Plus, Search, Pencil, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminOrganizations = () => {
  const [orgs, setOrgs] = useState<Organization[]>(organizations);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [form, setForm] = useState({ name: "", plan: "starter" as Organization["plan"], contactEmail: "", status: "active" as Organization["status"] });
  const { toast } = useToast();

  const filtered = orgs.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()) || o.contactEmail.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => {
    setEditingOrg(null);
    setForm({ name: "", plan: "starter", contactEmail: "", status: "active" });
    setDialogOpen(true);
  };

  const openEdit = (o: Organization) => {
    setEditingOrg(o);
    setForm({ name: o.name, plan: o.plan, contactEmail: o.contactEmail, status: o.status });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.contactEmail) return;
    if (editingOrg) {
      setOrgs((prev) => prev.map((o) => o.id === editingOrg.id ? { ...o, ...form } : o));
      toast({ title: "Organization updated", description: `"${form.name}" has been updated.` });
    } else {
      const newOrg: Organization = {
        id: `org${Date.now()}`,
        name: form.name,
        plan: form.plan,
        memberCount: 0,
        activeUsers: 0,
        createdAt: new Date().toISOString().split("T")[0],
        status: form.status,
        contactEmail: form.contactEmail,
      };
      setOrgs((prev) => [newOrg, ...prev]);
      toast({ title: "Organization created", description: `"${form.name}" has been added.` });
    }
    setDialogOpen(false);
  };

  const statusColor = (s: string) => s === "active" ? "default" : s === "trial" ? "secondary" : "destructive";
  const planColor = (p: string) => p === "enterprise" ? "default" : p === "professional" ? "secondary" : "outline";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Organizations</h1>
          <p className="text-muted-foreground mt-1">Manage organizations on the Gimble platform.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4 mr-2" /> Add Organization
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingOrg ? "Edit Organization" : "Add Organization"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} placeholder="hr@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plan</Label>
                  <Select value={form.plan} onValueChange={(v) => setForm({ ...form, plan: v as Organization["plan"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Organization["status"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">{editingOrg ? "Save Changes" : "Add Organization"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search organizations..." className="pl-9" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead className="text-center">Members</TableHead>
                  <TableHead className="text-center">Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{org.name}</p>
                          <p className="text-xs text-muted-foreground">{org.contactEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={planColor(org.plan)} className="capitalize text-xs">{org.plan}</Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm">{org.memberCount.toLocaleString()}</TableCell>
                    <TableCell className="text-center text-sm">{org.activeUsers.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={statusColor(org.status)} className="capitalize text-xs">{org.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{org.createdAt}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => openEdit(org)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminOrganizations;
