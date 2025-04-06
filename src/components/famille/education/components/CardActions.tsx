
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StartEducationDialog } from '../StartEducationDialog';
import { EducationType } from '../types/educationTypes';
import { BookOpen, RotateCw, Pencil } from 'lucide-react';

interface CardActionsProps {
  educationType: EducationType;
  childId: string;
  childGender: 'male' | 'female';
  childAge: number;
  onStartEducation?: () => void;
  onChangeEducation?: () => void;
}

export const CardActions: React.FC<CardActionsProps> = ({
  educationType,
  childId,
  childGender,
  childAge,
  onStartEducation,
  onChangeEducation
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleStartEducation = (childId: string, educationType: string, mentorId: string | null) => {
    // Dans un cas réel, cette fonction communiquerait avec un contexte ou un hook
    console.log(`Démarrage de l'éducation de type ${educationType} pour l'enfant ${childId} avec précepteur ${mentorId || 'aucun'}`);
    setIsDialogOpen(false);
    
    // Appeler le callback parent si fourni
    if (onStartEducation) {
      onStartEducation();
    }
  };
  
  // Vérifier si l'enfant est en âge de recevoir une éducation (entre 7 et 16 ans généralement)
  const canBeEducated = childAge >= 7 && childAge <= 16;
  
  if (educationType !== 'none') {
    return (
      <div className="flex justify-end mt-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onChangeEducation}
        >
          <Pencil className="mr-1 h-4 w-4" />
          Modifier l'éducation
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex justify-end mt-3">
        {!canBeEducated ? (
          <Button
            variant="outline"
            size="sm"
            disabled
          >
            {childAge < 7 ? "Trop jeune pour l'éducation" : "Trop âgé pour l'éducation"}
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => onStartEducation ? onStartEducation() : setIsDialogOpen(true)}
          >
            <BookOpen className="mr-1 h-4 w-4" />
            Commencer l'éducation
          </Button>
        )}
      </div>
      
      <StartEducationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        childId={childId}
        preceptors={[]} // Dans un cas réel, les précepteurs seraient fournis par un contexte ou un hook
        onStartEducation={handleStartEducation}
      />
    </>
  );
};
