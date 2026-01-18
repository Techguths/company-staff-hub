import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddStudentDialog = ({ open, onOpenChange }: AddStudentDialogProps) => {
  const { addStudent, staff } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentSurah: 'Al-Fatiha',
    tutor: '',
  });

  const activeTutors = staff.filter(s => s.status === 'active' && s.role !== 'Coordinator');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent({
      ...formData,
      progress: 0,
      status: 'active',
      enrollmentDate: new Date().toISOString().split('T')[0],
    });
    setFormData({ name: '', email: '', phone: '', currentSurah: 'Al-Fatiha', tutor: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student-name">Full Name</Label>
            <Input
              id="student-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter student name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-email">Email</Label>
            <Input
              id="student-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-phone">Phone</Label>
            <Input
              id="student-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-surah">Starting Surah</Label>
            <Select value={formData.currentSurah} onValueChange={(value) => setFormData({ ...formData, currentSurah: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select starting surah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Al-Fatiha">Al-Fatiha</SelectItem>
                <SelectItem value="Al-Baqarah">Al-Baqarah</SelectItem>
                <SelectItem value="Al-Imran">Al-Imran</SelectItem>
                <SelectItem value="An-Nisa">An-Nisa</SelectItem>
                <SelectItem value="Al-Maidah">Al-Maidah</SelectItem>
                <SelectItem value="Juz Amma">Juz Amma (30th Juz)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-tutor">Assign Tutor</Label>
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
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
