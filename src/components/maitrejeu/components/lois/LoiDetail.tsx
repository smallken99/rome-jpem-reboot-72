
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loi } from '../../types';
import { formatSeasonDisplay } from '../../types/common';
import { Button } from '@/components/ui/button';

interface LoiDetailProps {
  loi: Loi;
  onClose: () => void;
}

export const LoiDetail: React.FC<LoiDetailProps> = ({ loi, onClose }) => {
  // Statut de la loi pour l'affichage
  const getStatusColor = () => {
    switch (loi.état) {
      case 'adoptée':
      case 'Promulguée':
      case 'votée':
        return 'bg-green-500';
      case 'rejetée':
      case 'Rejetée':
        return 'bg-red-500';
      case 'proposée':
      case 'en_débat':
      case 'En délibération':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Formatage de la date
  const formatDate = (dateObj: { year: number, season: string }) => {
    return `An ${dateObj.year} - ${formatSeasonDisplay(dateObj.season as any)}`;
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{loi.titre}</CardTitle>
            <p className="text-sm text-muted-foreground">Proposée par {loi.proposeur}</p>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline" className={`${getStatusColor()} text-white`}>
              {loi.état}
            </Badge>
            <Badge variant="secondary">{loi.type}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Description</h3>
          <p className="text-sm">{loi.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Date de proposition</h3>
            <p className="text-sm">{formatDate(loi.dateProposition)}</p>
          </div>
          {loi.dateVote && (
            <div>
              <h3 className="text-sm font-medium mb-1">Date de vote</h3>
              <p className="text-sm">{formatDate(loi.dateVote)}</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1">Résultats du vote</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-green-100 p-2 rounded text-center">
              <div className="text-green-700 font-medium">Pour</div>
              <div className="text-lg">{loi.votes.pour}</div>
            </div>
            <div className="bg-red-100 p-2 rounded text-center">
              <div className="text-red-700 font-medium">Contre</div>
              <div className="text-lg">{loi.votes.contre}</div>
            </div>
            <div className="bg-gray-100 p-2 rounded text-center">
              <div className="text-gray-700 font-medium">Abstention</div>
              <div className="text-lg">{loi.votes.abstention}</div>
            </div>
          </div>
        </div>

        {loi.effets && typeof loi.effets === 'object' && (
          <div>
            <h3 className="text-sm font-medium mb-1">Effets</h3>
            <ul className="list-disc list-inside text-sm">
              {Object.entries(loi.effets).map(([key, value]) => (
                <li key={key}>
                  {key}: {typeof value === 'number' ? (value > 0 ? `+${value}` : value) : value}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button className="w-full" onClick={onClose}>
          Fermer
        </Button>
      </CardContent>
    </Card>
  );
};
