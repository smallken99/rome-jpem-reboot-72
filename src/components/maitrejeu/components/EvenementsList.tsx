
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ArrowRight, CalendarIcon, CheckCircle2 } from 'lucide-react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Evenement, EvenementAction, EvenementType } from '../types/evenements';

interface EvenementsListProps {
  evenements: Evenement[];
  onResolve?: (evenementId: string, optionId: string) => void;
  onView?: (evenementId: string) => void;
  showResolved?: boolean;
}

export const EvenementsList: React.FC<EvenementsListProps> = ({ 
  evenements, 
  onResolve,
  onView,
  showResolved = false 
}) => {
  // Filtrer les événements en fonction de leur statut et de l'option showResolved
  const filteredEvenements = evenements.filter(e => showResolved ? true : !e.resolved);
  
  // Obtenir la couleur appropriée pour le badge de type
  const getTypeColor = (type: EvenementType) => {
    switch (type) {
      case 'POLITIQUE':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ECONOMIQUE':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'GUERRE':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'RELIGION':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'DIPLOMATIQUE':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'SOCIAL':
        return 'bg-pink-100 text-pink-800 border-pink-300';
      case 'CRISE':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  // Obtenir l'icône pour le type d'événement
  const getTypeIcon = (type: EvenementType) => {
    return <AlertCircle className="h-4 w-4" />;
  };
  
  // Obtenir la couleur pour le badge d'importance
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'majeure':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'normale':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'mineure':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className="space-y-4">
      {filteredEvenements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun événement {!showResolved && 'non résolu'} à afficher.
        </div>
      )}
      
      {filteredEvenements.map((evenement) => (
        <Card key={evenement.id} className={evenement.resolved ? 'bg-gray-50/50' : ''}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-medium">
                {evenement.titre}
              </CardTitle>
              
              <div className="flex space-x-2">
                <Badge className={getTypeColor(evenement.type)}>
                  <span className="flex items-center gap-1">
                    {getTypeIcon(evenement.type)}
                    {evenement.type}
                  </span>
                </Badge>
                
                <Badge className={getImportanceColor(evenement.importance)}>
                  {evenement.importance}
                </Badge>
                
                {evenement.resolved && (
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Résolu
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-500 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              An {evenement.date.year} - {evenement.date.season}
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-gray-700">{evenement.description}</p>
            
            {!evenement.resolved && onResolve && (
              <div className="mt-4 space-y-3">
                <h4 className="font-medium text-sm">Options:</h4>
                
                {evenement.options.map((option) => (
                  <div key={option.id} className="p-3 border rounded-md hover:bg-gray-50">
                    <p className="font-medium text-sm">{option.texte}</p>
                    
                    <div className="flex justify-end mt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onResolve(evenement.id, option.id)}
                      >
                        Choisir cette option
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {evenement.resolved && evenement.selectedOption && (
              <div className="mt-4 p-3 border rounded-md bg-green-50/50">
                <h4 className="font-medium text-sm">Option choisie:</h4>
                <p className="text-sm">
                  {evenement.options.find(o => o.id === evenement.selectedOption)?.texte || 'Option inconnue'}
                </p>
              </div>
            )}
          </CardContent>
          
          {onView && (
            <CardFooter>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto"
                onClick={() => onView(evenement.id)}
              >
                <span>Détails</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};
