import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useData } from '@/contexts/DataContext';
import { Session } from '@/hooks/useSimulatedData';
import { CheckCircle, BookOpen, User } from 'lucide-react';

interface EndSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
}

export const EndSessionDialog = ({ open, onOpenChange, session }: EndSessionDialogProps) => {
  const { endSession } = useData();
  const [notes, setNotes] = useState('');
  const [attendance, setAttendance] = useState(true);

  const handleEnd = () => {
    if (session) {
      endSession(session.id, notes);
      setNotes('');
      onOpenChange(false);
    }
  };

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            End Session
          </DialogTitle>
          <DialogDescription>
            Complete this session and submit your notes.
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
              <p className="text-sm text-muted-foreground">Lesson Covered</p>
              <p className="font-medium">{session.surah}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="attendance" 
              checked={attendance} 
              onCheckedChange={(checked) => setAttendance(checked as boolean)}
            />
            <Label htmlFor="attendance">Student was present</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-notes">Session Notes</Label>
            <Textarea
              id="session-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter notes about the session, student progress, areas to improve..."
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleEnd} className="gap-2 bg-success hover:bg-success/90">
            <CheckCircle className="w-4 h-4" />
            Complete Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
