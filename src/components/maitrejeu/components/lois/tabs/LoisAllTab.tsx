
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Scroll, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface LoisAllTabProps {
  lois: Loi[];
  onViewLoi: (loi?: Loi) => void;
  formatSeason?: (season: string) => string;
}

export const LoisAllTab: React.FC<LoisAllTabProps> = ({ 
  lois, 
  onViewLoi,
  formatSeason = (s) => s
}) => {
  // Fonction pour obtenir le statut visuel de la loi
  const getStatusDisplay = (loi: Loi) => {
    switch(loi.statut) {
      case 'active':
        return { 
          label: 'Active', 
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />, 
          className: 'bg-green-100 text-green-800 border-green-200' 
        };
      case 'rejetée':
        return { 
          label: 'Rejetée', 
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />, 
          className: 'bg-red-100 text-red-800 border-red-200' 
        };
      case 'en_vote':
        return { 
          label: 'En vote', 
          icon: <Clock className="h-3.5 w-3.5 mr-1" />, 
          className: 'bg-blue-100 text-blue-800 border-blue-200' 
        };
      default:
        return { 
          label: 'Proposée', 
          icon: <Scroll className="h-3.5 w-3.5 mr-1" />, 
          className: 'bg-amber-100 text-amber-800 border-amber-200' 
        };
    }
  };

  return (
    <div className="space-y-4">
      {lois.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune loi
        </div>
      ) : (
        lois.map(loi => {
          const statusDisplay = getStatusDisplay(loi);
          
          return (
            <Card key={loi.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{loi.nom}</h3>
                      <p className="text-sm text-muted-foreground">
                        Proposée par {loi.auteur || 'Inconnu'}, 
                        {loi.dateProposition && (
                          <> il y a {formatDistanceToNow(new Date(loi.dateProposition), { locale: fr })}</>
                        )}
                      </p>
                    </div>
                    <Badge className={`flex items-center ${statusDisplay.className}`}>
                      {statusDisplay.icon}
                      {statusDisplay.label}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm line-clamp-2">{loi.description}</p>
                  {loi.saison && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Saison d'application: {formatSeason(loi.saison)} {loi.année}
                    </p>
                  )}
                </div>
                <div className="px-4 py-2 bg-muted/10 border-t flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => onViewLoi(loi)}>
                    Détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};
