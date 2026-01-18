import { Clock, Users, BookOpen, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SessionCardProps {
  id: string;
  studentName: string;
  time: string;
  surah: string;
  status: 'scheduled' | 'ready' | 'in_progress' | 'completed';
  onStart?: () => void;
}

const statusConfig = {
  scheduled: { label: 'Scheduled', className: 'bg-muted text-muted-foreground' },
  ready: { label: 'Ready', className: 'bg-info/20 text-info border-info/30' },
  in_progress: { label: 'In Progress', className: 'bg-success/20 text-success border-success/30' },
  completed: { label: 'Completed', className: 'bg-primary/20 text-primary border-primary/30' },
};

const SessionCard = ({ studentName, time, surah, status, onStart }: SessionCardProps) => {
  const config = statusConfig[status];

  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{studentName}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {time}
                </span>
                <span className="truncate">{surah}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Badge variant="outline" className={cn('font-medium', config.className)}>
              {config.label}
            </Badge>
            {(status === 'ready' || status === 'scheduled') && (
              <Button size="sm" onClick={onStart} className="gap-1.5">
                <Play className="w-3.5 h-3.5" />
                Start
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
