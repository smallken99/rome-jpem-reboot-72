
import React from 'react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Edit, Trash, Star, CalendarDays } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';

interface HistoireTimelineProps {
  onEdit: (id: string) => void;
}

export const HistoireTimeline: React.FC<HistoireTimelineProps> = ({ onEdit }) => {
  const { histoireEntries, deleteHistoireEntry } = useMaitreJeu();
  const { toast } = useToast();
  
  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement historique ?')) {
      deleteHistoireEntry(id);
      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé de l'histoire.",
      });
    }
  };
  
  // Trier les entrées par date
  const sortedEntries = [...histoireEntries].sort((a, b) => {
    // D'abord par année (décroissant)
    if (b.date.year !== a.date.year) {
      return b.date.year - a.date.year;
    }
    
    // Ensuite par saison
    const seasonOrder = { 'Ver': 0, 'Aestas': 1, 'Autumnus': 2, 'Hiems': 3 };
    return seasonOrder[b.date.season] - seasonOrder[a.date.season];
  });
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-5 md:left-1/2 w-0.5 bg-gray-200"></div>
      
      <div className="space-y-10">
        {sortedEntries.map((entry, index) => (
          <div key={entry.id} className="relative">
            <div className={`flex items-center ${index % 2 === 0 ? 'flex-row md:flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-10 text-right' : 'md:pl-10'}`}>
                <Card className={`border-l-4 ${entry.type === 'MAJEUR' ? 'border-l-amber-500' : 'border-l-blue-500'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {entry.type === 'MAJEUR' && (
                            <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />
                          )}
                          <h3 className="font-medium text-lg">{entry.title}</h3>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          <span>{entry.date.season}, {entry.date.year} AUC</span>
                        </div>
                        
                        <p className="text-sm mt-2">{entry.description}</p>
                        
                        {entry.personnagesImpliqués && entry.personnagesImpliqués.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground mb-1">Personnages impliqués:</p>
                            <div className="flex flex-wrap gap-1">
                              {entry.personnagesImpliqués.map((personnage) => (
                                <Badge key={personnage} variant="outline" className="text-xs">
                                  {personnage}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-1 ml-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <ActionButton
                                variant="ghost"
                                size="icon"
                                icon={<Edit className="h-4 w-4" />}
                                label=""
                                onClick={() => onEdit(entry.id)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Modifier</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <ActionButton
                                variant="ghost"
                                size="icon"
                                icon={<Trash className="h-4 w-4" />}
                                label=""
                                onClick={() => handleDelete(entry.id)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Supprimer</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="absolute z-10 left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-white shadow">
                <div className={`w-6 h-6 rounded-full ${entry.type === 'MAJEUR' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
