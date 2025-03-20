
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Child, EducationType } from '../types/educationTypes';

interface PreceptorAssignmentPanelProps {
  children: Child[];
  onAssign: (childId: string) => void;
  specialty: EducationType;
}

export const PreceptorAssignmentPanel: React.FC<PreceptorAssignmentPanelProps> = ({
  children,
  onAssign,
  specialty
}) => {
  const [selectedChildId, setSelectedChildId] = React.useState<string>('');

  // Trouver le nom du parcours éducatif en fonction de la spécialité
  const getEducationTypeName = (type: EducationType): string => {
    switch (type) {
      case 'military': return 'Éducation Militaire';
      case 'rhetoric': return 'Éducation Rhétorique';
      case 'religious': return 'Éducation Religieuse';
      case 'academic': return 'Éducation Académique';
      default: return 'Éducation';
    }
  };

  return (
    <div className="space-y-4 bg-muted/20 p-4 rounded-lg border">
      <h3 className="font-semibold text-base">Assigner à un enfant</h3>
      <p className="text-sm text-muted-foreground">
        Ce précepteur peut être assigné à un enfant suivant le parcours {getEducationTypeName(specialty)}.
      </p>
      
      {children.length > 0 ? (
        <>
          <RadioGroup value={selectedChildId} onValueChange={setSelectedChildId}>
            <div className="space-y-2">
              {children.map((child) => (
                <div key={child.id} className="flex items-center space-x-2">
                  <RadioGroupItem id={`child-${child.id}`} value={child.id} />
                  <Label htmlFor={`child-${child.id}`} className="cursor-pointer">
                    {child.name} ({child.age} ans)
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
          
          <Button 
            onClick={() => selectedChildId && onAssign(selectedChildId)}
            disabled={!selectedChildId}
            size="sm"
            className="mt-2"
          >
            Assigner
          </Button>
        </>
      ) : (
        <p className="text-sm italic text-muted-foreground">
          Aucun enfant compatible n'a besoin d'un précepteur actuellement.
        </p>
      )}
    </div>
  );
};
