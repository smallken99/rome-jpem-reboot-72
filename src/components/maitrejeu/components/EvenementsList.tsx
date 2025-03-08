
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Evenement, EvenementAction, EvenementType } from '../types/evenements';

export interface EvenementsListProps {
  evenements: Evenement[];
  onResolve: (id: string, optionId: string) => void;
  filteredType?: EvenementType | 'ALL';
}

const getTypeColor = (type: EvenementType) => {
  const colors = {
    'POLITIQUE': 'bg-blue-100 text-blue-700',
    'ECONOMIQUE': 'bg-green-100 text-green-700',
    'GUERRE': 'bg-red-100 text-red-700',
    'RELIGION': 'bg-purple-100 text-purple-700',
    'DIPLOMATIQUE': 'bg-amber-100 text-amber-700',
    'SOCIAL': 'bg-pink-100 text-pink-700',
    'CRISE': 'bg-rose-100 text-rose-700'
  };
  
  return colors[type] || 'bg-gray-100 text-gray-700';
};

const getImportanceColor = (importance: string) => {
  const colors = {
    'majeure': 'bg-red-100 text-red-700',
    'mineure': 'bg-blue-100 text-blue-700',
    'normale': 'bg-gray-100 text-gray-700'
  };
  
  return colors[importance] || 'bg-gray-100 text-gray-700';
};

export const EvenementsList: React.FC<EvenementsListProps> = ({ 
  evenements, 
  onResolve,
  filteredType = 'ALL'
}) => {
  return (
    <div className="space-y-4">
      {evenements.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Aucun événement en cours</p>
          </CardContent>
        </Card>
      ) : (
        evenements.map(evenement => (
          <Card key={evenement.id} className={evenement.resolved ? 'opacity-60' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{evenement.titre}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getTypeColor(evenement.type)}>
                    {evenement.type}
                  </Badge>
                  <Badge variant="outline" className={getImportanceColor(evenement.importance)}>
                    {evenement.importance}
                  </Badge>
                </div>
              </div>
              <CardDescription>
                {evenement.date.season} {evenement.date.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{evenement.description}</p>
              
              {!evenement.resolved && (
                <div className="space-y-3 mt-4">
                  <h4 className="font-medium">Options:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {evenement.options.map(option => (
                      <div key={option.id} className="border p-3 rounded-md">
                        <p className="font-medium">{option.texte}</p>
                        <div className="flex justify-end mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onResolve(evenement.id, option.id)}
                          >
                            Choisir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {evenement.resolved && evenement.selectedOption && (
                <div className="mt-4 p-3 border rounded-md bg-muted/30">
                  <h4 className="font-medium mb-1">Résolution:</h4>
                  <p>
                    {evenement.options.find(o => o.id === evenement.selectedOption)?.texte}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
