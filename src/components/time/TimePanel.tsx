
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock } from 'lucide-react';

interface TimePanelProps {
  year?: number;
  season?: 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | string;
  phase?: string;
  showTitle?: boolean;
  minimal?: boolean; // Ajout de la propriété minimal
}

// Fonction pour formater la saison en français
const formatSeason = (season?: string): string => {
  if (!season) return 'Printemps';
  
  switch (season.toUpperCase()) {
    case 'SPRING':
      return 'Printemps';
    case 'SUMMER':
      return 'Été';
    case 'AUTUMN':
      return 'Automne';
    case 'WINTER':
      return 'Hiver';
    default:
      return season;
  }
};

// Fonction pour formater la phase (avec vérification de nullité)
const formatPhase = (phase?: string): string => {
  if (!phase) return 'Politique';
  
  switch (phase.toLowerCase()) {
    case 'political':
      return 'Politique';
    case 'economy':
      return 'Économie';
    case 'military':
      return 'Militaire';
    case 'religious':
      return 'Religieux';
    default:
      return phase;
  }
};

// Obtenez l'année et la saison actuelles (ou par défaut si non fournies)
const getCurrentTimeData = () => {
  return {
    year: new Date().getFullYear() - 1800, // Simulation d'une année romaine
    season: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'][Math.floor(new Date().getMonth() / 3)],
    phase: 'political'
  };
};

export const TimePanel: React.FC<TimePanelProps> = ({
  year,
  season,
  phase,
  showTitle = true,
  minimal = false // Définition d'une valeur par défaut
}) => {
  // Utiliser les données par défaut si aucune n'est fournie
  const timeData = getCurrentTimeData();
  const displayYear = year || timeData.year;
  const displaySeason = season || timeData.season;
  const displayPhase = phase || timeData.phase;
  
  // Version minimale pour l'affichage compact dans la sidebar
  if (minimal) {
    return (
      <div className="text-xs flex flex-col items-center">
        <div className="flex items-center gap-1">
          <CalendarDays className="h-3 w-3 text-muted-foreground" />
          <span>An {displayYear} AUC</span>
        </div>
        <Badge variant="outline" className="mt-1 text-xs">
          {formatSeason(displaySeason)}
        </Badge>
      </div>
    );
  }
  
  // Affichage standard
  return (
    <Card className="timeline-card">
      {showTitle && (
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Calendrier Républicain</CardTitle>
        </CardHeader>
      )}
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>An {displayYear} AUC</span>
          </div>
          
          <Badge variant="outline" className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatSeason(displaySeason)}
          </Badge>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          <div className="flex justify-between items-center">
            <span>Phase actuelle:</span>
            <Badge variant="secondary" className="text-xs">
              {formatPhase(displayPhase)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimePanel;
