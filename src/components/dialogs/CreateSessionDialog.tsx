import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';

interface CreateSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateSessionDialog = ({ open, onOpenChange }: CreateSessionDialogProps) => {
  const { addSession, students, staff } = useData();
  const [formData, setFormData] = useState({
    student: '',
    tutor: '',
    time: '',
    duration: '45 min',
    surah: '',
  });

  const activeStudents = students.filter(s => s.status === 'active');
  const activeTutors = staff.filter(s => s.status === 'active' && s.role !== 'Coordinator');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSession({
      ...formData,
      status: 'scheduled',
    });
    setFormData({ student: '', tutor: '', time: '', duration: '45 min', surah: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule New Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-student">Student</Label>
            <Select value={formData.student} onValueChange={(value) => setFormData({ ...formData, student: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {activeStudents.map((student) => (
                  <SelectItem key={student.id} value={student.name}>{student.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-tutor">Tutor</Label>
            <Select value={formData.tutor} onValueChange={(value) => setFormData({ ...formData, tutor: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select tutor" />
              </SelectTrigger>
              <SelectContent>
                {activeTutors.map((tutor) => (
                  <SelectItem key={tutor.id} value={tutor.name}>{tutor.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-time">Time</Label>
            <Input
              id="session-time"
              type="time"
              value={formData.time}
              onChange={(e) => {
                const time = e.target.value;
                const [hours, minutes] = time.split(':');
                const hour = parseInt(hours);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const displayHour = hour % 12 || 12;
                setFormData({ ...formData, time: `${displayHour}:${minutes} ${ampm}` });
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-duration">Duration</Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30 min">30 minutes</SelectItem>
                <SelectItem value="45 min">45 minutes</SelectItem>
                <SelectItem value="60 min">60 minutes</SelectItem>
                <SelectItem value="90 min">90 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-surah">Surah / Lesson</Label>
            <Input
              id="session-surah"
              value={formData.surah}
              onChange={(e) => setFormData({ ...formData, surah: e.target.value })}
              placeholder="e.g., Al-Baqarah (1-20)"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Session</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
