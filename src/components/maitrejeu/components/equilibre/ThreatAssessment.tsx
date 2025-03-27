
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield } from 'lucide-react';

interface Threat {
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  description: string;
  impactAreas: string[];
  timeframe: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
}

interface ThreatAssessmentProps {
  threats: Threat[];
}

export const ThreatAssessment: React.FC<ThreatAssessmentProps> = ({ threats }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getTimeframeText = (timeframe: string) => {
    switch (timeframe) {
      case 'immediate': return 'Immédiat';
      case 'short-term': return 'Court terme';
      case 'medium-term': return 'Moyen terme';
      case 'long-term': return 'Long terme';
      default: return timeframe;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Évaluation des Menaces
        </CardTitle>
      </CardHeader>
      <CardContent>
        {threats.length > 0 ? (
          <div className="space-y-4">
            {threats.map((threat) => (
              <div 
                key={threat.id}
                className={`p-3 border rounded-md ${getLevelColor(threat.level)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{threat.name}</h3>
                  <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/70">
                    {threat.level === 'low' ? 'Faible' : 
                     threat.level === 'medium' ? 'Moyen' : 
                     threat.level === 'high' ? 'Élevé' : 
                     'Critique'}
                  </div>
                </div>
                
                <p className="text-sm mb-2">{threat.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs">
                  <div>
                    <span className="font-medium">Source:</span> {threat.source}
                  </div>
                  <div>
                    <span className="font-medium">Échéance:</span> {getTimeframeText(threat.timeframe)}
                  </div>
                </div>
                
                {threat.impactAreas.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {threat.impactAreas.map((area, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-0.5 rounded-full bg-white"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
            <p className="text-muted-foreground">
              Aucune menace identifiée pour le moment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThreatAssessment;
