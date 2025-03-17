
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, X, Trash, ArrowLeft } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface EducationFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  isEditing?: boolean;
}

export const EducationFormActions: React.FC<EducationFormActionsProps> = ({
  onCancel,
  onSave,
  onDelete,
  disabled = false,
  isEditing = false
}) => {
  return (
    <div className="flex justify-between gap-2 pt-4 mt-4 border-t">
      <div>
        {onDelete && isEditing && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-600 hover:bg-red-50">
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer cette éducation</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer cette éducation ? Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      
      <div className="flex gap-2 ml-auto">
        <Button 
          variant="outline" 
          onClick={onCancel}
          type="button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Button 
          onClick={onSave}
          disabled={disabled}
          type="button"
        >
          <Save className="mr-2 h-4 w-4" />
          {isEditing ? "Mettre à jour" : "Enregistrer"}
        </Button>
      </div>
    </div>
  );
};
