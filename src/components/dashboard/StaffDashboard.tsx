import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import StatCard from './StatCard';
import SessionCard from './SessionCard';
import StudentListItem from './StudentListItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StartSessionDialog } from '@/components/dialogs/StartSessionDialog';
import { EndSessionDialog } from '@/components/dialogs/EndSessionDialog';
import { ProfileDetailDialog } from '@/components/dialogs/ProfileDetailDialog';
import { Session, Student } from '@/hooks/useSimulatedData';
import { 
  GraduationCap, 
  Calendar, 
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const StaffDashboard = () => {
  const { user } = useAuth();
  const { students, sessions } = useData();
  const navigate = useNavigate();

  const [startSessionOpen, setStartSessionOpen] = useState(false);
  const [endSessionOpen, setEndSessionOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filter data for staff's assigned students/sessions
  const assignedStudents = students.filter(s => s.tutor === user?.name);
  const assignedSessions = sessions.filter(s => s.tutor === user?.name);

  // Calculate stats from actual data
  const stats = {
    assignedStudents: assignedStudents.length,
    todaySessions: assignedSessions.length,
    completedToday: assignedSessions.filter(s => s.status === 'completed').length,
    pendingNotes: assignedSessions.filter(s => s.status === 'completed' && !s.notes).length,
  };

  const todaySessions = assignedSessions.map(s => ({
    id: s.id,
    studentName: s.student,
    time: s.time,
    surah: `Surah ${s.surah}`,
    status: s.status as 'scheduled' | 'ready' | 'in_progress' | 'completed',
  }));

  const staffStudents = assignedStudents.slice(0, 3).map(s => ({
    ...s,
    currentSurah: `Surah ${s.currentSurah}`,
    lastSession: 'Today',
  }));

  const handleStartSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setSelectedSession(session);
      setStartSessionOpen(true);
    }
  };

  const handleViewStudent = (studentName: string) => {
    const student = students.find(s => s.name === studentName);
    if (student) {
      setSelectedStudent(student);
      setProfileOpen(true);
    }
  };

  const handleCompleteNotes = () => {
    toast.info('Opening pending notes...');
    navigate('/sessions');
  };

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
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 text-primary"
                onClick={() => navigate('/sessions')}
              >
                View Week
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySessions.map((session) => (
                <SessionCard
                  key={session.id}
                  {...session}
                  onStart={() => handleStartSession(session.id)}
                />
              ))}
              {todaySessions.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No sessions scheduled for today</p>
              )}
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
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 text-primary"
                onClick={() => navigate('/students')}
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {staffStudents.map((student, index) => (
                <StudentListItem
                  key={index}
                  {...student}
                  onClick={() => handleViewStudent(student.name)}
                />
              ))}
              {staffStudents.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No students assigned</p>
              )}
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
              <Button 
                size="sm" 
                variant="outline" 
                className="border-warning text-warning hover:bg-warning/10"
                onClick={handleCompleteNotes}
              >
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
            <Button variant="outline" size="sm" onClick={() => toast.info('Reference library coming soon')}>
              Open Reference
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <StartSessionDialog open={startSessionOpen} onOpenChange={setStartSessionOpen} session={selectedSession} />
      <EndSessionDialog open={endSessionOpen} onOpenChange={setEndSessionOpen} session={selectedSession} />
      <ProfileDetailDialog 
        open={profileOpen} 
        onOpenChange={setProfileOpen} 
        type="student"
        data={selectedStudent}
      />
    </div>
  );
};

export default StaffDashboard;
