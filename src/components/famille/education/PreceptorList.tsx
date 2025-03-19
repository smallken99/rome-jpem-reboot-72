
import React from 'react';
import { PreceptorCard } from './PreceptorCard';
import { Preceptor } from './types/educationTypes';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface PreceptorListProps {
  preceptors: Preceptor[];
  selectedPreceptorId?: string;
  onSelectPreceptor?: (id: string) => void;
  onHirePreceptor?: (id: string) => void;
  onFirePreceptor?: (id: string) => void;
  onAssignPreceptor?: (id: string) => void;
  onViewPreceptor?: (id: string) => void;
  showAvailableOnly?: boolean;
  educationType?: string;
  viewOnly?: boolean;
  childId?: string;
}

export const PreceptorList: React.FC<PreceptorListProps> = ({
  preceptors,
  selectedPreceptorId,
  onSelectPreceptor,
  onHirePreceptor,
  onFirePreceptor,
  onAssignPreceptor,
  onViewPreceptor,
  showAvailableOnly = false,
  educationType,
  viewOnly = false,
  childId
}) => {
  // Filter preceptors based on parameters
  const filteredPreceptors = preceptors
    .filter(p => {
      if (showAvailableOnly && p.assigned) return false;
      if (educationType && p.specialty !== educationType) return false;
      return true;
    });
  
  if (filteredPreceptors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Info className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Aucun précepteur disponible</h3>
        <p className="text-muted-foreground max-w-md">
          {showAvailableOnly
            ? "Il n'y a pas de précepteur disponible actuellement."
            : educationType
              ? `Il n'y a pas de précepteur spécialisé en ${educationType}.`
              : "Aucun précepteur n'a été trouvé."}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPreceptors.map((preceptor) => (
        <PreceptorCard
          key={preceptor.id}
          preceptor={preceptor}
          isSelected={selectedPreceptorId === preceptor.id}
          onSelect={() => onSelectPreceptor && onSelectPreceptor(preceptor.id)}
          onHire={() => onHirePreceptor && onHirePreceptor(preceptor.id)}
          onFire={() => onFirePreceptor && onFirePreceptor(preceptor.id)}
          onAssign={() => onAssignPreceptor && onAssignPreceptor(preceptor.id)}
          onView={() => onViewPreceptor && onViewPreceptor(preceptor.id)}
          viewOnly={viewOnly}
          isHired={preceptor.assigned}
          childId={childId}
        />
      ))}
    </div>
  );
};
