
import React from 'react';
import { Loi } from '../../types/lois';
import { Season } from '../../types/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, FileCheck, FileX } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LoiDetailProps {
  loi: Loi;
  onEdit: (loi: Loi) => void;
  onPromulgate?: () => void;
  onReject?: () => void;
}

export const LoiDetail: React.FC<LoiDetailProps> = ({ 
  loi, 
  onEdit, 
  onPromulgate, 
  onReject 
}) => {
  // Formatage de la saison en français
  const formatSeason = (season: Season): string => {
    switch(season) {
      case "SPRING": return "Printemps";
      case "SUMMER": return "Été";
      case "AUTUMN": return "Automne";
      case "WINTER": return "Hiver";
    }
  };
  
  // Calcul du total des votes
  const totalVotes = loi.votesPositifs + loi.votesNégatifs + loi.votesAbstention;
  const positifPercent = totalVotes > 0 ? (loi.votesPositifs / totalVotes) * 100 : 0;
  const negatifPercent = totalVotes > 0 ? (loi.votesNégatifs / totalVotes) * 100 : 0;
  const abstentionPercent = totalVotes > 0 ? (loi.votesAbstention / totalVotes) * 100 : 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{loi.titre}</CardTitle>
            <CardDescription>
              Proposée par {loi.proposeur} - {formatSeason(loi.date.season)} {Math.abs(loi.date.year)} {loi.date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}
            </CardDescription>
          </div>
          <Badge variant={
            loi.état === "Promulguée" ? "default" : 
            loi.état === "Rejetée" ? "destructive" : 
            "secondary"
          }>
            {loi.état}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-sm">{loi.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Détails</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Catégorie:</span>
                <span>{loi.catégorie}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Importance:</span>
                <span className="capitalize">{loi.importance}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Effets</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(loi.effets).map(([nom, valeur]) => (
                <div key={nom} className="flex justify-between">
                  <span className="text-muted-foreground capitalize">{nom}:</span>
                  <span className={valeur > 0 ? "text-green-600" : valeur < 0 ? "text-red-600" : ""}>
                    {valeur > 0 ? `+${valeur}` : valeur}
                  </span>
                </div>
              ))}
              {Object.keys(loi.effets).length === 0 && (
                <div className="text-muted-foreground">Aucun effet spécifié</div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Votes</h3>
          {totalVotes > 0 ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Pour ({loi.votesPositifs})</span>
                  <span>{positifPercent.toFixed(1)}%</span>
                </div>
                <Progress value={positifPercent} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Contre ({loi.votesNégatifs})</span>
                  <span>{negatifPercent.toFixed(1)}%</span>
                </div>
                <Progress value={negatifPercent} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Abstention ({loi.votesAbstention})</span>
                  <span>{abstentionPercent.toFixed(1)}%</span>
                </div>
                <Progress value={abstentionPercent} className="h-2 bg-gray-200" indicatorClassName="bg-gray-400" />
              </div>
              
              <div className="flex justify-between text-sm font-medium">
                <span>Total des votes:</span>
                <span>{totalVotes}</span>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">Aucun vote enregistré</div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onEdit(loi)}>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          
          {loi.état === "En délibération" && (
            <>
              {onPromulgate && (
                <Button variant="default" onClick={onPromulgate}>
                  <FileCheck className="h-4 w-4 mr-2" />
                  Promulguer
                </Button>
              )}
              
              {onReject && (
                <Button variant="destructive" onClick={onReject}>
                  <FileX className="h-4 w-4 mr-2" />
                  Rejeter
                </Button>
              )}
            </>
          )}
          
          {loi.état === "Promulguée" && (
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Abroger
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
