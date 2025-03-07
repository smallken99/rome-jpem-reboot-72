
import React from 'react';
import { Character } from '@/types/character';
import { Button } from '@/components/ui/button';
import { Flame, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface VestaleCandidateProps {
  candidate: Character;
  onPropose: (candidateId: string) => void;
}

export const VestaleCandidate: React.FC<VestaleCandidateProps> = ({ candidate, onPropose }) => {
  // Obtenir les initiales pour l'avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Qualités pertinentes pour une vestale
  const qualities = [
    { name: 'Piété', value: candidate.stats.piety },
    { name: 'Éloquence', value: candidate.stats.oratory },
  ];

  // Calculer si la candidate est particulièrement prometteuse (piété élevée)
  const isPromising = candidate.stats.piety > 70;

  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={candidate.portrait} alt={candidate.name} />
          <AvatarFallback className="bg-rome-terracotta/20">{getInitials(candidate.name)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-cinzel font-medium">{candidate.name}</h4>
              <p className="text-xs text-muted-foreground">{candidate.age} ans</p>
            </div>
            {isPromising && (
              <Badge className="bg-rome-gold text-white border-none">Prometteuse</Badge>
            )}
          </div>
          
          <div className="mt-3 space-y-2">
            {qualities.map(quality => (
              <div key={quality.name} className="flex items-center gap-2">
                <span className="text-xs font-medium w-20">{quality.name}:</span>
                <div className="h-2 flex-1 bg-rome-parchment/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rome-gold rounded-full"
                    style={{ width: `${quality.value}%` }}
                  />
                </div>
                <span className="text-xs">{quality.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">
              <Info className="h-3 w-3 mr-1" />
              Détails
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="font-cinzel text-lg">{candidate.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Informations</h4>
                <p className="text-sm text-muted-foreground">
                  Âge: {candidate.age} ans<br />
                  Éducation: {candidate.education?.type || 'Non débutée'}<br />
                  Personnalité: {candidate.personality || 'Douce et pieuse'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Qualités pour le service de Vesta</h4>
                <p className="text-sm text-muted-foreground">
                  La jeune {candidate.name} montre une piété exemplaire et un respect profond des traditions. 
                  Son tempérament calme et sa capacité à apprendre rapidement en font une excellente candidate pour servir Vesta.
                </p>
              </div>
              
              <div className="bg-rose-50 p-3 rounded-md">
                <h4 className="font-medium text-rose-800 mb-1">Important</h4>
                <p className="text-sm text-rose-700">
                  Une fois proposée comme vestale, la jeune fille devra passer par une sélection rigoureuse. 
                  Si elle est choisie, elle sera retirée de votre famille pour 30 ans de service au temple de Vesta.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          className="bg-rome-navy hover:bg-rome-navy/90"
          onClick={() => onPropose(candidate.id)}
        >
          <Flame className="h-4 w-4 mr-2" />
          Proposer comme vestale
        </Button>
      </div>
    </div>
  );
};
