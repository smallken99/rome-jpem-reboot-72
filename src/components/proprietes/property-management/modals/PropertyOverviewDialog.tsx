
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building, Home, Coins, Users, 
  Star, Clock, AlertTriangle, Hammer, /* Remplacé Tool par Hammer */
  ShieldCheck
} from 'lucide-react';
import { BuildingDescription } from '@/components/proprietes/data/types/buildingTypes';
import { formatCurrency } from '@/utils/currencyUtils';

interface PropertyOverviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  property: BuildingDescription;
}

const PropertyOverviewDialog: React.FC<PropertyOverviewDialogProps> = ({
  isOpen,
  onClose,
  property
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cinzel text-rome-navy">{property.name}</DialogTitle>
          <DialogDescription>{property.description}</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Informations générales</h3>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-rome-gold" />
                  <span className="font-medium">Type:</span>
                  <span>{property.type === 'urban' ? 'Urbain' : 
                          property.type === 'rural' ? 'Rural' : 
                          property.type === 'religious' ? 'Religieux' : 'Public'}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-rome-gold" />
                  <span className="font-medium">Sous-type:</span>
                  <span>{property.subType || 'N/A'}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-rome-gold" />
                  <span className="font-medium">Coût initial:</span>
                  <span>{formatCurrency(property.initialCost)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-rome-gold" />
                  <span className="font-medium">Coût d'entretien:</span>
                  <span>{property.maintenanceCost}/an</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-rome-gold" />
                  <span className="font-medium">Prestige:</span>
                  <span>+{property.prestige}</span>
                </div>
                
                {property.slaves && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-rome-gold" />
                    <span className="font-medium">Esclaves requis:</span>
                    <span>{property.slaves.required}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Avantages et caractéristiques</h3>
              
              {property.advantages && property.advantages.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Avantages:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {property.advantages.map((adv, idx) => (
                      <li key={idx}>{adv}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {property.requirements && (
                <div className="space-y-2">
                  <h4 className="font-medium">Prérequis:</h4>
                  <div className="flex items-center text-amber-700 gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>{property.requirements}</span>
                  </div>
                </div>
              )}
              
              {property.maintenance && (
                <div className="space-y-2">
                  <h4 className="font-medium">Entretien:</h4>
                  <div className="flex items-center text-blue-700 gap-2">
                    <Hammer className="h-5 w-5" />
                    <span>{property.maintenance}</span>
                  </div>
                </div>
              )}
              
              {property.security && (
                <div className="space-y-2">
                  <h4 className="font-medium">Sécurité:</h4>
                  <div className="flex items-center text-green-700 gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>{property.security}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Fermer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyOverviewDialog;
