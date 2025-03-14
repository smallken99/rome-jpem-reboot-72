
import React from 'react';
import { Character } from '@/types/character';
import { useGameTime } from '@/hooks/useGameTime';
import { AllianceIntro } from './alliances/AllianceIntro';
import { BirthIndicator } from './alliances/BirthIndicator';
import { AllianceList } from './alliances/AllianceList';
import { useAllianceBirths } from './alliances/useAllianceBirths';
import { familyAlliances } from '@/data/alliances';

interface MarriageAlliancesProps {
  characters: Character[];
  onChildBirth?: (child: Character) => void;
}

export const MarriageAlliances: React.FC<MarriageAlliancesProps> = ({ 
  characters, 
  onChildBirth 
}) => {
  const { year } = useGameTime();
  const { lastBirthYear, activeAlliances } = useAllianceBirths(characters, onChildBirth);
  
  return (
    <div className="marriage-alliances">
      <AllianceIntro />
      
      <BirthIndicator lastBirthYear={lastBirthYear} currentYear={year} />
      
      <AllianceList 
        alliances={familyAlliances} 
        showOnlyActive={true}
      />
    </div>
  );
};
