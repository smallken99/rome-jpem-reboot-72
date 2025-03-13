
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, CalendarDays, Users, Check, X, AlertCircle } from 'lucide-react';
import { Loi } from '../../types/lois';
import { formatGameDate } from '@/utils/timeSystem';

export interface LoiDetailProps {
  loi: Loi;
  onEdit?: () => void;
}

export const LoiDetail: React.FC<LoiDetailProps> = ({ loi, onEdit }) => {
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'proposée': return 'bg-blue-100 text-blue-800';
      case 'adoptée': return 'bg-green-100 text-green-800';
      case 'rejetée': return 'bg-red-100 text-red-800';
      case 'Promulguée': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (date: any) => {
    if (!date) return 'Date inconnue';
    return formatGameDate(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{loi.titre}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={getStatutColor(loi.état)}>
              {loi.état}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              Proposée le {formatDate(loi.dateProposition)}
            </span>
          </div>
        </div>
        
        {onEdit && (
          <Button onClick={onEdit} variant="outline" className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            Modifier
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Détails de la Loi</CardTitle>
          <CardDescription>
            Proposée par: {loi.proposeur}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Description</h3>
            <p className="text-muted-foreground">
              {loi.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Effets</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {loi.effets && Array.isArray(loi.effets) ? (
                loi.effets.map((effet, index) => (
                  <li key={index}>{effet}</li>
                ))
              ) : (
                <li>Aucun effet spécifié</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vote</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loi.votes ? (
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 border rounded">
                <div className="flex items-center gap-1 text-green-500">
                  <Check className="h-5 w-5" />
                  <span className="font-bold text-lg">Pour</span>
                </div>
                <span className="text-2xl font-bold mt-1">{loi.votes.pour || 0}</span>
              </div>
              
              <div className="flex flex-col items-center p-3 border rounded">
                <div className="flex items-center gap-1 text-red-500">
                  <X className="h-5 w-5" />
                  <span className="font-bold text-lg">Contre</span>
                </div>
                <span className="text-2xl font-bold mt-1">{loi.votes.contre || 0}</span>
              </div>
              
              <div className="flex flex-col items-center p-3 border rounded">
                <div className="flex items-center gap-1 text-amber-500">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-bold text-lg">Abst.</span>
                </div>
                <span className="text-2xl font-bold mt-1">{loi.votes.abstention || 0}</span>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Aucun vote n'a encore eu lieu pour cette loi.</p>
          )}
          
          {loi.dateVote && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Date du vote:</span> {formatDate(loi.dateVote)}
            </div>
          )}
        </CardContent>
      </Card>
      
      {loi.commentaires && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Commentaires</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{loi.commentaires}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
