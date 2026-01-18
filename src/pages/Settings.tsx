import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DeleteAccountDialog } from '@/components/dialogs/DeleteAccountDialog';
import { toast } from 'sonner';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield,
  Building2,
  Globe,
  LogOut,
  Trash2,
  Camera
} from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();
  const isCompany = user?.role === 'company';

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [orgData, setOrgData] = useState({
    orgName: user?.organizationName || '',
    timezone: 'UTC+0',
    language: 'English',
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved');
  };

  const handleSaveOrganization = () => {
    toast.success('Organization details updated');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            {isCompany && (
              <TabsTrigger value="organization" className="gap-2">
                <Building2 className="w-4 h-4" />
                Organization
              </TabsTrigger>
            )}
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-medium">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        size="icon" 
                        variant="outline"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                        onClick={() => toast.info('Photo upload coming soon')}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={profileData.email} disabled />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Label>Role</Label>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {user?.role === 'company' ? 'Administrator' : 'Staff Member'}
                    </Badge>
                  </div>

                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible account actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div>
                      <p className="font-medium text-foreground">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={() => setDeleteDialogOpen(true)}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border">
                    <div>
                      <p className="font-medium text-foreground">Sign Out</p>
                      <p className="text-sm text-muted-foreground">
                        Sign out of your account on this device
                      </p>
                    </div>
                    <Button variant="outline" onClick={logout} className="gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Reminders</p>
                    <p className="text-sm text-muted-foreground">Get notified before scheduled sessions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Student Updates</p>
                    <p className="text-sm text-muted-foreground">Notifications about student progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch />
                </div>

                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organization Tab (Company Only) */}
          {isCompany && (
            <TabsContent value="organization">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                    <CardDescription>Manage your academy information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input 
                        id="orgName" 
                        value={orgData.orgName}
                        onChange={(e) => setOrgData({ ...orgData, orgName: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input 
                          id="timezone" 
                          value={orgData.timezone}
                          onChange={(e) => setOrgData({ ...orgData, timezone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Input 
                          id="language" 
                          value={orgData.language}
                          onChange={(e) => setOrgData({ ...orgData, language: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={handleSaveOrganization}>Update Organization</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Access Policies
                    </CardTitle>
                    <CardDescription>Configure staff permissions and access rules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Access policy configuration coming soon</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Delete Account Dialog */}
      <DeleteAccountDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} />
    </DashboardLayout>
  );
};

export default Settings;
