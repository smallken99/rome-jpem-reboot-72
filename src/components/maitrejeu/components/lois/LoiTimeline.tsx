
import React from 'react';
import { Loi } from '../../types/lois';
import { Season } from '../../types/common';

interface LoiTimelineProps {
  lois: Loi[];
  onSelectLoi: (loi: Loi) => void;
}

export const LoiTimeline: React.FC<LoiTimelineProps> = ({ lois, onSelectLoi }) => {
  // Trier les lois par date (de la plus récente à la plus ancienne)
  const sortedLois = [...lois].sort((a, b) => {
    // Comparer d'abord les années
    if (a.date.year !== b.date.year) {
      return b.date.year - a.date.year;
    }
    
    // Si les années sont identiques, comparer les saisons
    const seasonOrder: Record<Season, number> = {
      "WINTER": 0,
      "AUTUMN": 1,
      "SUMMER": 2,
      "SPRING": 3
    };
    
    return seasonOrder[b.date.season] - seasonOrder[a.date.season];
  });
  
  // Regrouper les lois par année pour l'affichage dans la timeline
  const loisParAnnee: Record<number, Loi[]> = {};
  sortedLois.forEach(loi => {
    if (!loisParAnnee[loi.date.year]) {
      loisParAnnee[loi.date.year] = [];
    }
    loisParAnnee[loi.date.year].push(loi);
  });
  
  // Fonction pour formater la saison en français
  const formatSeason = (season: Season): string => {
    switch(season) {
      case "SPRING": return "Printemps";
      case "SUMMER": return "Été";
      case "AUTUMN": return "Automne";
      case "WINTER": return "Hiver";
    }
  };
  
  return (
    <div className="space-y-8">
      {Object.entries(loisParAnnee)
        .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
        .map(([year, loisAnnee]) => (
          <div key={year} className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">
              Année {Math.abs(parseInt(year))} {parseInt(year) < 0 ? 'av. J.-C.' : 'ap. J.-C.'}
            </h3>
            <div className="space-y-4 pl-4 border-l-2 border-gray-200">
              {loisAnnee.map(loi => (
                <div 
                  key={loi.id} 
                  className="relative pl-6 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => onSelectLoi(loi)}
                >
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-3 border-2 border-white bg-primary"></div>
                  <div className="flex justify-between">
                    <h4 className="font-medium">{loi.titre}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      loi.état === "Promulguée" ? "bg-green-100 text-green-800" : 
                      loi.état === "Rejetée" ? "bg-red-100 text-red-800" : 
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {loi.état}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatSeason(loi.date.season)}</p>
                  <p className="text-sm mt-1">{loi.description.substring(0, 100)}...</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {loi.catégorie}
                    </span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                      Proposeur: {loi.proposeur.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
