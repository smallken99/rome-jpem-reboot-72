import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PublicBuilding, ConstructionProject } from '../hooks/useBatimentsPublics';
import { Wrench, MapPin, Building, Coins, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
  onMaintain
}) => {
  if (!selectedItem) return null;

  const isBuilding = 'condition' in selectedItem;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-lg">{selectedItem.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Localisation: <span className="font-medium">{selectedItem.location}</span></span>
            </div>
            
            {isBuilding && (
              <>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Construit en: <span className="font-medium">{selectedItem.constructionYear} AUC</span></span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">État: <span className="font-medium">{selectedItem.condition}%</span></span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Coût d'entretien: <span className="font-medium">{selectedItem.maintenanceCost.toLocaleString()} As/an</span></span>
                </div>
                
                {selectedItem.population !== undefined && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Population servie: <span className="font-medium">{selectedItem.population.toLocaleString()}</span></span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Coût estimé: <span className="font-medium">{selectedItem.estimatedCost.toLocaleString()} As</span></span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Durée de construction: <span className="font-medium">{selectedItem.duration} {selectedItem.duration > 1 ? 'années' : 'année'}</span></span>
                </div>
                
                {selectedItem.expectedCompletionYear && (
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Achèvement prévu: <span className="font-medium">{selectedItem.expectedCompletionYear} AUC</span></span>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Bénéfices</h4>
              <ul className="text-sm space-y-1">
                {selectedItem.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-rome-gold"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            {isBuilding && (
              <div>
                <h4 className="text-sm font-medium mb-2">Niveau d'entretien</h4>
                <div className="text-sm">
                  <span className={selectedItem.maintenanceLevel === 'minimal' ? 'font-medium' : ''}>Minimal</span>
                  {' • '}
                  <span className={selectedItem.maintenanceLevel === 'normal' ? 'font-medium' : ''}>Normal</span>
                  {' • '}
                  <span className={selectedItem.maintenanceLevel === 'excellent' ? 'font-medium' : ''}>Excellent</span>
                </div>
              </div>
            )}
            
            {!isBuilding && selectedItem.approved !== undefined && (
              <div>
                <h4 className="text-sm font-medium mb-2">Statut du projet</h4>
                <div className={`text-sm ${selectedItem.approved ? 'text-green-600' : 'text-amber-600'}`}>
                  {selectedItem.approved ? 'Approuvé' : 'En attente d\'approbation'}
                </div>
                
                {selectedItem.progress > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Progression:</span>
                      <span className="text-xs font-medium">{selectedItem.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${selectedItem.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <DialogFooter>
          {isBuilding && onMaintain && (
            <Button 
              variant="outline" 
              onClick={() => onMaintain(selectedItem.id)}
              className="mr-auto"
            >
              <Wrench className="h-4 w-4 mr-2" />
              Maintenance
            </Button>
          )}
          
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
