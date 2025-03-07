
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, CoinsIcon, TrendingUp, ShoppingCart, AlertCircle } from 'lucide-react';
import { allBuildingTypes } from '../data/buildings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SlaveManagementTab: React.FC = () => {
  const [totalSlaves, setTotalSlaves] = useState(25);
  const [availableSlaves, setAvailableSlaves] = useState(10);
  const [slavePrice, setSlavePrice] = useState(800);
  
  // Données simulées pour les propriétés possédées
  const ownedProperties = [
    { id: 1, name: "Insula de la Via Sacra", type: "insula", assigned: 3, required: 2, optimal: 4 },
    { id: 2, name: "Domaine viticole de Campanie", type: "domaine_vignoble", assigned: 5, required: 20, optimal: 30 },
    { id: 3, name: "Villa Urbana du Palatin", type: "villa_urbana", assigned: 7, required: 10, optimal: 15 },
    { id: 4, name: "Temple de Minerve", type: "temple", assigned: 0, required: 5, optimal: 8 },
  ];
  
  const [propertyAssignments, setPropertyAssignments] = useState(
    ownedProperties.map(prop => ({ id: prop.id, assigned: prop.assigned }))
  );
  
  // Calculer le nombre d'esclaves assignés
  const assignedSlaves = propertyAssignments.reduce((total, prop) => total + prop.assigned, 0);
  
  // Mettre à jour l'attribution d'esclaves à une propriété
  const updateAssignment = (propertyId: number, value: number) => {
    const newAssignments = propertyAssignments.map(prop => 
      prop.id === propertyId ? { ...prop, assigned: value } : prop
    );
    setPropertyAssignments(newAssignments);
  };
  
  // Simuler l'achat d'esclaves
  const purchaseSlaves = (amount: number) => {
    setTotalSlaves(prev => prev + amount);
    setAvailableSlaves(prev => prev + amount);
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
      case "adéquat": return "warning";
      case "optimal": return "success";
      default: return "secondary";
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
              <p className="text-xl font-bold text-rome-navy">{totalSlaves - assignedSlaves}</p>
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
              <Button 
                variant="outline" 
                className="roman-btn-outline"
                onClick={() => purchaseSlaves(1)}
              >
                +1
              </Button>
              <Button 
                variant="outline" 
                className="roman-btn-outline"
                onClick={() => purchaseSlaves(5)}
              >
                +5
              </Button>
              <Button 
                className="roman-btn"
                onClick={() => purchaseSlaves(10)}
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
              {ownedProperties.map((property) => {
                const propertyAssignment = propertyAssignments.find(p => p.id === property.id);
                const assignedCount = propertyAssignment?.assigned || 0;
                const status = getPropertyStatus(assignedCount, property.required, property.optimal);
                
                return (
                  <tr key={property.id} className="border-b border-rome-gold/10">
                    <td className="py-3 px-3 font-medium">{property.name}</td>
                    <td className="py-3 px-3 text-sm">{property.type}</td>
                    <td className="py-3 px-3">
                      <Input 
                        type="number" 
                        min="0"
                        max={totalSlaves - assignedSlaves + assignedCount} 
                        value={assignedCount}
                        onChange={(e) => updateAssignment(property.id, parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                    </td>
                    <td className="py-3 px-3">
                      {property.required} / {property.optimal}
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
                          onClick={() => updateAssignment(property.id, property.required)}
                          disabled={totalSlaves - assignedSlaves + assignedCount < property.required}
                          className="text-xs"
                        >
                          Minimum
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => updateAssignment(property.id, property.optimal)}
                          disabled={totalSlaves - assignedSlaves + assignedCount < property.optimal}
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
      </div>
    </div>
  );
};
