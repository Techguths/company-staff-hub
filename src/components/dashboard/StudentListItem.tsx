import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';

interface StudentListItemProps {
  name: string;
  currentSurah: string;
  progress: number;
  lastSession?: string;
  onClick?: () => void;
}

const StudentListItem = ({ name, currentSurah, progress, lastSession, onClick }: StudentListItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border hover:bg-accent/50 transition-colors text-left"
    >
      <Avatar className="w-12 h-12">
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{name}</p>
        <p className="text-sm text-muted-foreground truncate">{currentSurah}</p>
        <div className="flex items-center gap-2 mt-2">
          <Progress value={progress} className="h-1.5 flex-1" />
          <span className="text-xs text-muted-foreground shrink-0">{progress}%</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
    </button>
  );
};

export default StudentListItem;
