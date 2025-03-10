
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loi } from '../../types/lois';
import { Season } from '../../types/common';

interface HistoireLoiProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: Season) => string;
}

export const HistoriqueLois: React.FC<HistoireLoiProps> = ({ lois, onViewLoi, formatSeason }) => {
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
              <span className={`text-xs px-2 py-1 rounded-full ${
                loi.état === "Promulguée" ? "bg-green-100 text-green-800" : 
                loi.état === "Rejetée" ? "bg-red-100 text-red-800" : 
                "bg-yellow-100 text-yellow-800"
              }`}>
                {loi.état}
              </span>
            </div>
          </div>
          <p className="text-sm mt-1">{loi.description}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
              {loi.catégorie}
            </span>
            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
              Importance: {loi.importance}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => onViewLoi(loi)}>
            Voir les détails
          </Button>
        </div>
      ))}
    </div>
  );
};
