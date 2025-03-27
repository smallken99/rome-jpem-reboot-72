
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/utils/currencyUtils';
import { Property } from '@/types/proprietes';
import { 
  Building, 
  Users, 
  BarChart, 
  PiggyBank, 
  Wrench,
  Hammer
} from 'lucide-react';
import { PropertyStats } from '../PropertyStats';
import { MaintenanceCostsPanel } from './MaintenanceCostsPanel';
import { PropertyUpgradePanel } from './PropertyUpgradePanel';

interface BuildingDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onRepair?: (property: Property) => void;
  onUpgrade?: (property: Property, upgrade: string) => void;
}

export const BuildingDetailsModal: React.FC<BuildingDetailsModalProps> = ({
  property,
  isOpen,
  onClose,
  onRepair,
  onUpgrade
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!property) return null;
  
  const getConditionColor = (condition: number) => {
    if (condition >= 90) return 'text-green-600';
    if (condition >= 70) return 'text-lime-600';
    if (condition >= 50) return 'text-yellow-600';
    if (condition >= 30) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const getConditionText = (condition: number) => {
    if (condition >= 90) return 'Excellente';
    if (condition >= 70) return 'Bonne';
    if (condition >= 50) return 'Correcte';
    if (condition >= 30) return 'Mauvaise';
    return 'Critique';
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {property.name}
          </DialogTitle>
          <DialogDescription>
            {property.location} - Valeur estimée: {formatCurrency(property.value)}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="maintenance">Entretien</TabsTrigger>
            <TabsTrigger value="upgrades">Améliorations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Informations</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Type de propriété</div>
                    <div className="font-medium">{property.type === 'villa' ? 'Villa Rustica' : property.type === 'domus' ? 'Domus' : 'Insula'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Localisation</div>
                    <div className="font-medium">{property.location}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Date d'acquisition</div>
                    <div className="font-medium">{new Date(property.acquired).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">État général</div>
                    <div className={`font-medium ${getConditionColor(property.condition)}`}>
                      {getConditionText(property.condition)} ({property.condition}%)
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Finances</h3>
                <PropertyStats property={property} />
                
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => onRepair && onRepair(property)}
                    disabled={property.condition >= 95}
                  >
                    <Wrench className="h-4 w-4 mr-2" />
                    Réparer ({formatCurrency((100 - property.condition) * 100)})
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance" className="py-4">
            <MaintenanceCostsPanel property={property} />
          </TabsContent>
          
          <TabsContent value="upgrades" className="py-4">
            <PropertyUpgradePanel 
              property={property} 
              onUpgrade={onUpgrade}
            />
          </TabsContent>
        </Tabs>
        
        <Separator />
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuildingDetailsModal;
