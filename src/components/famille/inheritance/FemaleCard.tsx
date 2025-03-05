import React from 'react';
import { Character } from '@/types/character';
import { formatDowry } from './dowryUtils';
import { HeartHandshake } from 'lucide-react';
import { CardActions } from '../education/components/CardActions';

interface FemaleCardProps {
  character: Character;
  canEdit?: boolean;
}

export const FemaleCard: React.FC<FemaleCardProps> = ({ 
  character, 
  canEdit = true 
}) => {
  const hasDowry = character.marriage && character.marriage.dowry;
  
  return (
    <div className="bg-rome-parchment/70 rounded-md p-4 shadow-md border border-rome-gold/20">
      <h3 className="text-lg font-semibold font-cinzel mb-2">{character.name}</h3>
      
      <div className="mb-3">
        <p className="text-sm text-muted-foreground">
          Âge: <span className="font-medium">{character.age} ans</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Genre: <span className="font-medium">{character.gender}</span>
        </p>
      </div>
      
      {hasDowry && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded mb-3">
          <HeartHandshake className="h-4 w-4" />
          <span>Dot: {formatDowry(character.marriage.dowry)}</span>
        </div>
      )}
      
      {canEdit && (
        <CardActions 
          educationType={character.currentEducation.type}
          childId={character.id}
          childGender={character.gender}
          childAge={character.age}
        />
      )}
    </div>
  );
};
