import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Student, StaffMember } from '@/hooks/useSimulatedData';
import { useData } from '@/contexts/DataContext';
import { User, Mail, Phone, BookOpen, GraduationCap, Calendar, TrendingUp } from 'lucide-react';

interface ProfileDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'student' | 'staff';
  data: Student | StaffMember | null;
}

export const ProfileDetailDialog = ({ open, onOpenChange, type, data }: ProfileDetailDialogProps) => {
  const { updateStudent, updateStaff } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
      setIsEditing(false);
    }
  }, [data]);

  const handleSave = () => {
    if (!data) return;
    
    if (type === 'student') {
      updateStudent(data.id, formData);
    } else {
      updateStaff(data.id, formData);
    }
    setIsEditing(false);
  };

  if (!data) return null;

  const isStudent = type === 'student';
  const studentData = data as Student;
  const staffData = data as StaffMember;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isStudent ? 'Student' : 'Staff'} Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                {data.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mb-2"
                />
              ) : (
                <h3 className="text-lg font-semibold">{data.name}</h3>
              )}
              <Badge variant="outline" className={
                data.status === 'active' 
                  ? 'bg-success/10 text-success border-success/30'
                  : 'bg-muted text-muted-foreground'
              }>
                {data.status}
              </Badge>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="info" className="flex-1">Info</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    {isEditing ? (
                      <Input
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{data.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    {isEditing ? (
                      <Input
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{(data as any).phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 mt-4">
              {isStudent ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current Surah</p>
                      <p className="font-medium">{studentData.currentSurah}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <TrendingUp className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${studentData.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{studentData.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned Tutor</p>
                      <p className="font-medium">{studentData.tutor}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-medium">{staffData.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned Students</p>
                      <p className="font-medium">{staffData.students} students</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
