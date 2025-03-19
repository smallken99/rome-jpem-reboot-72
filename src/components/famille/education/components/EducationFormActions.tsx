
import React from 'react';
import { Button } from '@/components/ui/button';

interface EducationFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  disabled?: boolean;
}

export const EducationFormActions: React.FC<EducationFormActionsProps> = ({
  onCancel,
  onSave,
  disabled = false
}) => {
  return (
    <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
      <Button variant="outline" onClick={onCancel}>
        Annuler
      </Button>
      <Button onClick={onSave} disabled={disabled}>
        Valider
      </Button>
    </div>
  );
};
