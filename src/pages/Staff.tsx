import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  UserCog, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Mail,
  Phone
} from 'lucide-react';

const Staff = () => {
  const { user } = useAuth();

  // Only company admins can access this page
  if (user?.role !== 'company') {
    return <Navigate to="/dashboard" replace />;
  }

  const staffMembers = [
    { id: '1', name: 'Ahmad Hassan', email: 'ahmad@academy.com', phone: '+1 234 567 890', role: 'Senior Tutor', students: 18, status: 'active' },
    { id: '2', name: 'Sara Ahmed', email: 'sara@academy.com', phone: '+1 234 567 891', role: 'Tutor', students: 15, status: 'active' },
    { id: '3', name: 'Khalid Noor', email: 'khalid@academy.com', phone: '+1 234 567 892', role: 'Tutor', students: 12, status: 'active' },
    { id: '4', name: 'Amina Yusuf', email: 'amina@academy.com', phone: '+1 234 567 893', role: 'Coordinator', students: 0, status: 'active' },
    { id: '5', name: 'Omar Farooq', email: 'omar@academy.com', phone: '+1 234 567 894', role: 'Tutor', students: 10, status: 'inactive' },
  ];

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
          <Button className="gap-2 w-fit">
            <Plus className="w-4 h-4" />
            Add Staff
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search staff..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffMembers.map((staff) => (
            <Card key={staff.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{staff.name}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {staff.role}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{staff.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Assigned: </span>
                    <span className="font-medium text-foreground">{staff.students} students</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={staff.status === 'active' 
                      ? 'bg-success/10 text-success border-success/30' 
                      : 'bg-muted text-muted-foreground'
                    }
                  >
                    {staff.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Staff;
