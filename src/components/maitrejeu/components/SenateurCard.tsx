
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Users, TrendingUp, Coins, Shield } from 'lucide-react';
import { SenateurJouable } from '../types/maitreJeuTypes';

interface SenateurCardProps {
  senateur: SenateurJouable;
  onEdit: (senateur: SenateurJouable) => void;
  onAssign: (senateur: SenateurJouable) => void;
}

export const SenateurCard: React.FC<SenateurCardProps> = ({ senateur, onEdit, onAssign }) => {
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'actif': return 'bg-green-100 text-green-800 border-green-300';
      case 'inactif': return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'décédé': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Obtenir les compétences principales du sénateur
  const topSkills = Object.entries(senateur.compétences)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-cinzel">{senateur.nom}</CardTitle>
          <Badge variant="outline" className={getStatusColor(senateur.statut)}>
            {senateur.statut}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{senateur.famille}</p>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Popularité:
            </span>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${senateur.popularité}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Influence:
            </span>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${senateur.influence}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <Coins className="w-4 h-4 mr-1" />
              Richesse:
            </span>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${senateur.richesse}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="text-sm font-medium mb-1">Compétences principales:</h4>
          <div className="flex flex-wrap gap-1">
            {topSkills.map(([skill, value]) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill} ({value})
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="text-sm font-medium">Fonction actuelle:</h4>
          <p className="text-sm">{senateur.fonctionActuelle || "Aucune fonction"}</p>
        </div>
        
        <div className="mt-2">
          <h4 className="text-sm font-medium">Appartenance:</h4>
          <p className="text-sm">{senateur.appartenance || "Indépendant"}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 flex items-center gap-2"
          onClick={() => onEdit(senateur)}
        >
          <Edit className="h-4 w-4" />
          Modifier
        </Button>
        <Button 
          variant={senateur.joueurId ? "default" : "outline"}
          size="sm" 
          className="flex-1 flex items-center gap-2"
          onClick={() => onAssign(senateur)}
        >
          <Shield className="h-4 w-4" />
          {senateur.joueurId ? "Assigné" : "Assigner"}
        </Button>
      </CardFooter>
    </Card>
  );
};
