import { useAuth } from '@/contexts/AuthContext';
import StatCard from './StatCard';
import SessionCard from './SessionCard';
import StudentListItem from './StudentListItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Calendar, 
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const StaffDashboard = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const stats = {
    assignedStudents: 18,
    todaySessions: 6,
    pendingNotes: 2,
    completedToday: 4,
  };

  const todaySessions = [
    { id: '1', studentName: 'Ahmed Ali', time: '09:00 AM', surah: 'Surah Al-Baqarah (Ayah 142-150)', status: 'completed' as const },
    { id: '2', studentName: 'Fatima Hassan', time: '10:30 AM', surah: 'Surah Al-Imran (Ayah 1-20)', status: 'in_progress' as const },
    { id: '3', studentName: 'Omar Khalid', time: '02:00 PM', surah: 'Surah An-Nisa (Ayah 23-35)', status: 'ready' as const },
    { id: '4', studentName: 'Maryam Yusuf', time: '03:30 PM', surah: 'Surah Al-Maidah (Ayah 1-10)', status: 'scheduled' as const },
  ];

  const assignedStudents = [
    { name: 'Ahmed Ali', currentSurah: 'Surah Al-Baqarah', progress: 45, lastSession: 'Today' },
    { name: 'Fatima Hassan', currentSurah: 'Surah Al-Imran', progress: 32, lastSession: 'Today' },
    { name: 'Omar Khalid', currentSurah: 'Surah An-Nisa', progress: 78, lastSession: 'Yesterday' },
    { name: 'Maryam Yusuf', currentSurah: 'Surah Al-Maidah', progress: 15, lastSession: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Assalamu Alaikum, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your teaching schedule for today
          </p>
        </div>
        <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/30">
          Staff Member
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Students"
          value={stats.assignedStudents}
          icon={GraduationCap}
          variant="primary"
        />
        <StatCard
          title="Today's Sessions"
          value={stats.todaySessions}
          icon={Calendar}
          variant="info"
        />
        <StatCard
          title="Completed Today"
          value={stats.completedToday}
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          title="Pending Notes"
          value={stats.pendingNotes}
          icon={AlertCircle}
          variant="warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Sessions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Today's Schedule
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View Week
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySessions.map((session) => (
                <SessionCard
                  key={session.id}
                  {...session}
                  onStart={() => console.log('Start session:', session.id)}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Assigned Students */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                My Students
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignedStudents.slice(0, 3).map((student, index) => (
                <StudentListItem
                  key={index}
                  {...student}
                  onClick={() => console.log('View student:', student.name)}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pending Actions Card */}
      {stats.pendingNotes > 0 && (
        <Card className="bg-gradient-to-r from-warning/10 via-warning/5 to-transparent border-warning/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning text-warning-foreground">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Pending Session Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    You have {stats.pendingNotes} sessions that need notes to be submitted
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-warning text-warning hover:bg-warning/10">
                Complete Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Quran Reference */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Quick Reference</h3>
              <p className="text-sm text-muted-foreground">
                Access Quran text, Tajweed rules, and memorization guides
              </p>
            </div>
            <Button variant="outline" size="sm">
              Open Reference
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;
