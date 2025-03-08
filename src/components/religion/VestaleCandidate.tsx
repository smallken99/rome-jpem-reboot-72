
import React from 'react';
import { Character, CharacterStat } from '@/types/character';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatBar } from '@/components/famille/StatBar';

interface VestaleCandidateProps {
  character: Character;
  onSelect: (characterId: string) => void;
}

export const VestaleCandidate: React.FC<VestaleCandidateProps> = ({ 
  character, 
  onSelect 
}) => {
  // Fonction pour vérifier si un stat est supérieur à une valeur
  const isStatHigherThan = (stat: number | CharacterStat, value: number): boolean => {
    if (typeof stat === 'number') {
      return stat > value;
    }
    return false;
  };

  // Fonction pour transformer un stat en string lisible
  const formatStat = (stat: number | CharacterStat): string => {
    if (typeof stat === 'number') {
      return stat.toString();
    }
    return '0';
  };

  return (
    <Card className="border border-amber-200 bg-amber-50/50">
      <CardHeader className="bg-amber-100">
        <div className="text-center">
          <h3 className="font-cinzel text-lg">{character.firstName} {character.lastName}</h3>
          <p className="text-sm text-muted-foreground">Âge: {character.age} ans</p>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium mb-1">Piété:</p>
            <StatBar 
              value={typeof character.stats.piety === 'number' ? character.stats.piety : 0} 
              maxValue={100} 
              className={isStatHigherThan(character.stats.piety, 70) ? "bg-green-500" : "bg-amber-500"}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Discipline:</p>
            <StatBar 
              value={typeof character.stats.discipline === 'number' ? character.stats.discipline : 0} 
              maxValue={100} 
              className={isStatHigherThan(character.stats.discipline, 60) ? "bg-green-500" : "bg-amber-500"}
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-1">Traits:</h4>
          <div className="flex flex-wrap gap-1">
            {character.traits && character.traits.map((trait, index) => (
              <span key={index} className="text-xs bg-white px-2 py-1 rounded border">
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-1">Éligibilité:</h4>
          <p className="text-sm">
            {character.spouse ? (
              <span className="text-red-600">Non éligible - Déjà mariée</span>
            ) : (
              isStatHigherThan(character.stats.piety, 70) && isStatHigherThan(character.stats.discipline, 60) ? (
                <span className="text-green-600">Excellente candidate</span>
              ) : (
                <span className="text-amber-600">Candidate acceptable</span>
              )
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full border-amber-300 hover:bg-amber-100"
          onClick={() => onSelect(character.id)}
          disabled={character.spouse !== undefined}
        >
          Sélectionner comme Vestale
        </Button>
      </CardFooter>
    </Card>
  );
};
