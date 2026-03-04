import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const DashboardSettings = () => (
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
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
        <CardDescription>Contacts visible to users in the app.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Primary Contact Name</Label>
          <Input defaultValue="Dr. Amara Obi" />
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input defaultValue="+234 800 123 4567" />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input defaultValue="support@gimble.io" />
        </div>
        <Button>Update Contacts</Button>
      </CardContent>
    </Card>
  </div>
);

export default DashboardSettings;
