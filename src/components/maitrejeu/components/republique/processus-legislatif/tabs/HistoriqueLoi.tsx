
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';

interface HistoriqueLoiProps {
  lois: Loi[];
}

export const HistoriqueLoi: React.FC<HistoriqueLoiProps> = ({ lois }) => {
  const [selectedYear, setSelectedYear] = React.useState<string>("all");
  
  // Extraire les années uniques des lois
  const years = Array.from(
    new Set(
      lois
        .map(loi => {
          if (typeof loi.date === 'object' && 'year' in loi.date) {
            return loi.date.year.toString();
          }
          return null;
        })
        .filter(Boolean) as string[]
    )
  ).sort((a, b) => parseInt(b) - parseInt(a));

  // Filtrer les lois par année sélectionnée
  const filteredLois = selectedYear === "all"
    ? lois
    : lois.filter(loi => {
        if (typeof loi.date === 'object' && 'year' in loi.date) {
          return loi.date.year.toString() === selectedYear;
        }
        return false;
      });

  // Trier les lois par date (plus récent d'abord)
  const sortedLois = [...filteredLois].sort((a, b) => {
    const aYear = typeof a.date === 'object' && 'year' in a.date ? a.date.year : 0;
    const bYear = typeof b.date === 'object' && 'year' in b.date ? b.date.year : 0;
    
    if (aYear !== bYear) return bYear - aYear;
    
    // Si même année, comparer par état
    const stateOrder = {
      'En vigueur': 1,
      'Promulguée': 2,
      'Adoptée': 3,
      'En discussion': 4,
      'Proposée': 5,
      'Rejetée': 6,
      'Abrogée': 7
    };
    
    const aState = a.état || a.status || '';
    const bState = b.état || b.status || '';
    
    return (stateOrder[aState as keyof typeof stateOrder] || 99) - 
           (stateOrder[bState as keyof typeof stateOrder] || 99);
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une année" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Toutes les années</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year}>
                  {year} AUC
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {sortedLois.map(loi => (
          <Card key={loi.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{loi.titre || loi.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Proposée par {loi.proposeur || loi.proposedBy || loi.auteur} - {formatGameDateForRender(loi.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {loi.état || loi.status}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {loi.catégorie || loi.category}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm">{loi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedLois.length === 0 && (
          <div className="text-center py-8 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">Aucune loi pour cette période</p>
          </div>
        )}
      </div>
    </div>
  );
};
