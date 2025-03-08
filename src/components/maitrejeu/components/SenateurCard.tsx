
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User, CalendarDays, Award, Landmark, Users, TrendingUp, 
  ChevronsUp, DollarSign, Edit, BarChart2
} from 'lucide-react';
import { SenateurCardProps } from '../types/maitreJeuTypes';

export const SenateurCard: React.FC<SenateurCardProps> = ({ 
  senateur, 
  playerName, 
  onEdit,
  isAssigned = false
}) => {
  // Calculate average of competences for the skill bar
  const calculateSkillAverage = () => {
    if (senateur.compétences) {
      const values = Object.values(senateur.compétences);
      if (values.length === 0) return 0;
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    } else if (senateur.stats) {
      const values = Object.values(senateur.stats);
      if (values.length === 0) return 0;
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    }
    return 0;
  };
  
  const getStatusColor = (statut?: string) => {
    if (!statut) return 'bg-gray-500 hover:bg-gray-600';
    
    switch (statut) {
      case 'actif':
        return 'bg-green-500 hover:bg-green-600';
      case 'retraité':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'exilé':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'décédé':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{senateur.nom}</CardTitle>
          <Badge className={getStatusColor(senateur.statut)}>
            {senateur.statut || 'Actif'}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <User className="h-3 w-3" />
          <span>{senateur.famille}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3 text-muted-foreground" />
            <span>{senateur.âge || senateur.age || 'N/A'} ans</span>
          </div>
          
          <div className="flex items-center gap-1">
            <BarChart2 className="h-3 w-3 text-muted-foreground" />
            <span>Influence: {senateur.influence || 0}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Award className="h-3 w-3 text-muted-foreground" />
            <span>Popularité: {senateur.popularité || 0}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            <span>Richesse: {senateur.richesse || 0}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Landmark className="h-3 w-3 text-muted-foreground" />
            <span>{senateur.fonctionActuelle || senateur.magistrature || 'Aucune fonction'}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span>{senateur.appartenance || senateur.faction || 'Indépendant'}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium">Compétences</span>
            <span className="text-xs">{Math.round(calculateSkillAverage() * 10)}%</span>
          </div>
          <Progress 
            value={calculateSkillAverage() * 10} 
            className="h-2" 
          />
        </div>
        
        {isAssigned && (
          <div className="mt-2">
            <Badge variant="outline" className="w-full justify-center">
              <User className="h-3 w-3 mr-1" />
              {playerName ? `Assigné à: ${playerName}` : 'Non assigné'}
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant="outline"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </CardFooter>
    </Card>
  );
};
