
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ArrowDown, GraduationCap, User, Clock } from 'lucide-react';
import { useGameTime } from '@/hooks/useGameTime';
import { toast } from 'sonner';

export const EducationMenu: React.FC = () => {
  const { year, season } = useGameTime();
  
  const handleAdvanceAllEducation = () => {
    // Dans une implémentation réelle, ceci avancerait tous les enfants
    toast.success("Progression de tous les enfants pour cette saison");
  };
  
  const handleHirePreceptor = () => {
    // Redirection vers une page de recrutement
    toast.info("Fonctionnalité à venir: recrutement de précepteurs");
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          Actions <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleAdvanceAllEducation} className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Avancer d'une saison ({season}, An {year})</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleHirePreceptor} className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Recruter un précepteur</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
