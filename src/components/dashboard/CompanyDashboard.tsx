import { useAuth } from '@/contexts/AuthContext';
import StatCard from './StatCard';
import SessionCard from './SessionCard';
import StudentListItem from './StudentListItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  Trophy, 
  TrendingUp,
  ArrowRight,
  BookOpen 
} from 'lucide-react';

const CompanyDashboard = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const stats = {
    totalStudents: 156,
    activeStaff: 12,
    todaySessions: 24,
    completionRate: 87,
  };

  const upcomingSessions = [
    { id: '1', studentName: 'Ahmed Ali', time: '09:00 AM', surah: 'Surah Al-Baqarah (Ayah 142-150)', status: 'ready' as const },
    { id: '2', studentName: 'Fatima Hassan', time: '10:30 AM', surah: 'Surah Al-Imran (Ayah 1-20)', status: 'scheduled' as const },
    { id: '3', studentName: 'Omar Khalid', time: '02:00 PM', surah: 'Surah An-Nisa (Ayah 23-35)', status: 'scheduled' as const },
  ];

  const topStudents = [
    { name: 'Aisha Rahman', currentSurah: 'Surah Al-Kahf', progress: 92, lastSession: 'Today' },
    { name: 'Yusuf Ahmed', currentSurah: 'Surah Maryam', progress: 88, lastSession: 'Yesterday' },
    { name: 'Khadija Malik', currentSurah: 'Surah Taha', progress: 85, lastSession: 'Today' },
  ];

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
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  {...session}
                  onStart={() => console.log('Start session:', session.id)}
                />
              ))}
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
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {topStudents.map((student, index) => (
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
              <Button size="sm">Add Student</Button>
              <Button size="sm" variant="outline">Schedule Session</Button>
              <Button size="sm" variant="outline">View Reports</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDashboard;
