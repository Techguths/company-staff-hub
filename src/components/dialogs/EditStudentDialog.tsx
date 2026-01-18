import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { Student } from '@/hooks/useSimulatedData';

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
}

export const EditStudentDialog = ({ open, onOpenChange, student }: EditStudentDialogProps) => {
  const { updateStudent, staff } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentSurah: '',
    tutor: '',
    status: 'active' as 'active' | 'inactive',
    progress: 0,
  });

  const activeTutors = staff.filter(s => s.status === 'active' && s.role !== 'Coordinator');

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone || '',
        currentSurah: student.currentSurah,
        tutor: student.tutor,
        status: student.status,
        progress: student.progress,
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student) {
      updateStudent(student.id, formData);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-student-name">Full Name</Label>
            <Input
              id="edit-student-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-student-email">Email</Label>
            <Input
              id="edit-student-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-student-phone">Phone</Label>
            <Input
              id="edit-student-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-student-surah">Current Surah</Label>
            <Select value={formData.currentSurah} onValueChange={(value) => setFormData({ ...formData, currentSurah: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Al-Fatiha">Al-Fatiha</SelectItem>
                <SelectItem value="Al-Baqarah">Al-Baqarah</SelectItem>
                <SelectItem value="Al-Imran">Al-Imran</SelectItem>
                <SelectItem value="An-Nisa">An-Nisa</SelectItem>
                <SelectItem value="Al-Maidah">Al-Maidah</SelectItem>
                <SelectItem value="Al-Kahf">Al-Kahf</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-student-progress">Progress (%)</Label>
            <Input
              id="edit-student-progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-student-tutor">Assigned Tutor</Label>
            <Select value={formData.tutor} onValueChange={(value) => setFormData({ ...formData, tutor: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activeTutors.map((tutor) => (
                  <SelectItem key={tutor.id} value={tutor.name}>{tutor.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-student-status">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
