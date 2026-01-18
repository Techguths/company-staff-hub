import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { Session } from '@/hooks/useSimulatedData';
import { Video, Clock, BookOpen, User, UserPlus } from 'lucide-react';

interface JoinSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
}

export const JoinSessionDialog = ({ open, onOpenChange, session }: JoinSessionDialogProps) => {
  const { joinSession } = useData();

  const handleJoin = () => {
    if (session) {
      joinSession(session.id);
      onOpenChange(false);
    }
  };

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-info" />
            Join Ongoing Session
          </DialogTitle>
          <DialogDescription>
            This session is currently in progress. Join now to participate.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="p-4 rounded-lg bg-info/10 border border-info/20">
            <div className="flex items-center gap-2 text-info mb-2">
              <div className="w-2 h-2 rounded-full bg-info animate-pulse" />
              <span className="font-medium">Session In Progress</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The tutor has already started this session.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Student</p>
              <p className="font-medium">{session.student}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Current Lesson</p>
              <p className="font-medium">{session.surah}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
            <UserPlus className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Tutor</p>
              <p className="font-medium">{session.tutor}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleJoin} className="gap-2 bg-info hover:bg-info/90">
            <Video className="w-4 h-4" />
            Join Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
