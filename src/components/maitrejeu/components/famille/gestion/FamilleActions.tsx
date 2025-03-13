
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, UserPlus, Handshake } from 'lucide-react';

interface FamilleActionsProps {
  onNewFamille: () => void;
  onNewMembre: () => void;
  onNewAlliance: () => void;
}

export const FamilleActions: React.FC<FamilleActionsProps> = ({
  onNewFamille,
  onNewMembre,
  onNewAlliance
}) => {
  return (
    <div className="flex space-x-2">
      <Button onClick={onNewFamille} variant="outline">
        <PlusCircle className="h-4 w-4 mr-2" />
        Nouvelle Famille
      </Button>
      <Button onClick={onNewMembre} variant="outline">
        <UserPlus className="h-4 w-4 mr-2" />
        Nouveau Membre
      </Button>
      <Button onClick={onNewAlliance} variant="outline">
        <Handshake className="h-4 w-4 mr-2" />
        Nouvelle Alliance
      </Button>
    </div>
  );
};
