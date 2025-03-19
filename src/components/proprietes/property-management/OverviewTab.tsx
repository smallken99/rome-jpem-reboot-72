
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin, Coins, Users } from 'lucide-react';
import { OwnedBuilding } from '../types/buildingTypes';
import { formatNumber } from '@/utils/formatUtils';

interface OverviewTabProps {
  building: OwnedBuilding;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ building }) => {
  const getConditionText = (condition: number) => {
    if (condition >= 90) return 'Excellent';
    if (condition >= 70) return 'Bon';
    if (condition >= 50) return 'Correct';
    if (condition >= 30) return 'Détérioré';
    return 'Mauvais';
  };

  const getConditionClass = (condition: number) => {
    if (condition >= 90) return 'text-green-600';
    if (condition >= 70) return 'text-green-500';
    if (condition >= 50) return 'text-amber-500';
    if (condition >= 30) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 mt-0.5 text-slate-700" />
              <div>
                <p className="text-sm font-medium text-slate-500">Type de propriété</p>
                <p className="font-medium">
                  {building.type === 'urban' ? 'Propriété urbaine' : 
                   building.type === 'rural' ? 'Propriété rurale' : 
                   building.type === 'religious' ? 'Propriété religieuse' : 'Autre'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-0.5 text-slate-700" />
              <div>
                <p className="text-sm font-medium text-slate-500">Localisation</p>
                <p className="font-medium">{building.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Coins className="h-5 w-5 mt-0.5 text-slate-700" />
              <div>
                <p className="text-sm font-medium text-slate-500">Revenu annuel</p>
                <p className="font-medium">{formatNumber(building.income)} as</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 mt-0.5 text-slate-700" />
              <div>
                <p className="text-sm font-medium text-slate-500">Personnel</p>
                <p className="font-medium">{building.workers} personnes</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-slate-500 mb-2">État de la propriété</h3>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  building.condition >= 90 ? 'bg-green-600' : 
                  building.condition >= 70 ? 'bg-green-500' : 
                  building.condition >= 50 ? 'bg-amber-500' : 
                  building.condition >= 30 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${building.condition}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className={getConditionClass(building.condition)}>
                {getConditionText(building.condition)} ({building.condition}%)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {building.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">{building.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
