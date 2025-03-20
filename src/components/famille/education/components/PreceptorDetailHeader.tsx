
import React from 'react';
import { CalendarDays, Medal, UserCheck, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Preceptor } from '../types/educationTypes';

interface PreceptorDetailHeaderProps {
  preceptor: Preceptor;
  isAssigned?: boolean;
  assignedTo?: string;
}

export const PreceptorDetailHeader: React.FC<PreceptorDetailHeaderProps> = ({
  preceptor,
  isAssigned = false,
  assignedTo
}) => {
  const getSpecialtyName = (specialty: string): string => {
    switch (specialty) {
      case 'military': return 'Militaire';
      case 'rhetoric': return 'Rhétorique';
      case 'religious': return 'Religieuse';
      case 'academic': return 'Académique';
      default: return specialty.charAt(0).toUpperCase() + specialty.slice(1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{preceptor.name}</h1>
        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
          <span>Précepteur de {getSpecialtyName(preceptor.specialty || preceptor.speciality || '')}</span>
          
          {isAssigned && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <UserCheck className="h-4 w-4" />
                Assigné à {assignedTo || 'un élève'}
              </span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant="outline" className="flex items-center gap-2">
          <Medal className="h-4 w-4" />
          Qualité: {preceptor.quality || Math.floor((preceptor.expertise || 0) / 20)}/5
        </Badge>
        
        <Badge variant="outline" className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Expérience: {preceptor.experience || Math.floor((preceptor.expertise || 0) / 10)} ans
        </Badge>
        
        <Badge 
          variant={isAssigned ? "secondary" : "outline"} 
          className={isAssigned ? "bg-green-100 text-green-800" : ""}
        >
          {isAssigned ? "Assigné" : "Disponible"}
        </Badge>
      </div>
    </div>
  );
};
