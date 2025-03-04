
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

interface EducationFormActionsProps {
  onSubmit?: () => void;
}

export const EducationFormActions: React.FC<EducationFormActionsProps> = ({ 
  onSubmit 
}) => {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <ActionButton 
        variant="outline"
        label="Annuler"
        to="/famille/education"
      />
      <ActionButton 
        type="submit"
        label="Enregistrer les modifications"
        variant="default"
      />
    </div>
  );
};
