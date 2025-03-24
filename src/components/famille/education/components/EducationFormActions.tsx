
import React from 'react';
import { ActionsGroup } from '@/components/ui-custom/ActionsGroup';
import { Save, X } from 'lucide-react';

interface EducationFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  disabled?: boolean;
  saving?: boolean;
}

export const EducationFormActions: React.FC<EducationFormActionsProps> = ({
  onCancel,
  onSave,
  disabled = false,
  saving = false
}) => {
  const actions = [
    {
      icon: <X className="h-4 w-4" />,
      label: "Annuler",
      onClick: onCancel,
      variant: "outline" as const
    },
    {
      icon: <Save className="h-4 w-4" />,
      label: saving ? "Enregistrement..." : "Valider",
      onClick: onSave,
      disabled: disabled || saving,
      variant: "default" as const
    }
  ];
  
  return (
    <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
      <ActionsGroup 
        actions={actions}
        spacing="sm"
        justify="end"
      />
    </div>
  );
};
