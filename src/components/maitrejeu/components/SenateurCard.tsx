
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SenateurJouable } from '../types/senateurs';
import { Edit, User, UserCheck } from 'lucide-react';

export interface SenateurCardProps {
  senateur: SenateurJouable;
  onEdit?: () => void; // Make onEdit optional
}

export const SenateurCard: React.FC<SenateurCardProps> = ({ senateur, onEdit }) => {
  const isAssigned = !!senateur.playerId;
  
  return (
    <Card className={`overflow-hidden ${
      senateur.appartenance === 'Optimates' ? 'border-blue-200' : 
      senateur.appartenance === 'Populares' ? 'border-red-200' : 
      'border-purple-200'
    }`}>
      <CardHeader className={`p-4 ${
        senateur.appartenance === 'Optimates' ? 'bg-blue-50' : 
        senateur.appartenance === 'Populares' ? 'bg-red-50' : 
        'bg-purple-50'
      }`}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{senateur.nom}</h3>
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            senateur.appartenance === 'Optimates' ? 'bg-blue-100 text-blue-700' : 
            senateur.appartenance === 'Populares' ? 'bg-red-100 text-red-700' : 
            'bg-purple-100 text-purple-700'
          }`}>
            {senateur.appartenance}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Famille {senateur.famille}</p>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Âge</span>
            <span>{senateur.age} ans</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Fonction</span>
            <span>{senateur.fonction}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Popularité</span>
            <span>{senateur.popularite}/100</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Influence</span>
            <span>{senateur.influence}/100</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-gray-50 flex justify-between">
        <div className="flex items-center">
          {isAssigned ? (
            <div className="flex items-center text-green-600">
              <UserCheck className="h-4 w-4 mr-1" />
              <span className="text-xs">Assigné</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <User className="h-4 w-4 mr-1" />
              <span className="text-xs">Non assigné</span>
            </div>
          )}
        </div>
        
        {/* Only render the Edit button if onEdit is provided */}
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
