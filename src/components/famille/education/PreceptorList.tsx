
import React from 'react';
import { Preceptor } from './types/educationTypes';
import { PreceptorCard } from './PreceptorCard';
import { Button } from '@/components/ui/button';
import { InfoCircle } from 'lucide-react';

interface PreceptorListProps {
  preceptors: Preceptor[];
  selectedPreceptorId?: string;
  onSelectPreceptor: (preceptorId: string) => void;
  onHirePreceptor?: (preceptorId: string) => void;
  onFirePreceptor?: (preceptorId: string) => void;
  showAvailableOnly?: boolean;
  educationType?: string;
  showHireButton?: boolean;
  childId?: string;
}

export const PreceptorList: React.FC<PreceptorListProps> = ({
  preceptors,
  selectedPreceptorId,
  onSelectPreceptor,
  onHirePreceptor,
  onFirePreceptor,
  showAvailableOnly = false,
  educationType,
  showHireButton = false,
  childId
}) => {
  // Filter preceptors based on availability and type if specified
  const filteredPreceptors = preceptors.filter(preceptor => {
    // Filter by availability if requested
    if (showAvailableOnly && preceptor.assigned) {
      return false;
    }
    
    // Filter by education type if specified
    if (educationType && preceptor.specialty !== 'none' && preceptor.specialty !== educationType) {
      return false;
    }
    
    return true;
  });
  
  if (filteredPreceptors.length === 0) {
    return (
      <div className="text-center p-6 bg-rome-parchment border border-rome-gold/20 rounded-lg">
        <div className="mb-4 text-amber-700">
          <InfoCircle size={36} className="mx-auto" />
        </div>
        <h3 className="font-cinzel text-lg mb-2">Aucun précepteur disponible</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {educationType 
            ? `Il n'y a pas de précepteur disponible pour l'éducation ${educationType}.`
            : "Il n'y a pas de précepteur disponible actuellement."}
        </p>
        <Button variant="outline">Recruter un précepteur</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {filteredPreceptors.map(preceptor => (
        <PreceptorCard
          key={preceptor.id}
          preceptor={preceptor}
          isSelected={preceptor.id === selectedPreceptorId}
          onSelect={() => onSelectPreceptor(preceptor.id)}
          onHire={onHirePreceptor ? () => onHirePreceptor(preceptor.id) : undefined}
          onFire={onFirePreceptor ? () => onFirePreceptor(preceptor.id) : undefined}
          showHireButton={showHireButton}
          childId={childId}
        />
      ))}
    </div>
  );
};
