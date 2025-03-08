
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { SenateurJouable, SenateurCardProps } from '../types/senateurs';

export const SenateurCard: React.FC<SenateurCardProps> = ({ 
  senateur, 
  onSelect,
  selected = false
}) => {
  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all ${selected ? 'ring-2 ring-primary' : ''}`}
      onClick={() => onSelect && onSelect(senateur.id)}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-col">
          <h3 className="font-semibold">{senateur.nom}</h3>
          <p className="text-sm text-muted-foreground">{senateur.famille}</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Âge:</span>
            <span className="text-sm font-medium">{senateur.âge || senateur.age}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm">Popularité:</span>
            <span className="text-sm font-medium">{senateur.popularité || senateur.popularite}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm">Fonction:</span>
            <Badge variant="outline">{senateur.fonctionActuelle || senateur.fonction}</Badge>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm">Parti:</span>
            <Badge 
              variant="secondary"
              className={senateur.appartenance === 'Populares' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}
            >
              {senateur.appartenance}
            </Badge>
          </div>
          
          {senateur.playerId ? (
            <div className="mt-2 pt-2 border-t">
              <Badge className="bg-green-100 text-green-800 w-full justify-center">
                Joueur Assigné
              </Badge>
            </div>
          ) : (
            <div className="mt-2 pt-2 border-t">
              <Badge variant="outline" className="w-full justify-center">
                Non assigné
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
