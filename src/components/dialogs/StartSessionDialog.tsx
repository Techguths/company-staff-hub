import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { Session } from '@/hooks/useSimulatedData';
import { Play, Clock, BookOpen, User } from 'lucide-react';

interface StartSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
}

export const StartSessionDialog = ({ open, onOpenChange, session }: StartSessionDialogProps) => {
  const { startSession } = useData();

  const handleStart = () => {
    if (session) {
      startSession(session.id);
      onOpenChange(false);
    }
  };

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            Start Session
          </DialogTitle>
          <DialogDescription>
            You are about to start this Quran learning session.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
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
              <p className="text-sm text-muted-foreground">Lesson</p>
              <p className="font-medium">{session.surah}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{session.duration}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleStart} className="gap-2">
            <Play className="w-4 h-4" />
            Start Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
