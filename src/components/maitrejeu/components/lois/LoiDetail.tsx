
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loi } from '../../types/lois';
import { ArrowLeft, PenSquare, Vote } from 'lucide-react';
import { LoiTimeline } from './LoiTimeline';
import { formatSeasonDisplay } from '@/utils/timeSystem';

export interface LoiDetailProps {
  loi: Loi;
  onClose?: () => void;
  onEdit?: () => void;
}

export const LoiDetail: React.FC<LoiDetailProps> = ({ 
  loi,
  onClose,
  onEdit
}) => {
  // Helper to get the background color for the law status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'adoptée':
      case 'promulguée':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejetée':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'en délibération':
      case 'proposée':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  // Helper to format vote counts
  const formatVotes = () => {
    const total = loi.votesPositifs + loi.votesNégatifs + loi.votesAbstention;
    if (total === 0) return 'Aucun vote';
    
    const pourcentagePour = Math.round((loi.votesPositifs / total) * 100);
    const pourcentageContre = Math.round((loi.votesNégatifs / total) * 100);
    const pourcentageAbstention = Math.round((loi.votesAbstention / total) * 100);
    
    return `Pour: ${loi.votesPositifs} (${pourcentagePour}%) | Contre: ${loi.votesNégatifs} (${pourcentageContre}%) | Abstention: ${loi.votesAbstention} (${pourcentageAbstention}%)`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {onClose && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onClose}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h2 className="text-2xl font-bold">{loi.titre}</h2>
        </div>
        
        <div className="flex space-x-2">
          <Badge variant="outline" className={getStatusColor(loi.état)}>
            {loi.état}
          </Badge>
          
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEdit}
              className="flex items-center gap-1"
            >
              <PenSquare className="h-4 w-4" />
              Modifier
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails de la loi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{loi.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Proposeur</h3>
                  <p className="mt-1">{loi.proposeur}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                  <p className="mt-1">{loi.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date de proposition</h3>
                  <p className="mt-1">An {loi.dateProposition.year}, {formatSeasonDisplay(loi.dateProposition.season)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Importance</h3>
                  <p className="mt-1">{loi.importance || 'Normale'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {loi.clauses && loi.clauses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Clauses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {loi.clauses.map((clause, index) => (
                    <li key={index} className="border-b pb-2 last:border-0">
                      <div className="font-medium">{clause.texte}</div>
                      {clause.explication && (
                        <div className="text-sm text-muted-foreground mt-1">{clause.explication}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {loi.impacts && loi.impacts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Impacts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {loi.impacts.map((impact, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <span>{impact.domaine}</span>
                      <Badge variant={impact.valeur > 0 ? 'success' : 'destructive'}>
                        {impact.valeur > 0 ? '+' : ''}{impact.valeur}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Votes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-background p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground">Résultat</div>
                  <div className="text-lg font-semibold mt-1">{formatVotes()}</div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${loi.votesPositifs / (loi.votesPositifs + loi.votesNégatifs + loi.votesAbstention) * 100 || 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Pour</span>
                    <span>Contre</span>
                    <span>Abstention</span>
                  </div>
                </div>
                
                <Button className="w-full gap-2" variant="outline">
                  <Vote className="h-4 w-4" />
                  Voter
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Chronologie</CardTitle>
            </CardHeader>
            <CardContent>
              <LoiTimeline loi={loi} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
