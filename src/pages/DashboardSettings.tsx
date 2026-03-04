import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { emergencyContacts as initialContacts } from "@/lib/mock-data";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}

const DashboardSettings = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [form, setForm] = useState({ name: "", role: "", phone: "", email: "" });

  const openAdd = () => {
    setEditingContact(null);
    setForm({ name: "", role: "", phone: "", email: "" });
    setDialogOpen(true);
  };

  const openEdit = (c: Contact) => {
    setEditingContact(c);
    setForm({ name: c.name, role: c.role, phone: c.phone, email: c.email });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.phone) {
      toast.error("Name and phone are required");
      return;
    }
    if (editingContact) {
      setContacts((prev) => prev.map((c) => (c.id === editingContact.id ? { ...c, ...form } : c)));
      toast.success("Contact updated");
    } else {
      setContacts((prev) => [...prev, { id: `ec${Date.now()}`, ...form }]);
      toast.success("Contact added");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    toast.success("Contact removed");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>Basic organization details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Organization Name</Label>
            <Input defaultValue="Gimble Health Ltd" />
          </div>
          <div className="space-y-2">
            <Label>Admin Email</Label>
            <Input defaultValue="admin@gimble.io" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Weekly Insight Reports</p>
              <p className="text-xs text-muted-foreground">Receive aggregated wellbeing reports every Monday.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">New Member Alerts</p>
              <p className="text-xs text-muted-foreground">Get notified when new members join.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Low Engagement Warnings</p>
              <p className="text-xs text-muted-foreground">Alert when team engagement drops below threshold.</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>Support contacts visible to users in the app.</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1" onClick={openAdd}>
                <Plus className="h-4 w-4" /> Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingContact ? "Edit Contact" : "Add Contact"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Jane Smith" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Primary Counselor" />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234 800 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="support@gimble.io" />
                </div>
                <Button onClick={handleSave} className="w-full">{editingContact ? "Update Contact" : "Add Contact"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No emergency contacts added yet.</p>
          ) : (
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.id} className="flex items-start justify-between p-3 rounded-lg border bg-muted/30">
                  <div className="space-y-0.5">
                    <p className="font-medium text-sm">{c.name}</p>
                    {c.role && <p className="text-xs text-muted-foreground">{c.role}</p>}
                    <p className="text-xs text-muted-foreground">{c.phone}{c.email ? ` · ${c.email}` : ""}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(c.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSettings;
