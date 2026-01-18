import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AddStudentDialog } from '@/components/dialogs/AddStudentDialog';
import { EditStudentDialog } from '@/components/dialogs/EditStudentDialog';
import { ProfileDetailDialog } from '@/components/dialogs/ProfileDetailDialog';
import { Student } from '@/hooks/useSimulatedData';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  BookOpen,
  Pencil,
  Trash2,
  User
} from 'lucide-react';

const Students = () => {
  const { user } = useAuth();
  const { students, deleteStudent } = useData();
  const isCompany = user?.role === 'company';

  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Staff can only see their assigned students
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.currentSurah.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!isCompany) {
      return matchesSearch && student.tutor === user?.name;
    }
    return matchesSearch;
  });

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setEditDialogOpen(true);
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setProfileDialogOpen(true);
  };

  const handleDelete = (student: Student) => {
    if (window.confirm(`Are you sure you want to remove ${student.name}?`)) {
      deleteStudent(student.id);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Students</h1>
            <p className="text-muted-foreground mt-1">
              {isCompany ? 'Manage all Quran students in your organization' : 'View your assigned students'}
            </p>
          </div>
          {isCompany && (
            <Button className="gap-2 w-fit" onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          )}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search students..." 
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

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => handleViewProfile(student)}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground hover:text-primary transition-colors">
                        {student.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={() => handleViewProfile(student)}>
                        <User className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(student)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {isCompany && (
                        <DropdownMenuItem 
                          onClick={() => handleDelete(student)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Current:</span>
                    <span className="font-medium">Surah {student.currentSurah}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={student.status === 'active' 
                        ? 'bg-success/10 text-success border-success/30' 
                        : 'bg-muted text-muted-foreground'
                      }
                    >
                      {student.status}
                    </Badge>
                  </div>

                  {isCompany && (
                    <p className="text-xs text-muted-foreground">
                      Tutor: {student.tutor}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No students found matching your search.
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AddStudentDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      <EditStudentDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} student={selectedStudent} />
      <ProfileDetailDialog 
        open={profileDialogOpen} 
        onOpenChange={setProfileDialogOpen} 
        type="student"
        data={selectedStudent}
      />
    </DashboardLayout>
  );
};

export default Students;
