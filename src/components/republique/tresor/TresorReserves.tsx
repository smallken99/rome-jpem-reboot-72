
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const reservesData = [
  {
    id: '1',
    name: 'Réserve de Guerre',
    amount: 5200000,
    target: 8000000,
    description: 'Fonds destinés à financer les campagnes militaires importantes',
    category: 'militaire',
    location: 'Temple de Saturne',
    lastContribution: '1 Mai 45 av. J.-C.',
    status: 'Croissance'
  },
  {
    id: '2',
    name: 'Réserve d\'Urgence',
    amount: 2800000,
    target: 3000000,
    description: 'Fonds pour les situations de crise (famines, épidémies, catastrophes)',
    category: 'civil',
    location: 'Temple de Saturne',
    lastContribution: '10 Avril 45 av. J.-C.',
    status: 'Stable'
  },
  {
    id: '3',
    name: 'Réserve Céréalière',
    amount: 1500000,
    target: 2000000,
    description: 'Fonds pour l\'achat de céréales en cas de pénurie',
    category: 'alimentation',
    location: 'Trésor des Édiles',
    lastContribution: '25 Mars 45 av. J.-C.',
    status: 'Croissance'
  },
  {
    id: '4',
    name: 'Réserve d\'Infrastructure',
    amount: 3200000,
    target: 5000000,
    description: 'Fonds pour les grands projets de construction publique',
    category: 'infrastructure',
    location: 'Temple de Saturne',
    lastContribution: '15 Mai 45 av. J.-C.',
    status: 'Croissance'
  }
];

export const TresorReserves: React.FC = () => {
  const calculatePercentage = (amount: number, target: number) => {
    return Math.min(Math.round((amount / target) * 100), 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 25) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    if (percentage < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground mb-4">
        Les réserves stratégiques du Trésor Public permettent à la République de faire face aux imprévus et de financer des projets d'envergure.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reservesData.map((reserve) => {
          const percentage = calculatePercentage(reserve.amount, reserve.target);
          
          return (
            <Card key={reserve.id} className="border-rome-gold/20">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-cinzel">{reserve.name}</CardTitle>
                    <CardDescription className="mt-1">{reserve.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-muted-foreground">
                      {reserve.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Progression</span>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className={`h-2 ${getProgressColor(percentage)}`} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Montant actuel</p>
                      <p className="font-semibold">{reserve.amount.toLocaleString()} As</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Objectif</p>
                      <p className="font-semibold">{reserve.target.toLocaleString()} As</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-muted">
                    <div>
                      <p className="text-sm text-muted-foreground">Lieu de stockage</p>
                      <p className="font-medium">{reserve.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dernière contribution</p>
                      <p className="font-medium">{reserve.lastContribution}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
