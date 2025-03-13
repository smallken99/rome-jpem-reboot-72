
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loi } from '../../types';
import { formatGameDate } from '@/utils/timeSystem';

export interface LoiTimelineProps {
  lois: Loi[];
  onSelectLoi?: (id: string) => void;
}

export const LoiTimeline: React.FC<LoiTimelineProps> = ({ lois, onSelectLoi }) => {
  // On trie les lois par date de proposition (des plus récentes aux plus anciennes)
  const sortedLois = [...lois].sort((a, b) => {
    const dateA = a.dateProposition?.year || 0;
    const dateB = b.dateProposition?.year || 0;
    
    if (dateA !== dateB) return dateB - dateA;
    
    // Si les années sont identiques, comparer les saisons
    const seasonOrder: Record<string, number> = { 'Ver': 0, 'Aestas': 1, 'Autumnus': 2, 'Hiems': 3 };
    const seasonA = a.dateProposition?.season ? seasonOrder[a.dateProposition.season] : 0;
    const seasonB = b.dateProposition?.season ? seasonOrder[b.dateProposition.season] : 0;
    
    return seasonB - seasonA;
  });
  
  // Regrouper les lois par année
  const loisParAnnee: Record<number, Loi[]> = {};
  sortedLois.forEach(loi => {
    if (loi.dateProposition?.year) {
      if (!loisParAnnee[loi.dateProposition.year]) {
        loisParAnnee[loi.dateProposition.year] = [];
      }
      loisParAnnee[loi.dateProposition.year].push(loi);
    }
  });
  
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'proposée': return 'bg-blue-100 text-blue-800';
      case 'adoptée': return 'bg-green-100 text-green-800';
      case 'rejetée': return 'bg-red-100 text-red-800';
      case 'Promulguée': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (Object.keys(loisParAnnee).length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Aucune loi n'a encore été proposée.
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chronologie des Lois</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(loisParAnnee).map(([annee, loisAnnee]) => (
            <div key={annee} className="space-y-4">
              <h3 className="text-lg font-semibold sticky top-0 bg-white py-2">
                Année {annee}
              </h3>
              
              <div className="border-l-2 border-muted space-y-4 pl-4 ml-2">
                {loisAnnee.map(loi => (
                  <div 
                    key={loi.id} 
                    className="relative pb-1 cursor-pointer hover:bg-muted/30 p-2 rounded-md -ml-2 transition-colors"
                    onClick={() => onSelectLoi && onSelectLoi(loi.id)}
                  >
                    <div className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-gray-800" />
                    
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          {formatGameDate(loi.dateProposition)}
                        </div>
                        <h4 className="text-base font-medium">{loi.titre}</h4>
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={`${getStatutColor(loi.état)} whitespace-nowrap`}
                      >
                        {loi.état}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {loi.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
