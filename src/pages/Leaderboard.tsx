import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Star, TrendingUp, BookOpen, Calendar } from 'lucide-react';

const Leaderboard = () => {
  const { user } = useAuth();

  const leaderboardData = [
    { rank: 1, name: 'Aisha Rahman', memorization: 92, attendance: 100, streak: 45, score: 2850 },
    { rank: 2, name: 'Yusuf Ahmed', memorization: 88, attendance: 95, streak: 38, score: 2720 },
    { rank: 3, name: 'Khadija Malik', memorization: 85, attendance: 98, streak: 42, score: 2680 },
    { rank: 4, name: 'Ahmed Ali', memorization: 78, attendance: 90, streak: 30, score: 2450 },
    { rank: 5, name: 'Fatima Hassan', memorization: 75, attendance: 92, streak: 28, score: 2380 },
    { rank: 6, name: 'Omar Khalid', memorization: 72, attendance: 88, streak: 25, score: 2200 },
    { rank: 7, name: 'Maryam Yusuf', memorization: 68, attendance: 85, streak: 20, score: 2050 },
    { rank: 8, name: 'Ibrahim Noor', memorization: 65, attendance: 82, streak: 18, score: 1920 },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-yellow-500/30';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-400/5 border-gray-400/30';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600/20 to-amber-600/5 border-amber-600/30';
    return 'bg-card';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-7 h-7 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Top performing Quran students based on memorization and consistency
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-500/20">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Memorizer</p>
                <p className="font-semibold text-foreground">Aisha Rahman</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-success/10 to-transparent border-success/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/20">
                <Calendar className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Attendance</p>
                <p className="font-semibold text-foreground">Aisha Rahman</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-info/10 to-transparent border-info/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-info/20">
                <TrendingUp className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
                <p className="font-semibold text-foreground">45 days</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="overall" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="overall">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Rankings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboardData.map((student) => (
                  <div
                    key={student.rank}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-sm ${getRankBg(student.rank)}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                      {getRankIcon(student.rank)}
                    </div>
                    
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{student.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {student.memorization}%
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {student.attendance}%
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {student.streak} days
                        </span>
                      </div>
                    </div>

                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-bold">
                      {student.score} pts
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                Weekly leaderboard coming soon
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                Monthly leaderboard coming soon
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
