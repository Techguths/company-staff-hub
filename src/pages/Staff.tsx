import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AddStaffDialog } from '@/components/dialogs/AddStaffDialog';
import { EditStaffDialog } from '@/components/dialogs/EditStaffDialog';
import { ProfileDetailDialog } from '@/components/dialogs/ProfileDetailDialog';
import { StaffMember } from '@/hooks/useSimulatedData';
import { 
  UserCog, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Pencil,
  Trash2,
  User
} from 'lucide-react';
import { toast } from 'sonner';

const Staff = () => {
  const { user } = useAuth();
  const { staff, deleteStaff } = useData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Only company admins can access this page
  if (user?.role !== 'company') {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember);
    setEditDialogOpen(true);
  };

  const handleViewProfile = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember);
    setProfileDialogOpen(true);
  };

  const handleDelete = (staffMember: StaffMember) => {
    if (window.confirm(`Are you sure you want to remove ${staffMember.name}?`)) {
      deleteStaff(staffMember.id);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <UserCog className="w-7 h-7 text-primary" />
              Staff Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your tutors and staff members
            </p>
          </div>
          <Button className="gap-2 w-fit" onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Staff
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search staff..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((staffMember) => (
            <Card key={staffMember.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => handleViewProfile(staffMember)}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {staffMember.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground hover:text-primary transition-colors">
                        {staffMember.name}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {staffMember.role}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={() => handleViewProfile(staffMember)}>
                        <User className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(staffMember)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(staffMember)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{staffMember.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{staffMember.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Assigned: </span>
                    <span className="font-medium text-foreground">{staffMember.students} students</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={staffMember.status === 'active' 
                      ? 'bg-success/10 text-success border-success/30' 
                      : 'bg-muted text-muted-foreground'
                    }
                  >
                    {staffMember.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No staff members found matching your search.
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AddStaffDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      <EditStaffDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} staff={selectedStaff} />
      <ProfileDetailDialog 
        open={profileDialogOpen} 
        onOpenChange={setProfileDialogOpen} 
        type="staff"
        data={selectedStaff}
      />
    </DashboardLayout>
  );
};

export default Staff;
