
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, CalendarDays, ArrowRight } from 'lucide-react';
import { Loi } from '../../types/lois';
import { formatSeasonDisplay } from '@/utils/timeSystem';

export interface LoisListProps {
  lois: Loi[];
  onViewLoi: (id: string) => void;
}

export const LoisList: React.FC<LoisListProps> = ({ lois, onViewLoi }) => {
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'proposée': return 'bg-blue-100 text-blue-800';
      case 'adoptée': return 'bg-green-100 text-green-800';
      case 'rejetée': return 'bg-red-100 text-red-800';
      case 'Promulguée': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatGameDate = (date: { year: number; season: string }) => {
    return `An ${date.year}, ${formatSeasonDisplay(date.season)}`;
  };
  
  if (lois.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Aucune loi ne correspond à vos critères de recherche.
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {lois.map((loi) => (
        <Card key={loi.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{loi.titre}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {loi.proposeur}
                  </span>
                  <span className="flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    {formatGameDate(loi.dateProposition)}
                  </span>
                </CardDescription>
              </div>
              
              <Badge variant="outline" className={getStatutColor(loi.état)}>
                {loi.état}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {loi.description}
            </p>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center"
                onClick={() => onViewLoi(loi.id)}
              >
                Voir détails
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
