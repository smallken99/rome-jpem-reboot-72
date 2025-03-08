
import React, { useState } from 'react';
import { Evenement, EvenementType } from '../types/maitreJeuTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Calendar, ArrowDown, Info, Check } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';

interface EvenementsListProps {
  evenements: Evenement[];
  onResolve: (id: string, optionId: string) => void;
}

export const EvenementsList: React.FC<EvenementsListProps> = ({ 
  evenements, 
  onResolve 
}) => {
  const [detailsOpen, setDetailsOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<EvenementType | null>(null);
  
  // Obtenez les événements filtrés et triés par importance et non résolus en premier
  const filteredEvents = evenements
    .filter(evt => !filter || evt.type === filter)
    .sort((a, b) => {
      // Les non résolus d'abord
      if (a.resolved !== b.resolved) {
        return a.resolved ? 1 : -1;
      }
      
      // Ensuite par importance
      if (a.importance !== b.importance) {
        if (a.importance === 'majeure') return -1;
        if (b.importance === 'majeure') return 1;
        if (a.importance === 'normale') return -1;
        if (b.importance === 'normale') return 1;
      }
      
      // Enfin par date (les plus récents d'abord)
      return b.date.year - a.date.year;
    });
  
  const handleResolve = (eventId: string, optionId: string) => {
    onResolve(eventId, optionId);
    setDetailsOpen(null);
  };
  
  const getEventTypeColor = (type: EvenementType) => {
    switch(type) {
      case 'CRISE': return 'bg-red-100 text-red-800 border-red-200';
      case 'GUERRE': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'POLITIQUE': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'RELIGION': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ECONOMIQUE': return 'bg-green-100 text-green-800 border-green-200';
      case 'DIPLOMATIQUE': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'SOCIAL': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={filter === null ? "default" : "outline"} 
          onClick={() => setFilter(null)}
          className="text-xs h-8"
        >
          Tous
        </Button>
        {Object.values(['POLITIQUE', 'GUERRE', 'CRISE', 'RELIGION', 'ECONOMIQUE', 'DIPLOMATIQUE', 'SOCIAL'] as const).map((type) => (
          <Button 
            key={type}
            variant={filter === type ? "default" : "outline"}
            onClick={() => setFilter(type)}
            className="text-xs h-8"
          >
            {type}
          </Button>
        ))}
      </div>
      
      {filteredEvents.length === 0 ? (
        <div className="text-center p-6 text-gray-500">
          Aucun événement ne correspond à vos critères de recherche.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map(evenement => (
            <Card key={evenement.id} className={`overflow-hidden ${evenement.resolved ? 'opacity-70' : ''}`}>
              <CardContent className="p-0">
                <div className={`p-4 ${evenement.importance === 'majeure' ? 'bg-red-50' : evenement.importance === 'normale' ? 'bg-blue-50' : 'bg-amber-50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{evenement.titre}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getEventTypeColor(evenement.type)}>
                          {evenement.type}
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(evenement.date.year, evenement.date.season, evenement.date.day)}
                        </span>
                      </div>
                    </div>
                    
                    {evenement.resolved ? (
                      <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Résolu
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        En attente
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-700">{evenement.description}</p>
                  
                  {evenement.options && evenement.options.length > 0 && !evenement.resolved && (
                    <div className="mt-4 pt-3 border-t">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-1 text-blue-500" />
                        Options disponibles:
                      </h4>
                      <div className="space-y-2">
                        {evenement.options.map(option => (
                          <Dialog key={option.id}>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="text-left justify-start w-full">
                                {option.texte}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmer cette décision</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                <p className="mb-4">{option.texte}</p>
                                <h4 className="font-medium mb-2">Effets potentiels:</h4>
                                <div className="space-y-1">
                                  {Object.entries(option.effets).map(([key, value]) => {
                                    if (typeof value === 'number' && value !== 0) {
                                      return (
                                        <div key={key} className="flex items-center gap-2">
                                          <span className="text-gray-600">{key}:</span>
                                          <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                                            {value > 0 ? `+${value}` : value}
                                          </span>
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setDetailsOpen(null)}>
                                  Annuler
                                </Button>
                                <Button onClick={() => handleResolve(evenement.id, option.id)}>
                                  Confirmer
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {evenement.resolved && (
                    <div className="mt-4 pt-3 border-t border-green-200">
                      <p className="text-green-600 font-medium">Cet événement a été résolu.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
