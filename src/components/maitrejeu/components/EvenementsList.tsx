
import React, { useState } from 'react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Filter } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { useToast } from '@/components/ui/use-toast';
import { Evenement } from '../types/maitreJeuTypes';

export const EvenementsList: React.FC = () => {
  const { evenements, resolveEvenement } = useMaitreJeu();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'TOUS' | 'ACTIFS' | 'RÉSOLUS'>('TOUS');
  
  const handleResolveEvenement = (id: string) => {
    resolveEvenement(id);
    toast({
      title: "Événement résolu",
      description: "L'événement a été marqué comme résolu.",
    });
  };
  
  const getEvenementTypeColor = (type: Evenement['type']): string => {
    switch (type) {
      case 'CRISE': return 'bg-red-500 hover:bg-red-600';
      case 'GUERRE': return 'bg-orange-500 hover:bg-orange-600';
      case 'POLITIQUE': return 'bg-blue-500 hover:bg-blue-600';
      case 'RELIGION': return 'bg-purple-500 hover:bg-purple-600';
      case 'ÉCONOMIQUE': return 'bg-green-500 hover:bg-green-600';
      case 'DIPLOMATIQUE': return 'bg-indigo-500 hover:bg-indigo-600';
      case 'SOCIAL': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  const filteredEvenements = evenements.filter(e => {
    if (filter === 'TOUS') return true;
    if (filter === 'ACTIFS') return !e.résolu;
    if (filter === 'RÉSOLUS') return e.résolu;
    return true;
  });
  
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg">Événements</CardTitle>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select 
            className="text-sm border rounded-md p-1" 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="TOUS">Tous</option>
            <option value="ACTIFS">Actifs</option>
            <option value="RÉSOLUS">Résolus</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredEvenements.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            Aucun événement à afficher.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvenements.map((evenement) => (
              <Card key={evenement.id} className={`border-l-4 ${evenement.résolu ? 'border-l-green-500' : 'border-l-amber-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium text-lg mr-2">{evenement.title}</h3>
                        <Badge 
                          className={`${getEvenementTypeColor(evenement.type)} text-white`}
                        >
                          {evenement.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {evenement.date.season}, {evenement.date.year} AUC
                      </p>
                      <p className="text-sm mb-3">{evenement.description}</p>
                      
                      {!evenement.résolu && evenement.actions && evenement.actions.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-sm font-medium mb-2">Actions possibles:</h4>
                          <div className="flex flex-wrap gap-2">
                            {evenement.actions.map(action => (
                              <Button 
                                key={action.id}
                                variant="outline" 
                                size="sm"
                                className="text-xs"
                              >
                                {action.description} ({action.coût} as)
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {!evenement.résolu && (
                      <ActionButton
                        variant="outline"
                        size="sm"
                        icon={<CheckCircle className="h-4 w-4" />}
                        label="Résoudre"
                        onClick={() => handleResolveEvenement(evenement.id)}
                      />
                    )}
                    
                    {evenement.résolu && (
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        Résolu
                      </Badge>
                    )}
                  </div>
                  
                  {Object.entries(evenement.impact || {}).length > 0 && (
                    <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                      <span className="font-medium">Impact:</span>{" "}
                      {Object.entries(evenement.impact || {}).map(([key, value]) => (
                        <span key={key} className="mr-3">
                          {key}: {value > 0 ? `+${value}` : value}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
