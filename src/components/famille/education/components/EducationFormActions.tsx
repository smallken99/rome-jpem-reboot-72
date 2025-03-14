
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { SaveIcon, Loader2 } from 'lucide-react';

interface EducationFormActionsProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  isLoading?: boolean;
  childId?: string;
  disabled?: boolean;
}

export const EducationFormActions: React.FC<EducationFormActionsProps> = ({ 
  onSubmit,
  onCancel,
  onSave,
  isLoading = false,
  childId,
  disabled = false
}) => {
  // Si nous avons un ID d'enfant, utilisons-le pour le retour
  const backUrl = childId 
    ? `/famille/education/child/${childId}` 
    : "/famille/education";

  const handleSubmit = (e: React.MouseEvent) => {
    if (onSubmit) {
      onSubmit();
    } else if (onSave) {
      onSave();
    }
  };

  return (
    <div className="flex justify-end gap-2 pt-4">
      <ActionButton 
        variant="outline"
        label="Annuler"
        to={backUrl}
        disabled={isLoading || disabled}
        onClick={onCancel}
      />
      <ActionButton 
        type="submit"
        label={isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
        variant="default"
        icon={isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <SaveIcon className="h-4 w-4" />}
        disabled={isLoading || disabled}
        onClick={handleSubmit}
      />
    </div>
  );
};
