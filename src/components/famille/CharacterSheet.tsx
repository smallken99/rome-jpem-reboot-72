
import React from 'react';
import { Character } from '@/types/character';
import { CharacterStats } from './CharacterStats';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Crown } from 'lucide-react';

interface CharacterSheetProps {
  character: Character;
  className?: string;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, className }) => {
  // Conversion des statistiques en tableau pour le composant CharacterStats
  const statsArray = [
    character.stats.popularity,
    character.stats.oratory,
    character.stats.piety,
    character.stats.martialEducation
  ];

  return (
    <RomanCard className={className}>
      <RomanCard.Header>
        <div className="flex justify-between items-center">
          <h3 className="font-cinzel text-lg text-rome-navy">{character.name}</h3>
          {character.isPlayer && (
            <Badge className="bg-rome-gold text-white border-none">Personnage Principal</Badge>
          )}
        </div>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <div className="aspect-square bg-gray-200 rounded-md overflow-hidden mb-4">
              {character.portrait ? (
                <img 
                  src={character.portrait} 
                  alt={character.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-rome-navy/10">
                  <User className="h-16 w-16 text-rome-navy/30" />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-rome-navy/70" />
                <span>{character.age} ans</span>
              </div>
              
              {character.title && (
                <div className="flex items-center gap-2 text-sm">
                  <Crown className="h-4 w-4 text-rome-gold" />
                  <span>{character.title}</span>
                </div>
              )}
              
              {character.role && (
                <div className="text-sm text-muted-foreground">
                  {character.role}
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h4 className="font-cinzel text-base mb-3">Caractéristiques</h4>
            <CharacterStats stats={statsArray} />
          </div>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
