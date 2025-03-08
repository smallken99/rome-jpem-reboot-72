
import React from 'react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, Users, Swords, Scale, Globe, Building } from 'lucide-react';

export const EquilibreBarChart: React.FC = () => {
  const { equilibre } = useMaitreJeu();
  
  const getValueColor = (value: number): string => {
    if (value < 30) return 'bg-red-500';
    if (value < 50) return 'bg-amber-500';
    if (value < 70) return 'bg-emerald-500';
    return 'bg-green-600';
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">État de la République</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              <span>Plébéiens</span>
            </div>
            <span className="text-sm font-medium">{equilibre.plebeiens}%</span>
          </div>
          <Progress value={equilibre.plebeiens} className={`h-2 ${getValueColor(equilibre.plebeiens)}`} />
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-500" />
              <span>Patriciens</span>
            </div>
            <span className="text-sm font-medium">{equilibre.patriciens}%</span>
          </div>
          <Progress value={equilibre.patriciens} className={`h-2 ${getValueColor(equilibre.patriciens)}`} />
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Swords className="h-5 w-5 mr-2 text-red-500" />
              <span>Armée</span>
            </div>
            <span className="text-sm font-medium">{equilibre.armée}%</span>
          </div>
          <Progress value={equilibre.armée} className={`h-2 ${getValueColor(equilibre.armée)}`} />
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-500" />
              <span>Religion</span>
            </div>
            <span className="text-sm font-medium">{equilibre.religion}%</span>
          </div>
          <Progress value={equilibre.religion} className={`h-2 ${getValueColor(equilibre.religion)}`} />
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-amber-500" />
              <span>Économie</span>
            </div>
            <span className="text-sm font-medium">{equilibre.économie}%</span>
          </div>
          <Progress value={equilibre.économie} className={`h-2 ${getValueColor(equilibre.économie)}`} />
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Scale className="h-5 w-5 mr-2 text-indigo-500" />
              <span>Diplomatie</span>
            </div>
            <span className="text-sm font-medium">{equilibre.diplomatie}%</span>
          </div>
          <Progress value={equilibre.diplomatie} className={`h-2 ${getValueColor(equilibre.diplomatie)}`} />
        </div>
      </CardContent>
    </Card>
  );
};
