
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Shield, 
  BookOpen, 
  Users, 
  CreditCard, 
  Briefcase,
  Landmark,
  MoveRight,
  CheckCircle
} from 'lucide-react';
import { EvenementsListProps, EvenementType } from '../types/maitreJeuTypes';

export const EvenementsList: React.FC<EvenementsListProps> = ({ evenements, onResolve, filteredType }) => {
  // Helper to get season name in French
  const getSeasonName = (season: string): string => {
    switch (season) {
      case 'SPRING': return 'Printemps';
      case 'SUMMER': return 'Été';
      case 'AUTUMN': return 'Automne';
      case 'WINTER': return 'Hiver';
      default: return season;
    }
  };
  
  // Helper to get event type icon and color
  const getEventTypeInfo = (type: EvenementType) => {
    switch (type) {
      case 'CRISE':
        return { 
          icon: <AlertTriangle className="h-5 w-5" />, 
          color: 'bg-red-100 text-red-800 border-red-200'
        };
      case 'GUERRE':
        return { 
          icon: <Shield className="h-5 w-5" />, 
          color: 'bg-orange-100 text-orange-800 border-orange-200'
        };
      case 'POLITIQUE':
        return { 
          icon: <BookOpen className="h-5 w-5" />, 
          color: 'bg-purple-100 text-purple-800 border-purple-200'
        };
      case 'RELIGION':
        return { 
          icon: <Landmark className="h-5 w-5" />, 
          color: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'ÉCONOMIQUE':
        return { 
          icon: <CreditCard className="h-5 w-5" />, 
          color: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'DIPLOMATIQUE':
        return { 
          icon: <Briefcase className="h-5 w-5" />, 
          color: 'bg-teal-100 text-teal-800 border-teal-200'
        };
      case 'SOCIAL':
        return { 
          icon: <Users className="h-5 w-5" />, 
          color: 'bg-amber-100 text-amber-800 border-amber-200'
        };
      default:
        return { 
          icon: <BookOpen className="h-5 w-5" />, 
          color: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };
  
  // Filter events based on selected type
  const filteredEvents = filteredType === 'ALL' 
    ? evenements 
    : evenements.filter(event => event.type === filteredType);
  
  // Sort by unresolved first, then by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a.resolved !== b.resolved) {
      return a.resolved ? 1 : -1;
    }
    
    // Sort by year and season
    if (a.date.year !== b.date.year) {
      return b.date.year - a.date.year;
    }
    
    const seasonOrder = { 'WINTER': 0, 'AUTUMN': 1, 'SUMMER': 2, 'SPRING': 3 };
    return (seasonOrder[b.date.season] || 0) - (seasonOrder[a.date.season] || 0);
  });

  if (sortedEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun événement à afficher</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedEvents.map(event => {
        const { icon, color } = getEventTypeInfo(event.type);
        
        return (
          <Card 
            key={event.id} 
            className={`${event.resolved ? 'opacity-70' : ''}`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Badge className={color}>
                    <span className="flex items-center gap-1">
                      {icon}
                      {event.type}
                    </span>
                  </Badge>
                  
                  {event.resolved && (
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Résolu
                    </Badge>
                  )}
                  
                  {event.sourcePersistante && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                      Persistant
                    </Badge>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {`${event.date.year} - ${getSeasonName(event.date.season)}`}
                </div>
              </div>
              
              <CardTitle className="text-lg mt-2">{event.titre}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {event.description}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
                {event.impact.influence !== 0 && (
                  <div className={`px-2 py-1 rounded ${
                    event.impact.influence > 0 ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <span className="font-medium">Influence:</span> {event.impact.influence > 0 ? '+' : ''}{event.impact.influence}
                  </div>
                )}
                
                {event.impact.finance !== 0 && (
                  <div className={`px-2 py-1 rounded ${
                    event.impact.finance > 0 ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <span className="font-medium">Finances:</span> {event.impact.finance > 0 ? '+' : ''}{event.impact.finance}
                  </div>
                )}
                
                {event.impact.militaire !== 0 && (
                  <div className={`px-2 py-1 rounded ${
                    event.impact.militaire > 0 ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <span className="font-medium">Militaire:</span> {event.impact.militaire > 0 ? '+' : ''}{event.impact.militaire}
                  </div>
                )}
                
                {event.impact.religion !== 0 && (
                  <div className={`px-2 py-1 rounded ${
                    event.impact.religion > 0 ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <span className="font-medium">Religion:</span> {event.impact.religion > 0 ? '+' : ''}{event.impact.religion}
                  </div>
                )}
                
                {event.impact.economie !== 0 && (
                  <div className={`px-2 py-1 rounded ${
                    event.impact.economie > 0 ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <span className="font-medium">Économie:</span> {event.impact.economie > 0 ? '+' : ''}{event.impact.economie}
                  </div>
                )}
              </div>
              
              {!event.resolved && event.actions && event.actions.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-2">Actions possibles:</h4>
                  <div className="space-y-2">
                    {event.actions.map(action => (
                      <div key={action.id} className="bg-gray-50 p-3 rounded-md">
                        <div className="font-medium">{action.titre}</div>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                        <div className="mt-1.5 flex gap-4 text-xs">
                          {typeof action.coût === 'number' && (
                            <span className="text-amber-700">Coût: {action.coût}</span>
                          )}
                          {typeof action.risque === 'number' && (
                            <span className="text-red-700">Risque: {action.risque}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            
            {!event.resolved && (
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  className="ml-auto"
                  onClick={() => onResolve(event.id)}
                >
                  <MoveRight className="h-4 w-4 mr-2" />
                  Marquer comme résolu
                </Button>
              </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
};
