
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollText, Calendar, GavelIcon, CheckCircle, XCircle } from 'lucide-react';
import { Loi } from '../../types/lois';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoiTimeline } from './LoiTimeline';
import { formatSeasonDisplay } from '@/utils/timeSystem';

export interface LoiDetailProps {
  loi: Loi;
  onEdit: () => void;
  onClose: () => void;
}

export const LoiDetail: React.FC<LoiDetailProps> = ({ loi, onEdit, onClose }) => {
  const formatVoteResults = () => {
    const total = loi.votesPositifs + loi.votesNégatifs + loi.votesAbstention;
    
    if (total === 0) return "Aucun vote n'a été enregistré";
    
    const pourcentagePour = Math.round((loi.votesPositifs / total) * 100);
    const pourcentageContre = Math.round((loi.votesNégatifs / total) * 100);
    
    return `${pourcentagePour}% pour, ${pourcentageContre}% contre`;
  };
  
  const getStatusIcon = () => {
    switch (loi.état) {
      case 'Promulguée':
      case 'adoptée':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'Rejetée':
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return <ScrollText className="h-4 w-4 mr-1" />;
    }
  };
  
  const getStatusVariant = () => {
    switch (loi.état) {
      case 'Promulguée':
      case 'adoptée':
        return "outline";
      case 'Rejetée':
        return "destructive";
      default:
        return "secondary";
    }
  };
  
  const formatDate = (date: { year: number; season: string }) => {
    return `An ${date.year}, ${formatSeasonDisplay(date.season)}`;
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div>
            <CardTitle className="text-xl font-bold">{loi.titre}</CardTitle>
            <CardDescription className="flex items-center gap-3 mt-1">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(loi.dateProposition)}
              </span>
              <span className="flex items-center">
                <GavelIcon className="h-4 w-4 mr-1" />
                {loi.proposeur}
              </span>
            </CardDescription>
          </div>
          <Badge variant={getStatusVariant() as any} className="flex items-center">
            {getStatusIcon()}
            {loi.état}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          <Badge variant="outline">{loi.type}</Badge>
          <Badge variant="outline">{loi.catégorie}</Badge>
          <Badge variant="outline">Importance: {loi.importance}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="votes">Votes</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
            <TabsTrigger value="effets">Effets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{loi.description}</p>
              </div>
              
              {Array.isArray(loi.clauses) && loi.clauses.length > 0 && (
                <div>
                  <h3 className="text-md font-medium mb-2">Clauses principales</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {loi.clauses.map((clause, index) => (
                      <li key={index} className="text-sm">
                        {typeof clause === 'string' ? clause : clause.texte}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="votes">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Pour</p>
                  <p className="text-2xl font-bold text-green-600">{loi.votesPositifs}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Contre</p>
                  <p className="text-2xl font-bold text-red-600">{loi.votesNégatifs}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Abstention</p>
                  <p className="text-2xl font-bold text-gray-500">{loi.votesAbstention}</p>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-md font-medium mb-2">Résultat</h3>
                <p className="text-sm">{formatVoteResults()}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="historique">
            <LoiTimeline lois={[loi]} />
          </TabsContent>
          
          <TabsContent value="effets">
            <div>
              <h3 className="text-md font-medium mb-2">Effets et impacts</h3>
              {Object.keys(loi.effets).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(loi.effets).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                      <span className="text-sm capitalize">{key}</span>
                      <Badge variant="outline">{value}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Aucun effet spécifique n'a été défini pour cette loi.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button onClick={onEdit}>
            Modifier
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
