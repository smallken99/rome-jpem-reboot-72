
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loi } from '../../types/lois';
import { Badge } from '@/components/ui/badge';
import { formatSeasonDisplay } from '@/components/maitrejeu/types/common';

interface LoiDetailProps {
  loi: Loi;
  onClose: () => void;
}

export const LoiDetail: React.FC<LoiDetailProps> = ({ loi, onClose }) => {
  const getEtatColor = (état: Loi['état']) => {
    switch (état) {
      case 'Promulguée': return 'bg-green-500';
      case 'Rejetée': return 'bg-red-500';
      case 'En délibération': return 'bg-yellow-500';
      case 'proposée': return 'bg-blue-500';
      case 'adoptée': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getImportanceColor = (importance: Loi['importance']) => {
    switch (importance) {
      case 'majeure': return 'bg-red-500';
      case 'normale': return 'bg-blue-500';
      case 'mineure': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Format the season for display
  const getFormattedSeason = () => {
    if (!loi.date) return '';
    return formatSeasonDisplay(loi.date.season);
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{loi.titre}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex gap-2 mb-4">
            <Badge className={getEtatColor(loi.état)}>{loi.état}</Badge>
            <Badge className={getImportanceColor(loi.importance)}>
              {loi.importance.charAt(0).toUpperCase() + loi.importance.slice(1)}
            </Badge>
            <Badge variant="outline">{loi.catégorie}</Badge>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-1">Proposée par</h3>
            <p>{loi.proposeur}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-1">Date</h3>
            <p>
              {getFormattedSeason()} {loi.date?.year}
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-1">Description</h3>
            <p className="text-sm text-gray-700">{loi.description}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-1">Votes</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-green-100 rounded">
                <p className="font-bold">{loi.votesPositifs}</p>
                <p className="text-xs">Pour</p>
              </div>
              <div className="text-center p-2 bg-red-100 rounded">
                <p className="font-bold">{loi.votesNégatifs}</p>
                <p className="text-xs">Contre</p>
              </div>
              <div className="text-center p-2 bg-gray-100 rounded">
                <p className="font-bold">{loi.votesAbstention}</p>
                <p className="text-xs">Abstention</p>
              </div>
            </div>
          </div>
          
          {Object.keys(loi.effets).length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-1">Effets</h3>
              <ul className="list-disc pl-5">
                {Object.entries(loi.effets).map(([effet, valeur]) => (
                  <li key={effet} className="text-sm">
                    {effet}: {valeur > 0 ? `+${valeur}` : valeur}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
