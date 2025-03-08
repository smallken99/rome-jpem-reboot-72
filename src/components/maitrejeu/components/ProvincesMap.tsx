
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Province } from '../types/maitreJeuTypes';

interface ProvincesMapProps {
  provinces: Province[];
  onSelectProvince: (province: Province) => void;
}

export const ProvincesMap: React.FC<ProvincesMapProps> = ({ provinces, onSelectProvince }) => {
  // Dans une application réelle, nous aurions une vraie carte interactive
  // Pour l'instant, nous simulons avec une représentation simplifiée
  
  const getProvinceColor = (statut: string) => {
    switch (statut) {
      case 'pacifiée': return '#90be6d';
      case 'instable': return '#f9c74f';
      case 'en révolte': return '#f94144';
      case 'en guerre': return '#800000';
      default: return '#adb5bd';
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Carte de l'Empire Romain</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] bg-slate-100 border rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-rome-parchment opacity-30"></div>
          
          {/* Représentation simplifiée des provinces */}
          <svg 
            viewBox="0 0 800 600" 
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
          >
            {/* Fond de la mer Méditerranée */}
            <rect x="50" y="100" width="700" height="400" fill="#8ecae6" rx="5" />
            
            {/* Contours stylisés de terres */}
            <path d="M50,100 C150,150 250,180 350,170 C450,160 550,130 650,150 L750,100 L50,100 Z" fill="#dda15e" />
            <path d="M50,500 C150,450 250,420 350,430 C450,440 550,470 650,450 L750,500 L50,500 Z" fill="#bc6c25" />
            
            {/* Placement des provinces basé sur leurs coordonnées */}
            {provinces.map((province) => (
              <g 
                key={province.id} 
                onClick={() => onSelectProvince(province)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={province.coordonnées.x}
                  cy={province.coordonnées.y}
                  r={20 + Math.sqrt(province.population / 100000)}
                  fill={getProvinceColor(province.statut)}
                  opacity={0.7}
                  stroke="#333"
                  strokeWidth="1"
                />
                <text
                  x={province.coordonnées.x}
                  y={province.coordonnées.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#333"
                >
                  {province.nom}
                </text>
              </g>
            ))}
          </svg>
          
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md">
            <div className="text-sm font-medium mb-1">Légende</div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#90be6d' }}></div>
              <span>Pacifiée</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f9c74f' }}></div>
              <span>Instable</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f94144' }}></div>
              <span>En révolte</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#800000' }}></div>
              <span>En guerre</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Cliquez sur une province pour en voir les détails et la gérer.</p>
        </div>
      </CardContent>
    </Card>
  );
};
