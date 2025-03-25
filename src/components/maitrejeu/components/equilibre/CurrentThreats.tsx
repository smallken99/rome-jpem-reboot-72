
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';

interface Threat {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

interface CurrentThreatsProps {
  threats: Threat[];
}

export const CurrentThreats: React.FC<CurrentThreatsProps> = ({ threats }) => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <AlertOctagon className="h-3 w-3 mr-1" />
            Élevée
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Moyenne
          </Badge>
        );
      case 'low':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Faible
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-3">
      {threats.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">
          Aucune menace détectée actuellement.
        </p>
      ) : (
        threats.map((threat) => (
          <div 
            key={threat.id} 
            className={`p-3 rounded-md border ${
              threat.severity === 'high' ? 'border-red-200 bg-red-50' : 
              threat.severity === 'medium' ? 'border-amber-200 bg-amber-50' : 
              'border-blue-200 bg-blue-50'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-sm">{threat.name}</h4>
              {getSeverityBadge(threat.severity)}
            </div>
            <p className="text-sm text-muted-foreground">
              {threat.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
