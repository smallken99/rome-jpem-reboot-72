
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { ProjetLoi } from '../types';

interface ConfirmationDialogsProps {
  deleteConfirmOpen: boolean;
  setDeleteConfirmOpen: (value: boolean) => void;
  startVoteConfirmOpen: boolean;
  setStartVoteConfirmOpen: (value: boolean) => void;
  confirmDelete: () => void;
  confirmStartVote: () => void;
  loiToStartVote: ProjetLoi | null;
}

export const ConfirmationDialogs: React.FC<ConfirmationDialogsProps> = ({
  deleteConfirmOpen,
  setDeleteConfirmOpen,
  startVoteConfirmOpen,
  setStartVoteConfirmOpen,
  confirmDelete,
  confirmStartVote,
  loiToStartVote
}) => {
  return (
    <>
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce projet de loi ? Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={startVoteConfirmOpen} onOpenChange={setStartVoteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Démarrer un vote</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous soumettre cette loi au vote du Sénat ? Une fois le vote commencé, le projet ne pourra plus être modifié.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStartVote}>Démarrer le vote</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
