import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import StatCard from './StatCard';
import SessionCard from './SessionCard';
import StudentListItem from './StudentListItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddStudentDialog } from '@/components/dialogs/AddStudentDialog';
import { CreateSessionDialog } from '@/components/dialogs/CreateSessionDialog';
import { StartSessionDialog } from '@/components/dialogs/StartSessionDialog';
import { ProfileDetailDialog } from '@/components/dialogs/ProfileDetailDialog';
import { Session, Student } from '@/hooks/useSimulatedData';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  Trophy, 
  TrendingUp,
  ArrowRight,
  BookOpen 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const { students, staff, sessions } = useData();
  const navigate = useNavigate();

  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [createSessionOpen, setCreateSessionOpen] = useState(false);
  const [startSessionOpen, setStartSessionOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Calculate stats from actual data
  const stats = {
    totalStudents: students.length,
    activeStaff: staff.filter(s => s.status === 'active').length,
    todaySessions: sessions.length,
    completionRate: Math.round((sessions.filter(s => s.status === 'completed').length / sessions.length) * 100) || 0,
  };

  const upcomingSessions = sessions
    .filter(s => s.status !== 'completed')
    .slice(0, 3)
    .map(s => ({
      id: s.id,
      studentName: s.student,
      time: s.time,
      surah: `Surah ${s.surah}`,
      status: s.status as 'scheduled' | 'ready' | 'in_progress' | 'completed',
    }));

  const topStudents = students
    .filter(s => s.status === 'active')
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3)
    .map(s => ({
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your organization's Quran learning progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={GraduationCap}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Staff"
          value={stats.activeStaff}
          icon={Users}
          variant="info"
        />
        <StatCard
          title="Today's Sessions"
          value={stats.todaySessions}
          icon={Calendar}
          variant="success"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={TrendingUp}
          variant="warning"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Today's Sessions
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 text-primary"
                onClick={() => navigate('/sessions')}
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  {...session}
                  onStart={() => handleStartSession(session.id)}
                />
              ))}
              {upcomingSessions.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No upcoming sessions</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Students */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-secondary" />
                Top Students
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
              {topStudents.map((student, index) => (
                <StudentListItem
                  key={index}
                  {...student}
                  onClick={() => handleViewStudent(student.name)}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">Manage your academy efficiently</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => setAddStudentOpen(true)}>Add Student</Button>
              <Button size="sm" variant="outline" onClick={() => setCreateSessionOpen(true)}>
                Schedule Session
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigate('/reports')}>
                View Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddStudentDialog open={addStudentOpen} onOpenChange={setAddStudentOpen} />
      <CreateSessionDialog open={createSessionOpen} onOpenChange={setCreateSessionOpen} />
      <StartSessionDialog open={startSessionOpen} onOpenChange={setStartSessionOpen} session={selectedSession} />
      <ProfileDetailDialog 
        open={profileOpen} 
        onOpenChange={setProfileOpen} 
        type="student"
        data={selectedStudent}
      />
    </div>
  );
};

export default CompanyDashboard;
