import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';

interface AddStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddStaffDialog = ({ open, onOpenChange }: AddStaffDialogProps) => {
  const { addStaff } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Tutor',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff({
      ...formData,
      students: 0,
      status: 'active',
    });
    setFormData({ name: '', email: '', phone: '', role: 'Tutor' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="staff-name">Full Name</Label>
            <Input
              id="staff-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="staff-email">Email</Label>
            <Input
              id="staff-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="staff-phone">Phone</Label>
            <Input
              id="staff-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="staff-role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tutor">Tutor</SelectItem>
                <SelectItem value="Senior Tutor">Senior Tutor</SelectItem>
                <SelectItem value="Coordinator">Coordinator</SelectItem>
                <SelectItem value="Administrator">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Staff</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
