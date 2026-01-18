import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock,
  Play,
  CheckCircle,
  BookOpen
} from 'lucide-react';

const Sessions = () => {
  const { user } = useAuth();
  const isCompany = user?.role === 'company';

  const sessions = [
    { id: '1', student: 'Ahmed Ali', tutor: 'Ahmad Hassan', time: '09:00 AM', duration: '45 min', surah: 'Al-Baqarah (142-150)', status: 'completed' },
    { id: '2', student: 'Fatima Hassan', tutor: 'Ahmad Hassan', time: '10:30 AM', duration: '45 min', surah: 'Al-Imran (1-20)', status: 'in_progress' },
    { id: '3', student: 'Omar Khalid', tutor: 'Sara Ahmed', time: '02:00 PM', duration: '45 min', surah: 'An-Nisa (23-35)', status: 'ready' },
    { id: '4', student: 'Maryam Yusuf', tutor: 'Ahmad Hassan', time: '03:30 PM', duration: '45 min', surah: 'Al-Maidah (1-10)', status: 'scheduled' },
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      scheduled: { label: 'Scheduled', className: 'bg-muted text-muted-foreground' },
      ready: { label: 'Ready', className: 'bg-info/20 text-info border-info/30' },
      in_progress: { label: 'In Progress', className: 'bg-success/20 text-success border-success/30' },
      completed: { label: 'Completed', className: 'bg-primary/20 text-primary border-primary/30' },
    }[status] || { label: status, className: '' };

    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sessions</h1>
            <p className="text-muted-foreground mt-1">
              {isCompany ? 'Manage all Quran learning sessions' : 'View and manage your teaching sessions'}
            </p>
          </div>
          {isCompany && (
            <Button className="gap-2 w-fit">
              <Plus className="w-4 h-4" />
              Schedule Session
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="today" className="space-y-4">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="all">All Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Today's Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div 
                      key={session.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{session.student}</p>
                          <p className="text-sm text-muted-foreground">Surah {session.surah}</p>
                          {isCompany && (
                            <p className="text-xs text-muted-foreground mt-1">Tutor: {session.tutor}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{session.time}</span>
                          <span className="text-muted-foreground/50">•</span>
                          <span>{session.duration}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getStatusBadge(session.status)}
                          {(session.status === 'ready' || session.status === 'scheduled') && (
                            <Button size="sm" className="gap-1.5">
                              <Play className="w-3.5 h-3.5" />
                              Start
                            </Button>
                          )}
                          {session.status === 'in_progress' && (
                            <Button size="sm" variant="outline" className="gap-1.5 border-success text-success hover:bg-success/10">
                              <CheckCircle className="w-3.5 h-3.5" />
                              End
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week">
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                Weekly calendar view coming soon
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                All sessions list coming soon
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
