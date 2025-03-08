
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import StatBar from '@/components/famille/StatBar';
import { VestaleCandidate } from '@/types/vestale';

interface VestaleCandidateProps {
  candidate: VestaleCandidate;
  onPropose: (characterId: string) => void;
}

export const VestaleCandidate: React.FC<VestaleCandidateProps> = ({ candidate, onPropose }) => {
  // Calcule l'adéquation globale de la candidate
  const calculateSuitability = () => {
    const pietyFactor = candidate.stats.piety * 2; // La piété est le facteur le plus important
    const disciplineFactor = candidate.stats.discipline * 1.5;
    const intelligenceFactor = candidate.stats.intelligence;
    const charismafactor = candidate.stats.charisma * 0.5;
    
    const total = pietyFactor + disciplineFactor + intelligenceFactor + charismafactor;
    // Score maximal théorique: (10*2) + (10*1.5) + 10 + (10*0.5) = 20 + 15 + 10 + 5 = 50
    return Math.round((total / 50) * 100);
  };
  
  const suitability = calculateSuitability();
  const getSuitabilityColor = () => {
    if (suitability >= 80) return 'text-green-600';
    if (suitability >= 60) return 'text-lime-600';
    if (suitability >= 40) return 'text-amber-600';
    return 'text-rose-600';
  };
  
  const isMarried = !!candidate.spouse;
  
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <Avatar className="h-16 w-16 rounded-full border-2 border-amber-200">
          <img 
            src={candidate.avatar || "/placeholder.svg"} 
            alt={`${candidate.firstName} ${candidate.lastName}`} 
          />
        </Avatar>
        
        <div className="flex-1">
          <h3 className="font-medium text-lg">{candidate.firstName} {candidate.lastName}</h3>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className="bg-amber-50 text-amber-800">
              {candidate.age} ans
            </Badge>
            {isMarried && (
              <Badge variant="outline" className="bg-rose-50 text-rose-800">
                Mariée
              </Badge>
            )}
          </div>
          
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Discipline</span>
              <span>{candidate.stats.discipline}/10</span>
            </div>
            <StatBar value={candidate.stats.discipline * 10} maxValue={100} color="bg-purple-500" />
            
            <div className="flex justify-between text-sm mt-2">
              <span>Piété</span>
              <span>{candidate.stats.piety}/10</span>
            </div>
            <StatBar value={candidate.stats.piety * 10} maxValue={100} color="bg-amber-500" />
          </div>
          
          {candidate.traits && candidate.traits.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground">Traits:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {candidate.traits.map((trait, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <div>
          <span className="text-sm">Adéquation:</span>
          <span className={`ml-2 font-medium ${getSuitabilityColor()}`}>
            {suitability}%
          </span>
        </div>
        
        <Button 
          onClick={() => onPropose(candidate.id)}
          disabled={isMarried}
          size="sm"
          variant={isMarried ? "outline" : "default"}
        >
          {isMarried ? "Non éligible" : "Proposer"}
        </Button>
      </div>
    </Card>
  );
};
