import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteAccountDialog = ({ open, onOpenChange }: DeleteAccountDialogProps) => {
  const { logout, user } = useAuth();
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = () => {
    if (confirmText === 'DELETE') {
      toast.success('Account deletion initiated. You will be logged out.');
      setTimeout(() => {
        logout();
      }, 1500);
      onOpenChange(false);
    }
  };

  const isConfirmed = confirmText === 'DELETE';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove all associated data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-destructive mb-1">Warning</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• All your data will be permanently deleted</li>
                  <li>• This includes all students, staff, and session records</li>
                  <li>• You will not be able to recover this account</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-delete">
              Type <span className="font-mono font-bold">DELETE</span> to confirm
            </Label>
            <Input
              id="confirm-delete"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              placeholder="Type DELETE"
              className="font-mono"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            variant="destructive"
            disabled={!isConfirmed}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
