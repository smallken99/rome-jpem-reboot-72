
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';
import { Loi } from '../../types/lois';
import { Season } from '../../types/common';

interface LoisListProps {
  lois: Loi[];
  onCreateLoi?: () => void;
  onViewLoi: (loi: Loi) => void;
  onEditLoi?: (loi: Loi) => void;
  showAdditionalActions?: boolean;
  actionLabel?: string;
  primaryAction?: boolean;
  formatSeason?: (season: Season) => string;
}

export const LoisList: React.FC<LoisListProps> = ({ 
  lois, 
  onCreateLoi, 
  onViewLoi,
  onEditLoi,
  showAdditionalActions = false,
  actionLabel = "Modifier",
  primaryAction = false,
  formatSeason
}) => {
  return (
    <div className="space-y-4">
      {lois.map(loi => (
        <Card key={loi.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{loi.titre}</h3>
              <p className="text-sm text-muted-foreground">{loi.description}</p>
              {formatSeason && (
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                    {loi.catégorie}
                  </span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                    {`${formatSeason(loi.date.season)} ${Math.abs(loi.date.year)} ${loi.date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}`}
                  </span>
                </div>
              )}
              {!formatSeason && loi.proposeur && (
                <p className="text-sm mt-1">Proposeur: <span className="font-medium">{loi.proposeur}</span></p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {showAdditionalActions && (
                <Button 
                  variant={primaryAction ? "default" : "destructive"} 
                  size="sm"
                >
                  {actionLabel}
                </Button>
              )}
              {onEditLoi && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEditLoi(loi)}
                >
                  {showAdditionalActions ? "Détails" : "Modifier"}
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => onViewLoi(loi)}>
                <Book className="h-4 w-4 mr-2" />
                Voir détails
              </Button>
            </div>
          </div>
        </Card>
      ))}
      
      {onCreateLoi && (
        <Button variant="secondary" className="mt-4" onClick={onCreateLoi}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
          Proposer une nouvelle loi
        </Button>
      )}
    </div>
  );
};
