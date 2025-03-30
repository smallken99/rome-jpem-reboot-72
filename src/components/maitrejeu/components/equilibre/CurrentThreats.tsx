
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';

interface Threat {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  domain: 'political' | 'economic' | 'military' | 'social' | 'religious';
}

interface CurrentThreatsProps {
  threats: Threat[];
}

export const CurrentThreats: React.FC<CurrentThreatsProps> = ({ threats }) => {
  const getSeverityColor = (severity: Threat['severity']) => {
    switch (severity) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-amber-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Menaces actuelles
        </CardTitle>
      </CardHeader>
      <CardContent>
        {threats.length > 0 ? (
          <ul className="space-y-2">
            {threats.map((threat) => (
              <li key={threat.id} className="border rounded-md p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className={`h-4 w-4 ${getSeverityColor(threat.severity)}`} />
                  <span className="font-medium">{threat.name}</span>
                  <span className={`text-xs ml-auto ${getSeverityColor(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{threat.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-4 text-muted-foreground">
            Aucune menace significative détectée
          </p>
        )}
      </CardContent>
    </Card>
  );
};
