
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';

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
    <div className="flex justify-end gap-2 pt-4 mt-4 border-t">
      <Button 
        variant="outline" 
        onClick={onCancel}
        type="button"
      >
        <X className="mr-2 h-4 w-4" />
        Annuler
      </Button>
      <Button 
        onClick={onSave}
        disabled={disabled}
        type="button"
      >
        <Save className="mr-2 h-4 w-4" />
        Enregistrer
      </Button>
    </div>
  );
};
