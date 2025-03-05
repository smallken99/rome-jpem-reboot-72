
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { SaveIcon } from 'lucide-react';

interface EducationFormActionsProps {
  onSubmit?: () => void;
  isLoading?: boolean;
  childId?: string;
}

export const EducationFormActions: React.FC<EducationFormActionsProps> = ({ 
  onSubmit,
  isLoading = false,
  childId
}) => {
  // Si nous avons un ID d'enfant, utilisons-le pour le retour
  const backUrl = childId 
    ? `/famille/education/child/${childId}` 
    : "/famille/education";

  return (
    <div className="flex justify-end gap-2 pt-4">
      <ActionButton 
        variant="outline"
        label="Annuler"
        to={backUrl}
      />
      <ActionButton 
        type="submit"
        label={isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
        variant="default"
        icon={isLoading ? null : <SaveIcon className="h-4 w-4" />}
        disabled={isLoading}
        onClick={onSubmit}
      />
    </div>
  );
};
