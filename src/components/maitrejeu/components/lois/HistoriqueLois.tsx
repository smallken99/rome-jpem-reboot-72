
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loi } from '../../types/lois';
import { CheckCircle, XCircle, AlertCircle, ScrollText } from 'lucide-react';
import { Season } from '../../types/common';
import { ensureGameDate } from './utils/dateHelpers';

interface HistoireLoiProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: string | Season) => string;
}

export const HistoriqueLois: React.FC<HistoireLoiProps> = ({ lois, onViewLoi, formatSeason }) => {
  // Fonction pour obtenir l'icône correspondant à l'état de la loi
  const getStatusIcon = (status: Loi['état']) => {
    switch (status) {
      case 'Promulguée':
      case 'adoptée':
        return <CheckCircle className="h-4 w-4" />;
      case 'Rejetée':
        return <XCircle className="h-4 w-4" />;
      case 'En délibération':
      case 'proposée':
        return <ScrollText className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Fonction pour obtenir la classe de couleur correspondant à l'état de la loi
  const getStatusClass = (status: Loi['état']) => {
    switch (status) {
      case 'Promulguée':
      case 'adoptée':
        return "bg-green-100 text-green-800 border-green-200";
      case 'Rejetée':
        return "bg-red-100 text-red-800 border-red-200";
      case 'En délibération':
      case 'proposée':
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {lois.map((loi) => {
        // Safely get date information
        const gameDate = ensureGameDate(loi.date);
        
        return (
          <div
            key={loi.id}
            className="p-4 border rounded-md hover:bg-muted/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium">{loi.titre || loi.title}</h3>
                <p className="text-sm text-muted-foreground">{loi.description.substring(0, 100)}...</p>
              </div>
              <Badge className={getStatusClass(loi.état)}>
                {getStatusIcon(loi.état)}
                <span className="ml-1">{loi.état}</span>
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3 text-sm">
              <span className="text-muted-foreground">Proposé par: {loi.proposeur}</span>
              <span>•</span>
              <span className="text-muted-foreground">
                {formatSeason(gameDate.season)} de l'an {gameDate.year} {gameDate.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => onViewLoi(loi)}
            >
              Voir les détails
            </Button>
          </div>
        );
      })}
    </div>
  );
};
