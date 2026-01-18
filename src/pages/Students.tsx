import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  BookOpen
} from 'lucide-react';

const Students = () => {
  const { user } = useAuth();
  const isCompany = user?.role === 'company';

  const students = [
    { id: '1', name: 'Ahmed Ali', email: 'ahmed@email.com', currentSurah: 'Al-Baqarah', progress: 45, status: 'active', tutor: 'Ahmad Hassan' },
    { id: '2', name: 'Fatima Hassan', email: 'fatima@email.com', currentSurah: 'Al-Imran', progress: 32, status: 'active', tutor: 'Ahmad Hassan' },
    { id: '3', name: 'Omar Khalid', email: 'omar@email.com', currentSurah: 'An-Nisa', progress: 78, status: 'active', tutor: 'Sara Ahmed' },
    { id: '4', name: 'Maryam Yusuf', email: 'maryam@email.com', currentSurah: 'Al-Maidah', progress: 15, status: 'inactive', tutor: 'Ahmad Hassan' },
    { id: '5', name: 'Aisha Rahman', email: 'aisha@email.com', currentSurah: 'Al-Kahf', progress: 92, status: 'active', tutor: 'Sara Ahmed' },
  ];

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
            <Button className="gap-2 w-fit">
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          )}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
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
      </div>
    </DashboardLayout>
  );
};

export default Students;
