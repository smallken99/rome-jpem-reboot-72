
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Loi } from '@/components/maitrejeu/types/lois';
import { gameDateToStringOrDate } from '../utils/dateConverter';
import { formatAnyGameDate } from '../utils/dateHelpers';

interface LoisProposeesTabProps {
  lois: Loi[];
  onViewLoi: (loi?: Loi) => void;
  onVoterPour?: (loiId: string) => void;
  onVoterContre?: (loiId: string) => void;
  onVoterAbstention?: (loiId: string) => void;
  formatSeason?: (season: string) => string;
}

export const LoisProposeesTab: React.FC<LoisProposeesTabProps> = ({
  lois,
  onViewLoi,
  onVoterPour,
  onVoterContre,
  onVoterAbstention,
  formatSeason = (s) => s
}) => {
  return (
    <div className="space-y-4">
      {lois.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune loi proposée à afficher
        </div>
      ) : (
        lois.map((loi) => (
          <Card key={loi.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-4 md:p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <h3 className="text-lg font-semibold">{loi.titre}</h3>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 md:self-start">
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
                      <span className="text-muted-foreground">Importance:</span> {loi.importance}
                    </div>
                  </div>
                </div>

                <div className="p-4 md:w-48 bg-muted flex flex-col justify-between items-stretch gap-2">
                  <Button onClick={() => onViewLoi(loi)} variant="outline" size="sm" className="w-full">
                    Voir détails
                  </Button>
                  
                  {onVoterPour && onVoterContre && (
                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={() => onVoterPour(loi.id)} 
                        variant="outline" 
                        size="sm" 
                        className="w-full bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Pour
                      </Button>
                      <Button 
                        onClick={() => onVoterContre(loi.id)} 
                        variant="outline" 
                        size="sm" 
                        className="w-full bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Contre
                      </Button>
                      {onVoterAbstention && (
                        <Button 
                          onClick={() => onVoterAbstention(loi.id)} 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                        >
                          Abstention
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
