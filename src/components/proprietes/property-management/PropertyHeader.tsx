
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Banknote, 
  AlertTriangle,
  ShoppingCart
} from 'lucide-react';
import { OwnedBuilding } from '../types/buildingTypes';
import { Badge } from '@/components/ui/badge';

interface PropertyHeaderProps {
  building: OwnedBuilding;
  onSell: () => void;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ building, onSell }) => {
  const getConditionColor = (condition: number) => {
    if (condition >= 90) return 'bg-green-100 text-green-800';
    if (condition >= 70) return 'bg-green-100 text-green-800';
    if (condition >= 50) return 'bg-amber-100 text-amber-800';
    if (condition >= 30) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };
  
  const getConditionText = (condition: number) => {
    if (condition >= 90) return 'Excellent';
    if (condition >= 70) return 'Bon';
    if (condition >= 50) return 'Correct';
    if (condition >= 30) return 'Détérioré';
    return 'Mauvais';
  };
  
  const getBuildingTypeLabel = (type: string) => {
    if (type === 'urban') return 'Propriété urbaine';
    if (type === 'rural') return 'Propriété rurale';
    if (type === 'religious') return 'Propriété religieuse';
    return type;
  };

  const handleSellClick = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir vendre cette propriété : ${building.name}?`)) {
      onSell();
    }
  };
  
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{building.name}</h1>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
            <div className="flex items-center text-sm text-gray-500">
              <Building className="mr-1.5 h-4 w-4" />
              <span>{getBuildingTypeLabel(building.type)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="mr-1.5 h-4 w-4" />
              <span>{building.location}</span>
            </div>

            <Badge className={getConditionColor(building.condition)}>
              {getConditionText(building.condition)} ({building.condition}%)
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {building.condition < 40 && (
            <Button variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50">
              <AlertTriangle className="mr-1.5 h-4 w-4" />
              Rénover
            </Button>
          )}
          
          <Button variant="outline" className="text-red-600 hover:bg-red-50" onClick={handleSellClick}>
            <ShoppingCart className="mr-1.5 h-4 w-4" />
            Vendre
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        <div className="bg-slate-50 rounded-md p-3">
          <div className="flex items-center">
            <Banknote className="h-5 w-5 text-slate-600 mr-2" />
            <span className="text-sm font-medium">Revenu annuel</span>
          </div>
          <p className="text-xl font-bold mt-1">{building.income} as</p>
        </div>
        
        <div className="bg-slate-50 rounded-md p-3">
          <div className="flex items-center">
            <Building className="h-5 w-5 text-slate-600 mr-2" />
            <span className="text-sm font-medium">Personnel</span>
          </div>
          <p className="text-xl font-bold mt-1">{building.workers} personnes</p>
        </div>
        
        <div className="bg-slate-50 rounded-md p-3">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-slate-600 mr-2" />
            <span className="text-sm font-medium">Niveau de maintenance</span>
          </div>
          <p className="text-xl font-bold mt-1">
            {building.maintenanceLevel} / 5
          </p>
        </div>
        
        <div className="bg-slate-50 rounded-md p-3">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-slate-600 mr-2" />
            <span className="text-sm font-medium">Niveau de sécurité</span>
          </div>
          <p className="text-xl font-bold mt-1">
            {building.securityLevel} / 5
          </p>
        </div>
      </div>
    </div>
  );
};
