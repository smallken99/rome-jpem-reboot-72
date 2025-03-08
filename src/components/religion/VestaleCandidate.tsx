
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { VestaleCandidate as VestaleCandidateType } from '@/types/vestale';

export const VestaleCandidate: React.FC<{
  candidate: VestaleCandidateType;
  onSelect: (candidate: VestaleCandidateType) => void;
}> = ({ candidate, onSelect }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <Card className="border-2 border-rome-gold/20 hover:border-rome-gold/60 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-rome-gold/40">
              {candidate.avatar ? (
                <AvatarImage src={candidate.avatar} alt={`${candidate.firstName} ${candidate.lastName}`} />
              ) : (
                <AvatarFallback className="bg-rome-marble text-rome-navy">
                  {getInitials(candidate.firstName, candidate.lastName)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="font-cinzel text-lg">
                {candidate.firstName} {candidate.lastName}
              </CardTitle>
              <CardDescription>
                {candidate.spouse ? `Mariée à ${candidate.spouse}` : 'Non mariée'}
              </CardDescription>
            </div>
          </div>
          {candidate.traits && candidate.traits.length > 0 && (
            <Badge variant="outline" className="bg-rome-marble/10">
              {candidate.traits[0]}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Piété</span>
              <span className="font-medium">{candidate.stats.piety}/100</span>
            </div>
            <Progress value={candidate.stats.piety} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Discipline</span>
              <span className="font-medium">{candidate.stats.discipline}/100</span>
            </div>
            <Progress value={candidate.stats.discipline} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Intelligence</span>
              <span className="font-medium">{candidate.stats.intelligence}/100</span>
            </div>
            <Progress value={candidate.stats.intelligence} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Charisme</span>
              <span className="font-medium">{candidate.stats.charisma}/100</span>
            </div>
            <Progress value={candidate.stats.charisma} className="h-2" />
          </div>
          
          <Button 
            onClick={() => onSelect(candidate)} 
            className="w-full roman-btn mt-2"
          >
            Sélectionner
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
