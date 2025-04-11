
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddFamilyMemberDialog } from '../members/AddFamilyMemberDialog';
import { useCharacters } from '../hooks/useCharacters';

export const CharacterCreationButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { localCharacters, addCharacter } = useCharacters();

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleAddMember = (newMember: any) => {
    addCharacter(newMember);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        className="flex items-center"
      >
        <Plus className="mr-2 h-4 w-4" />
        Ajouter un membre
      </Button>

      <AddFamilyMemberDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAdd={handleAddMember}
        existingMembers={localCharacters}
      />
    </>
  );
};
