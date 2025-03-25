
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';

interface EquilibreStatusProps {
  equilibre: Equilibre;
}

export const EquilibreStatus: React.FC<EquilibreStatusProps> = ({ equilibre }) => {
  // Calculer l'état général de l'équilibre
  const calculateOverallStatus = () => {
    const values = [
      equilibre.populares,
      equilibre.optimates,
      equilibre.moderates,
      equilibre.armée,
      equilibre.loyauté,
      equilibre.morale,
      equilibre.économie,
      equilibre.patriciens,
      equilibre.plébéiens
    ];
    
    // Déséquilibre entre factions
    const factionsBalance = Math.abs(equilibre.populares - equilibre.optimates);
    
    // Déséquilibre social
    const socialBalance = Math.abs(equilibre.patriciens - equilibre.plébéiens);
    
    // Points critiques
    const criticalPoints = values.filter(v => v < 30).length;
    const lowPoints = values.filter(v => v >= 30 && v < 50).length;
    
    if (criticalPoints > 0 || factionsBalance > 40 || socialBalance > 40) {
      return {
        status: 'critical',
        message: 'Déséquilibre critique',
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        description: 'La République fait face à une instabilité dangereuse qui menace sa cohésion.'
      };
    } else if (lowPoints > 2 || factionsBalance > 25 || socialBalance > 30) {
      return {
        status: 'warning',
        message: 'Tensions élevées',
        icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
        description: 'Des tensions importantes existent, une intervention est recommandée.'
      };
    } else {
      return {
        status: 'stable',
        message: 'Équilibre satisfaisant',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        description: 'La République est actuellement dans un état d\'équilibre acceptable.'
      };
    }
  };
  
  const overallStatus = calculateOverallStatus();
  
  // Recommandations basées sur l'état actuel
  const getRecommendations = () => {
    const recommendations = [];
    
    if (equilibre.plébéiens < 50) {
      recommendations.push('Proposer des lois favorables à la plèbe pour améliorer leur satisfaction.');
    }
    
    if (equilibre.économie < 60) {
      recommendations.push('Envisager des réformes économiques pour stabiliser les finances de la République.');
    }
    
    if (equilibre.armée < 60) {
      recommendations.push('Renforcer l\'armée et augmenter sa présence dans les provinces stratégiques.');
    }
    
    const factionsDiff = Math.abs(equilibre.populares - equilibre.optimates);
    if (factionsDiff > 25) {
      recommendations.push('Chercher un compromis entre Populares et Optimates pour réduire les tensions.');
    }
    
    return recommendations.length > 0 ? recommendations : ['Continuer à surveiller la situation.'];
  };
  
  const recommendations = getRecommendations();
  
  return (
    <Card className={`
      ${overallStatus.status === 'critical' ? 'border-red-200 bg-red-50' : ''}
      ${overallStatus.status === 'warning' ? 'border-amber-200 bg-amber-50' : ''}
      ${overallStatus.status === 'stable' ? 'border-green-200 bg-green-50' : ''}
    `}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            {overallStatus.icon}
            <span className="font-medium">{overallStatus.message}</span>
          </div>
          <Badge 
            variant="outline" 
            className={`
              ${overallStatus.status === 'critical' ? 'bg-red-100 text-red-800 border-red-200' : ''}
              ${overallStatus.status === 'warning' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
              ${overallStatus.status === 'stable' ? 'bg-green-100 text-green-800 border-green-200' : ''}
            `}
          >
            {overallStatus.status === 'critical' ? 'Critique' : ''}
            {overallStatus.status === 'warning' ? 'Attention' : ''}
            {overallStatus.status === 'stable' ? 'Stable' : ''}
          </Badge>
        </div>
        
        <p className="text-sm mb-3">{overallStatus.description}</p>
        
        <div className="mt-3">
          <h4 className="text-sm font-medium mb-2">Recommandations:</h4>
          <ul className="text-sm space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
