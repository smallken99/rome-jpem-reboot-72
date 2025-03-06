
import React, { useState } from 'react';
import { Check, AlertTriangle, ArrowRight, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type PropertyStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

interface PropertyMaintenanceItem {
  id: string;
  name: string;
  type: string;
  location: string;
  condition: number; // 0-100
  annualCost: number;
  lastMaintenance: string;
  upcomingIssue?: string;
}

export const MaintenanceTab: React.FC = () => {
  // Données simulées des propriétés à entretenir
  const [properties, setProperties] = useState<PropertyMaintenanceItem[]>([
    {
      id: 'prop1',
      name: 'Domus du Palatin',
      type: 'Domus',
      location: 'Rome - Palatin',
      condition: 87,
      annualCost: 2500,
      lastMaintenance: 'Nones de Mars'
    },
    {
      id: 'prop2',
      name: 'Insula de la Subure',
      type: 'Insula',
      location: 'Rome - Subure',
      condition: 62,
      annualCost: 1200,
      lastMaintenance: 'Ides de Janvier',
      upcomingIssue: 'Réparation du toit nécessaire'
    },
    {
      id: 'prop3',
      name: 'Villa Campania',
      type: 'Villa',
      location: 'Campanie',
      condition: 93,
      annualCost: 3000,
      lastMaintenance: 'Calendes de Mai'
    },
    {
      id: 'prop4',
      name: 'Domaine Oléicole',
      type: 'Domaine rural',
      location: 'Apulie',
      condition: 45,
      annualCost: 4500,
      lastMaintenance: 'Ides de Décembre',
      upcomingIssue: 'Systèmes d\'irrigation endommagés'
    },
    {
      id: 'prop5',
      name: 'Statue du Forum',
      type: 'Monument',
      location: 'Rome - Forum',
      condition: 78,
      annualCost: 500,
      lastMaintenance: 'Nones de Février'
    }
  ]);
  
  // Fonction pour déterminer le statut en fonction de la condition
  const getStatusFromCondition = (condition: number): PropertyStatus => {
    if (condition >= 90) return 'excellent';
    if (condition >= 75) return 'good';
    if (condition >= 50) return 'fair';
    if (condition >= 25) return 'poor';
    return 'critical';
  };
  
  // Fonction pour obtenir les classes de couleur en fonction du statut
  const getStatusColor = (status: PropertyStatus): string => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-emerald-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-orange-500';
      case 'critical': return 'text-red-600';
    }
  };
  
  // Fonction pour obtenir la couleur de la barre de progression
  const getProgressColor = (condition: number): string => {
    if (condition >= 90) return 'bg-green-600';
    if (condition >= 75) return 'bg-emerald-500';
    if (condition >= 50) return 'bg-yellow-500';
    if (condition >= 25) return 'bg-orange-500';
    return 'bg-red-600';
  };
  
  // Fonction pour effectuer l'entretien
  const performMaintenance = (propertyId: string, level: 'basic' | 'standard' | 'premium') => {
    setProperties(properties.map(property => {
      if (property.id === propertyId) {
        let conditionIncrease = 0;
        let maintenanceCost = 0;
        
        switch (level) {
          case 'basic':
            conditionIncrease = 10;
            maintenanceCost = Math.round(property.annualCost * 0.5);
            break;
          case 'standard':
            conditionIncrease = 25;
            maintenanceCost = property.annualCost;
            break;
          case 'premium':
            conditionIncrease = 50;
            maintenanceCost = Math.round(property.annualCost * 2);
            break;
        }
        
        return {
          ...property,
          condition: Math.min(100, property.condition + conditionIncrease),
          lastMaintenance: 'Aujourd\'hui',
          upcomingIssue: undefined, // L'entretien résout le problème imminent
        };
      }
      return property;
    }));
    
    // Simulation d'un toast de confirmation
    window.alert(`Entretien ${level} effectué avec succès !`);
  };
  
  // Tri des propriétés par condition (les plus mauvaises d'abord)
  const sortedProperties = [...properties].sort((a, b) => a.condition - b.condition);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-4">
        <div>
          <h3 className="font-cinzel text-lg text-rome-navy">État des Propriétés</h3>
          <p className="text-sm text-muted-foreground">
            Surveillez et maintenez en bon état toutes vos propriétés pour maximiser leurs avantages.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-xs roman-btn-outline"
            onClick={() => window.alert("Fonction en développement.")}
          >
            Rapport détaillé
          </Button>
          <Button 
            className="text-xs roman-btn"
            onClick={() => window.alert("Fonction en développement.")}
          >
            Entretien général
          </Button>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-600"></div>
          <span>Excellent</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span>Bon</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span>Correct</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span>Médiocre</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-600"></div>
          <span>Critique</span>
        </div>
      </div>
      
      {/* Properties list */}
      <div className="space-y-4">
        {sortedProperties.map(property => {
          const status = getStatusFromCondition(property.condition);
          const statusColor = getStatusColor(status);
          const progressColor = getProgressColor(property.condition);
          
          return (
            <div 
              key={property.id} 
              className="border border-rome-gold/30 rounded-md p-4 bg-white"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-cinzel text-rome-navy text-lg">{property.name}</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{property.type}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{property.location}</span>
                      </div>
                    </div>
                    {property.upcomingIssue && (
                      <div className="bg-amber-50 text-amber-800 px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium border border-amber-200">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Problème à traiter</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span>État:</span>
                      <span className={statusColor}>
                        {status === 'excellent' && 'Excellent'}
                        {status === 'good' && 'Bon'}
                        {status === 'fair' && 'Correct'}
                        {status === 'poor' && 'Médiocre'}
                        {status === 'critical' && 'Critique'}
                      </span>
                    </div>
                    <Progress 
                      value={property.condition} 
                      className="h-2 bg-gray-100"
                      indicatorClassName={progressColor} 
                    />
                  </div>
                  
                  {property.upcomingIssue && (
                    <div className="text-sm mt-2">
                      <span className="font-medium">Problème à résoudre:</span>
                      <span className="text-muted-foreground ml-2">{property.upcomingIssue}</span>
                    </div>
                  )}
                  
                  <div className="text-sm">
                    <span className="font-medium">Dernier entretien:</span>
                    <span className="text-muted-foreground ml-2">{property.lastMaintenance}</span>
                  </div>
                </div>
                
                <div className="border-t md:border-t-0 md:border-l border-rome-gold/20 pt-3 md:pt-0 md:pl-4 flex flex-col justify-center gap-2">
                  <div className="text-sm mb-2">
                    <span className="font-medium">Coût annuel:</span>
                    <span className="text-muted-foreground ml-2">{property.annualCost} As</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs roman-btn-outline justify-between" 
                      onClick={() => performMaintenance(property.id, 'basic')}
                    >
                      <span>Entretien minimal</span>
                      <span className="font-medium">{Math.round(property.annualCost * 0.5)} As</span>
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full text-xs roman-btn justify-between" 
                      onClick={() => performMaintenance(property.id, 'standard')}
                    >
                      <span>Entretien standard</span>
                      <span className="font-medium">{property.annualCost} As</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs roman-btn-outline justify-between" 
                      onClick={() => performMaintenance(property.id, 'premium')}
                    >
                      <span>Entretien premium</span>
                      <span className="font-medium">{Math.round(property.annualCost * 2)} As</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
