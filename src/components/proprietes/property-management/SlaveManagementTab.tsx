
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, CoinsIcon, TrendingUp, ShoppingCart, AlertCircle } from 'lucide-react';
import { allBuildingTypes } from '../data/buildings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useBuildingManagement, OwnedBuilding } from '../hooks/useBuildingManagement';
import { usePatrimoine } from '@/hooks/usePatrimoine';

export const SlaveManagementTab: React.FC = () => {
  const [totalSlaves, setTotalSlaves] = useState(25);
  const [slavePrice, setSlavePrice] = useState(800);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const { ownedBuildings, assignSlaves } = useBuildingManagement();
  const { balance, updateBalance } = usePatrimoine();
  
  // Calculer le nombre d'esclaves assignés
  const assignedSlaves = ownedBuildings.reduce((total, prop) => total + prop.slaves, 0);
  const availableSlaves = totalSlaves - assignedSlaves;
  
  // Mettre à jour l'attribution d'esclaves à une propriété
  const updateAssignment = (propertyId: number, value: number) => {
    const maxAvailable = availableSlaves + (ownedBuildings.find(b => b.id === propertyId)?.slaves || 0);
    
    if (value > maxAvailable) {
      toast.error(`Vous ne disposez que de ${maxAvailable} esclaves disponibles pour cette propriété`);
      return;
    }
    
    assignSlaves(propertyId, value);
  };
  
  // Simuler l'achat d'esclaves
  const purchaseSlaves = (amount: number) => {
    const totalCost = amount * slavePrice;
    
    if (balance < totalCost) {
      toast.error(`Fonds insuffisants pour acheter ${amount} esclaves (coût: ${totalCost.toLocaleString()} As)`);
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setTotalSlaves(prev => prev + amount);
      updateBalance(-totalCost);
      toast.success(`Acquisition de ${amount} esclaves pour ${totalCost.toLocaleString()} As`);
      setIsLoading(false);
    }, 1000);
  };
  
  // Fonction utilitaire pour obtenir le statut d'une propriété en fonction des esclaves assignés
  const getPropertyStatus = (assigned: number, required: number, optimal: number) => {
    if (assigned < required) return "insuffisant";
    if (assigned < optimal) return "adéquat";
    return "optimal";
  };
  
  // Fonction utilitaire pour obtenir la couleur du badge en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "insuffisant": return "destructive";
      case "adéquat": return "secondary";
      case "optimal": return "default";
      default: return "secondary";
    }
  };
  
  // Obtenir les détails du bâtiment
  const getBuildingDetails = (building: OwnedBuilding) => {
    switch (building.buildingType) {
      case 'urban':
        return allBuildingTypes.urbanResidential[building.buildingId];
      case 'rural':
        return allBuildingTypes.rural[building.buildingId];
      case 'religious':
        return allBuildingTypes.religious[building.buildingId];
      case 'public':
        return allBuildingTypes.public[building.buildingId];
      default:
        return null;
    }
  };
  
  // Filtre les bâtiments qui nécessitent des esclaves
  const buildingsWithSlaves = ownedBuildings.filter(building => {
    const details = getBuildingDetails(building);
    return details && details.slaves;
  });
  
  const handlePurchaseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setPurchaseAmount(value);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-4">
        <div>
          <h3 className="font-cinzel text-lg text-rome-navy">Gestion des Esclaves</h3>
          <p className="text-sm text-muted-foreground">
            Attribuez des esclaves à vos propriétés pour optimiser leur fonctionnement et leur rentabilité.
          </p>
        </div>
      </div>
      
      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-rome-gold/30">
          <CardContent className="p-4 flex items-center">
            <Users className="h-8 w-8 mr-3 text-rome-navy" />
            <div>
              <p className="text-sm text-muted-foreground">Total d'esclaves</p>
              <p className="text-xl font-bold text-rome-navy">{totalSlaves}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-rome-gold/30">
          <CardContent className="p-4 flex items-center">
            <Users className="h-8 w-8 mr-3 text-rome-terracotta" />
            <div>
              <p className="text-sm text-muted-foreground">Esclaves assignés</p>
              <p className="text-xl font-bold text-rome-navy">{assignedSlaves} / {totalSlaves}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-rome-gold/30">
          <CardContent className="p-4 flex items-center">
            <Users className="h-8 w-8 mr-3 text-rome-gold" />
            <div>
              <p className="text-sm text-muted-foreground">Esclaves disponibles</p>
              <p className="text-xl font-bold text-rome-navy">{availableSlaves}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Acquisition d'esclaves */}
      <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
        <h4 className="font-cinzel text-rome-navy mb-4 flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Marché aux esclaves
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="mb-2 block">Prix actuel du marché</Label>
            <div className="text-lg font-bold text-rome-navy flex items-center">
              <CoinsIcon className="h-4 w-4 mr-2 text-rome-gold" />
              {slavePrice} As par esclave
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="mb-2 block">Acquérir des esclaves</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                value={purchaseAmount}
                onChange={handlePurchaseAmountChange}
                className="w-20"
              />
              <Button 
                className="roman-btn"
                onClick={() => purchaseSlaves(purchaseAmount)}
                disabled={isLoading || balance < purchaseAmount * slavePrice}
              >
                {isLoading ? "Transaction..." : `Acheter (${(purchaseAmount * slavePrice).toLocaleString()} As)`}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="roman-btn-outline"
                onClick={() => purchaseSlaves(1)}
                disabled={isLoading || balance < slavePrice}
              >
                +1
              </Button>
              <Button 
                variant="outline" 
                className="roman-btn-outline"
                onClick={() => purchaseSlaves(5)}
                disabled={isLoading || balance < 5 * slavePrice}
              >
                +5
              </Button>
              <Button 
                variant="outline" 
                className="roman-btn-outline"
                onClick={() => purchaseSlaves(10)}
                disabled={isLoading || balance < 10 * slavePrice}
              >
                +10
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          Le prix varie selon la disponibilité des esclaves sur le marché et leur qualité.
        </div>
      </div>
      
      {/* Attribution aux propriétés */}
      <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
        <h4 className="font-cinzel text-rome-navy mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Attribution des esclaves
        </h4>
        
        {buildingsWithSlaves.length === 0 ? (
          <div className="text-center p-6 text-muted-foreground">
            <p>Vous n'avez pas encore de propriétés nécessitant des esclaves.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-rome-gold/30 text-left">
                  <th className="py-2 px-3 font-cinzel">Propriété</th>
                  <th className="py-2 px-3 font-cinzel">Type</th>
                  <th className="py-2 px-3 font-cinzel">Attribués</th>
                  <th className="py-2 px-3 font-cinzel">Requis / Optimal</th>
                  <th className="py-2 px-3 font-cinzel">Statut</th>
                  <th className="py-2 px-3 font-cinzel">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buildingsWithSlaves.map((building) => {
                  const buildingDetails = getBuildingDetails(building);
                  
                  if (!buildingDetails || !buildingDetails.slaves) return null;
                  
                  const { required, optimal } = buildingDetails.slaves;
                  const status = getPropertyStatus(building.slaves, required, optimal);
                  
                  return (
                    <tr key={building.id} className="border-b border-rome-gold/10">
                      <td className="py-3 px-3 font-medium">{building.name}</td>
                      <td className="py-3 px-3 text-sm">{building.buildingType}</td>
                      <td className="py-3 px-3">
                        <Input 
                          type="number" 
                          min="0"
                          max={availableSlaves + building.slaves} 
                          value={building.slaves}
                          onChange={(e) => updateAssignment(building.id, parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      </td>
                      <td className="py-3 px-3">
                        {required} / {optimal}
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={getStatusColor(status)}>
                          {status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateAssignment(building.id, required)}
                            disabled={availableSlaves + building.slaves < required}
                            className="text-xs"
                          >
                            Minimum
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => updateAssignment(building.id, optimal)}
                            disabled={availableSlaves + building.slaves < optimal}
                            className="text-xs roman-btn"
                          >
                            Optimal
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
