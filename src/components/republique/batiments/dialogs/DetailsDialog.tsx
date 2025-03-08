
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PublicBuilding, ConstructionProject } from '../hooks/useBatimentsPublics';
import { formatMoney } from '@/utils/formatUtils';

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: PublicBuilding | ConstructionProject | null;
  onMaintain?: (buildingId: string) => void;
}

export const DetailsDialog: React.FC<DetailsDialogProps> = ({
  open,
  onOpenChange,
  selectedItem,
  onMaintain,
}) => {
  // Vérifier si un item est un bâtiment ou un projet
  const isBuilding = (item: any): item is PublicBuilding => {
    return 'constructionStatus' in item;
  };

  if (!selectedItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel">
            {selectedItem.name}
            {isBuilding(selectedItem) && (
              <Badge className="ml-2">
                {selectedItem.constructionStatus === 'completed' ? 'Terminé' : 
                 selectedItem.constructionStatus === 'damaged' ? 'Endommagé' :
                 selectedItem.constructionStatus === 'in_progress' ? 'En construction' : 'Planifié'}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Situé à {selectedItem.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {isBuilding(selectedItem) ? (
            <>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-right">Année de construction</Label>
                <div>{selectedItem.constructionYear} AUC</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-right">État actuel</Label>
                <div>{selectedItem.condition}%</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-right">Coût d'entretien</Label>
                <div>{formatMoney(selectedItem.maintenanceCost)}/an</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-right">Niveau d'entretien</Label>
                <div>{selectedItem.maintenanceLevel === 'minimal' ? 'Minimal' : 
                     selectedItem.maintenanceLevel === 'standard' ? 'Standard' : 'Excellent'}</div>
              </div>
              {selectedItem.lastMaintenance && (
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-right">Dernier entretien</Label>
                  <div>{selectedItem.lastMaintenance} AUC</div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-right">Coût estimé</Label>
                <div>{formatMoney(selectedItem.estimatedCost)}</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-right">Durée estimée</Label>
                <div>{selectedItem.duration} {selectedItem.duration > 1 ? 'années' : 'année'}</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-right">Progression</Label>
                <div>{selectedItem.progress}%</div>
              </div>
              {selectedItem.startedYear && (
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-right">Début des travaux</Label>
                  <div>{selectedItem.startedYear} AUC</div>
                </div>
              )}
              {selectedItem.expectedCompletionYear && (
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-right">Fin prévue</Label>
                  <div>{selectedItem.expectedCompletionYear} AUC</div>
                </div>
              )}
              {selectedItem.sponsors && (
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-right">Financeurs</Label>
                  <div>{selectedItem.sponsors.join(', ')}</div>
                </div>
              )}
            </>
          )}
          
          <Separator />
          
          <div className="grid grid-cols-2 items-start gap-4">
            <Label className="text-right">Avantages</Label>
            <div>
              <ul className="list-disc pl-5 space-y-1">
                {selectedItem.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          {isBuilding(selectedItem) && onMaintain && (
            <Button onClick={() => {
              onOpenChange(false);
              onMaintain(selectedItem.id);
            }}>
              Effectuer la maintenance
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
