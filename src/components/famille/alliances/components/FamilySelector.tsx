
import React from 'react';
import { FamilySelectionCard } from './FamilySelectionCard';

type Family = {
  id: string;
  name: string;
  prestige: string;
  influence: string;
  wealth: string;
};

interface FamilySelectorProps {
  families: Family[];
  selectedFamily: string;
  onSelectFamily: (familyId: string) => void;
}

export const FamilySelector: React.FC<FamilySelectorProps> = ({
  families,
  selectedFamily,
  onSelectFamily
}) => {
  return (
    <div>
      <h3 className="font-cinzel text-lg mb-4">Sélection de Famille</h3>
      
      <div className="space-y-4">
        {families.map((family) => (
          <FamilySelectionCard
            key={family.id}
            family={family}
            isSelected={selectedFamily === family.id}
            onSelect={onSelectFamily}
          />
        ))}
      </div>
    </div>
  );
};
