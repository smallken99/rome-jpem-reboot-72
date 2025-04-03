
import React from 'react';
import { useMaitreJeu } from '../../context';
import { ProgressBar } from '@/components/ui/progress-bar';

export const StatsRepubliqueTab = () => {
  const { equilibre } = useMaitreJeu();
  
  // Safely extract stabilite
  const stabilite = typeof equilibre.stabilite === 'object' 
    ? equilibre.stabilite 
    : { value: equilibre.stabilite, trend: '', senat: 0, lois: 0, tribuns: 0 };
  
  // Handle politicians factions
  const factions = {
    optimates: equilibre.politique.optimates,
    populares: equilibre.politique.populares,
    moderates: equilibre.politique.moderates
  };
  
  // Economic stats as derived properties
  const economic = {
    stability: equilibre.economie.stabilite,
    growth: equilibre.economie.croissance,
    commerce: equilibre.economie.commerce
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Stabilité de la République</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Stabilité Générale</span>
              <span className="text-sm font-medium">{stabilite.value || 0}%</span>
            </div>
            <ProgressBar value={stabilite.value || 0} max={100} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Stabilité du Sénat</span>
              <span className="text-sm font-medium">{stabilite.senat || 0}%</span>
            </div>
            <ProgressBar value={stabilite.senat || 0} max={100} />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Factions Politiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Optimates</span>
              <span className="text-sm font-medium">{factions.optimates}%</span>
            </div>
            <ProgressBar 
              value={factions.optimates} 
              max={100} 
              indicatorClassName="bg-blue-600" 
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Populares</span>
              <span className="text-sm font-medium">{factions.populares}%</span>
            </div>
            <ProgressBar 
              value={factions.populares} 
              max={100}
              indicatorClassName="bg-red-600"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Modérés</span>
              <span className="text-sm font-medium">{factions.moderates}%</span>
            </div>
            <ProgressBar 
              value={factions.moderates} 
              max={100}
              indicatorClassName="bg-green-600"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Économie</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Stabilité Économique</span>
              <span className="text-sm font-medium">{economic.stability}%</span>
            </div>
            <ProgressBar value={economic.stability} max={100} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Croissance</span>
              <span className="text-sm font-medium">{economic.growth}%</span>
            </div>
            <ProgressBar value={economic.growth} max={100} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Commerce</span>
              <span className="text-sm font-medium">{economic.commerce}%</span>
            </div>
            <ProgressBar value={economic.commerce} max={100} />
          </div>
        </div>
      </div>
    </div>
  );
};
