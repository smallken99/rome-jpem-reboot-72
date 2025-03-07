
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { magistracies } from '@/data/magistracies';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const MagistratesOverview: React.FC = () => {
  // Magistrats actuellement en fonction (serait normalement chargé depuis une API)
  const activeMagistrates = [
    { 
      id: 1, 
      name: 'Gaius Cornelius Scipio', 
      position: 'consul',
      party: 'optimates',
      image: '/placeholder.svg' 
    },
    { 
      id: 2, 
      name: 'Marcus Aurelius Cotta', 
      position: 'preteur',
      party: 'optimates',
      image: '/placeholder.svg' 
    },
    { 
      id: 3, 
      name: 'Lucius Cassius Longinus', 
      position: 'edile',
      party: 'populares',
      image: '/placeholder.svg' 
    },
    { 
      id: 4, 
      name: 'Quintus Fabius Maximus', 
      position: 'questeur',
      party: 'optimates',
      image: '/placeholder.svg' 
    },
    { 
      id: 5, 
      name: 'Publius Licinius Crassus', 
      position: 'censeur',
      party: 'populares',
      image: '/placeholder.svg' 
    },
  ];

  const getPartyBadge = (party: string) => {
    switch (party) {
      case 'optimates':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Optimates</Badge>;
      case 'populares':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Populares</Badge>;
      default:
        return <Badge variant="outline">Neutre</Badge>;
    }
  };

  const getMagistrateTitle = (position: string) => {
    const magistrate = magistracies.find(m => m.id === position);
    return magistrate ? magistrate.name : position;
  };

  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">Magistrats en fonction</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="space-y-4">
          {activeMagistrates.map((magistrate) => {
            const MagistrateIcon = magistracies.find(m => m.id === magistrate.position)?.icon || null;
            
            return (
              <div key={magistrate.id} className="flex items-center space-x-4 p-3 rounded-md bg-white hover:bg-rome-gold/5 transition-colors">
                <Avatar className="h-10 w-10 border border-rome-gold/20">
                  <img src={magistrate.image} alt={magistrate.name} />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{magistrate.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    {MagistrateIcon && <MagistrateIcon className="h-3 w-3 mr-1" />}
                    <span>{getMagistrateTitle(magistrate.position)}</span>
                  </div>
                </div>
                <div>
                  {getPartyBadge(magistrate.party)}
                </div>
              </div>
            );
          })}
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
