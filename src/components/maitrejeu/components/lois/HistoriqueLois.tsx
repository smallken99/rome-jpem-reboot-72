
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loi } from '../../types/lois';
import { Season } from '../../types/common';
import { CheckCircle, XCircle, AlertCircle, ScrollText } from 'lucide-react';

interface HistoireLoiProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: Season) => string;
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
      {lois.map(loi => (
        <div key={loi.id} className="border-l-4 pl-4 pb-6 relative">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-2"></div>
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-lg">{loi.titre}</h3>
              <p className="text-sm text-muted-foreground">
                {formatSeason(loi.date.season)} {Math.abs(loi.date.year)} {loi.date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}
              </p>
            </div>
            <div className="self-start">
              <Badge className={`flex items-center gap-1 ${getStatusClass(loi.état)}`}>
                {getStatusIcon(loi.état)}
                <span>{loi.état}</span>
              </Badge>
            </div>
          </div>
          <p className="text-sm mt-1">{loi.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-secondary/30">
              {loi.catégorie}
            </Badge>
            <Badge variant="outline" className="bg-secondary/30">
              Importance: {loi.importance}
            </Badge>
            <Badge variant="outline" className="bg-secondary/30 flex items-center gap-1">
              <span>Votes:</span>
              <span className="text-green-600 font-medium">{loi.votesPositifs}</span>
              <span>/</span>
              <span className="text-red-600 font-medium">{loi.votesNégatifs}</span>
              <span>/</span>
              <span className="text-gray-500 font-medium">{loi.votesAbstention}</span>
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => onViewLoi(loi)}>
            Voir les détails
          </Button>
        </div>
      ))}
      {lois.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          Aucune loi dans l'historique
        </div>
      )}
    </div>
  );
};
