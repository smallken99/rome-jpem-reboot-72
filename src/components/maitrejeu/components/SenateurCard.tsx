import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SenateurCardProps, SenateurJouable } from '../types';

const SenateurCard = ({ senateur, isAssigned, playerName, onEdit }: SenateurCardProps) => {
  // Fonction pour calculer la somme des statistiques
  const calculateStatSum = (senateur: SenateurJouable) => {
    const stats = senateur.stats;
    return (
      stats.éloquence +
      stats.administration +
      stats.militaire +
      stats.intrigue +
      stats.charisme
    );
  };
  
  // Fonction pour calculer la moyenne des statistiques
  const calculateStatAverage = (senateur: SenateurJouable) => {
    return calculateStatSum(senateur) / 5;
  };
  
  // Obtenir la couleur appropriée pour la faction
  const getFactionColor = (faction: string) => {
    switch (faction) {
      case 'Optimates':
        return 'bg-blue-500';
      case 'Populares':
        return 'bg-red-500';
      case 'Moderati':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{senateur.nom}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Famille:</span> {senateur.famille}
          </p>
          <p>
            <span className="font-medium">Âge:</span> {senateur.âge}
          </p>
          {isAssigned && playerName && (
            <p>
              <span className="font-medium">Joueur:</span> {playerName}
            </p>
          )}
          <p>
            <span className="font-medium">Faction:</span>
            <Badge className={getFactionColor(senateur.faction)}>
              {senateur.faction}
            </Badge>
          </p>
          <p>
            <span className="font-medium">Statistiques:</span> Moyenne {calculateStatAverage(senateur)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary" onClick={onEdit}>
          Modifier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SenateurCard;
