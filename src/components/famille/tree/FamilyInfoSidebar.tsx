
import React from 'react';
import { TimePanel } from '@/components/time/TimePanel';
import { Users } from 'lucide-react';
import { Character } from '@/types/character';

interface FamilyInfoSidebarProps {
  characters: Character[];
}

export const FamilyInfoSidebar: React.FC<FamilyInfoSidebarProps> = ({ characters }) => {
  return (
    <div>
      <TimePanel showTitle={true} />
      
      <div className="mt-4 p-4 bg-rome-parchment/20 rounded-md">
        <h4 className="font-cinzel text-base mb-2 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Informations Familiales
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-muted-foreground">Membres:</span>
            <span className="font-medium">{characters.length}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-muted-foreground">Génération actuelle:</span>
            <span className="font-medium">2</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-muted-foreground">Alliances matrimoniales:</span>
            <span className="font-medium">1</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
