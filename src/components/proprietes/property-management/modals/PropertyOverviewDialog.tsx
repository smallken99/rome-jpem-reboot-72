
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/utils/currencyUtils';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { OwnedBuilding } from '../../hooks/building/types';
import { Building, MapPin, Calendar, Tool, User, Star, History, Landmark } from 'lucide-react';
import { usePatrimoine } from '@/hooks/usePatrimoine';

interface PropertyOverviewDialogProps {
  building: OwnedBuilding | null;
  isOpen: boolean;
  onClose: () => void;
  onMaintenance: () => void;
  onSell: () => void;
  onRename: (newName: string) => void;
  estimatedValue: number;
}

export const PropertyOverviewDialog: React.FC<PropertyOverviewDialogProps> = ({
  building,
  isOpen,
  onClose,
  onMaintenance,
  onSell,
  onRename,
  estimatedValue
}) => {
  if (!building) return null;
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return "bg-green-600";
    if (condition >= 60) return "bg-yellow-600";
    if (condition >= 40) return "bg-orange-600";
    return "bg-red-600";
  };
  
  const getConditionText = (condition: number) => {
    if (condition >= 90) return "Excellent";
    if (condition >= 75) return "Très bon";
    if (condition >= 60) return "Bon";
    if (condition >= 40) return "Moyen";
    if (condition >= 20) return "Mauvais";
    return "Critique";
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <span>{building.name}</span>
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{building.location}</span>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="maintenance">Entretien</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-medium flex items-center gap-2">
                  <Landmark className="h-4 w-4" />
                  <span>
                    {building.buildingType === 'urban' ? 'Urbain' :
                     building.buildingType === 'rural' ? 'Rural' :
                     building.buildingType === 'religious' ? 'Religieux' : 'Public'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Acquis le</div>
                <div className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(building.purchaseDate)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Valeur estimée</div>
                <div className="font-medium">{formatCurrency(estimatedValue)}</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Main d'œuvre</div>
                <div className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{building.slaves} esclaves assignés</span>
                </div>
              </div>
              
              <div className="space-y-2 col-span-2">
                <div className="text-sm text-muted-foreground">État</div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{getConditionText(building.condition)}</span>
                    <span>{building.condition}%</span>
                  </div>
                  <Progress 
                    value={building.condition} 
                    className="h-2" 
                    indicatorClassName={getConditionColor(building.condition)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance" className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-medium">Maintenance automatique</div>
                <Badge variant={building.maintenanceEnabled ? "default" : "outline"}>
                  {building.maintenanceEnabled ? "Activée" : "Désactivée"}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Coût d'entretien annuel</div>
                <div className="font-medium">{formatCurrency(building.maintenanceCost)}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Dernière maintenance</div>
                <div className="font-medium">
                  {building.lastMaintenance 
                    ? formatDate(building.lastMaintenance)
                    : "Aucune maintenance effectuée"}
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button 
                  onClick={onMaintenance}
                  className="w-full gap-2"
                >
                  <Tool className="h-4 w-4" />
                  <span>Effectuer une maintenance</span>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="finances" className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Valeur actuelle estimée</div>
                <div className="font-medium text-lg">{formatCurrency(estimatedValue)}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Coûts d'entretien annuels</div>
                <div className="font-medium text-red-600">-{formatCurrency(building.maintenanceCost)}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Revenus annuels</div>
                <div className="font-medium text-green-600">+{formatCurrency(0)}</div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button 
                  variant="outline"
                  onClick={onSell}
                  className="w-full"
                >
                  Vendre cette propriété
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" className="sm:ml-auto" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
