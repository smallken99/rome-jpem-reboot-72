
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loi } from '@/components/maitrejeu/types/lois';
import { gameDateToStringOrDate } from '../utils/dateConverter';
import { formatAnyGameDate } from '../utils/dateHelpers';

interface LoisRejeteesTabProps {
  lois: Loi[];
  onViewLoi: (loi?: Loi) => void;
  formatSeason?: (season: string) => string;
}

export const LoisRejeteesTab: React.FC<LoisRejeteesTabProps> = ({
  lois,
  onViewLoi,
  formatSeason = (s) => s
}) => {
  return (
    <div className="space-y-4">
      {lois.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune loi rejetée à afficher
        </div>
      ) : (
        lois.map((loi) => (
          <Card key={loi.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-4 md:p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <h3 className="text-lg font-semibold">{loi.titre}</h3>
                    <Badge variant="outline" className="bg-red-100 text-red-800 md:self-start">
                      {loi.état}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {loi.description?.substring(0, 150)}
                    {loi.description?.length > 150 ? '...' : ''}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Proposé par:</span> {loi.proposeur}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span> {formatAnyGameDate(loi.date)}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Catégorie:</span> {loi.catégorie || loi.type}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Votes:</span> {loi.votesPositifs}-{loi.votesNégatifs}-{loi.votesAbstention}
                    </div>
                  </div>
                </div>

                <div className="p-4 md:w-48 bg-muted flex flex-row md:flex-col justify-between items-center md:items-stretch gap-2">
                  <Button onClick={() => onViewLoi(loi)} variant="outline" size="sm" className="w-full">
                    Voir détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
