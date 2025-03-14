import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusIcon, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GameDate, formatSeasonDisplay } from '@/utils/timeSystem';
import { Loi } from '../../types/lois';

// Add the missing prop to the interface
export interface LoisListProps {
  lois: Loi[];
  onViewLoi: (loi?: Loi) => void;
  onCreateLoi?: () => void; // Add this prop
}

export const LoisList: React.FC<LoisListProps> = ({ lois, onViewLoi, onCreateLoi }) => {
  // Modify the formatDate function to handle GameDate or string
  const formatDate = (date: string | GameDate | undefined): string => {
    if (!date) return "-";
    
    // If it's already a GameDate object
    if (typeof date === 'object' && 'year' in date && 'season' in date) {
      return `${date.year} ${date.season}`;
    }
    
    // If it's a string, try to parse it as a GameDate
    try {
      if (typeof date === 'string') {
        const [year, season] = date.split(' ');
        return `${year} ${season}`;
      }
    } catch (error) {
      console.error("Failed to parse date:", date);
    }
    
    // Fallback
    return String(date);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Lois Actives</CardTitle>
        <CardDescription>Liste des lois en vigueur</CardDescription>
        <Button onClick={onCreateLoi}><PlusIcon className="mr-2 h-4 w-4" /> Ajouter une loi</Button>
      </CardHeader>
      <CardContent className="pl-2 pr-2">
        <ScrollArea className="h-[400px]">
          <div className="grid gap-4">
            {lois.map((loi) => (
              <Card key={loi.id}>
                <CardHeader>
                  <CardTitle className="text-base">{loi.titre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {loi.description.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <Badge variant="secondary">{loi.catégorie}</Badge>
                      <Badge variant="outline">{formatDate(loi.date)}</Badge>
                    </div>
                    <Button size="sm" onClick={() => onViewLoi(loi)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
