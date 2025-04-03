
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, ScrollText, Swords, Crown } from 'lucide-react';

interface ReputationStatusProps {
  overall: number;
  plebs: number;
  patricians: number;
  senate: number;
  military: number;
}

export const ReputationStatus: React.FC<ReputationStatusProps> = ({
  overall,
  plebs,
  patricians,
  senate,
  military
}) => {
  const getReputationLevel = (value: number) => {
    if (value >= 80) return { title: 'Excellente', color: 'bg-green-500' };
    if (value >= 60) return { title: 'Bonne', color: 'bg-green-400' };
    if (value >= 40) return { title: 'Moyenne', color: 'bg-yellow-400' };
    if (value >= 20) return { title: 'Faible', color: 'bg-orange-400' };
    return { title: 'Mauvaise', color: 'bg-red-500' };
  };
  
  const overallRep = getReputationLevel(overall);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-2">
          <span className="text-lg font-semibold">Réputation Globale:</span>
          <Badge className="ml-2" variant="outline">
            {overallRep.title}
          </Badge>
        </div>
        <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${overallRep.color} transition-all duration-500`} 
            style={{ width: `${overall}%` }}
          ></div>
        </div>
        <span className="mt-1 text-sm font-medium">{overall}%</span>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold">Réputation par Faction</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-500" />
              <span>Plèbe</span>
            </div>
            <span className="font-medium">{plebs}%</span>
          </div>
          <Progress value={plebs} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-purple-500" />
              <span>Patriciens</span>
            </div>
            <span className="font-medium">{patricians}%</span>
          </div>
          <Progress value={patricians} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ScrollText className="h-4 w-4 text-blue-500" />
              <span>Sénat</span>
            </div>
            <span className="font-medium">{senate}%</span>
          </div>
          <Progress value={senate} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Swords className="h-4 w-4 text-red-500" />
              <span>Militaire</span>
            </div>
            <span className="font-medium">{military}%</span>
          </div>
          <Progress value={military} className="h-2" />
        </div>
      </div>
    </div>
  );
};
