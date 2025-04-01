
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Check, 
  AlertCircle,
  Info
} from 'lucide-react';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';
import { Badge } from '@/components/ui/badge';

interface EquilibreEffectsProps {
  equilibre: Equilibre;
  impactLog: Array<{ 
    type: string; 
    changes: Partial<Equilibre>; 
    impact: Record<string, number>; 
    timestamp: Date 
  }>;
}

export const EquilibreEffects: React.FC<EquilibreEffectsProps> = ({ equilibre, impactLog }) => {
  // Calculer les risques et opportunités actuels
  const calculateCurrentRisksAndOpportunities = () => {
    const risks = [];
    const opportunities = [];
    
    // Risques politiques
    if (equilibre.politique.populaires > 60) {
      risks.push({
        id: 'populares_strong',
        label: 'Pouvoir populaire excessif',
        description: 'Les populares gagnent trop d\'influence, risque de révolte des optimates',
        severity: 'medium',
        area: 'politique'
      });
    }
    
    if (equilibre.politique.optimates > 60) {
      risks.push({
        id: 'optimates_strong',
        label: 'Pouvoir conservateur excessif',
        description: 'Les optimates dominent le Sénat, risque de révolte plébéienne',
        severity: 'medium',
        area: 'politique'
      });
    }
    
    if (Math.abs(equilibre.politique.populaires - equilibre.politique.optimates) > 40) {
      risks.push({
        id: 'political_polarization',
        label: 'Polarisation politique extrême',
        description: 'La République est profondément divisée entre factions',
        severity: 'high',
        area: 'politique'
      });
    }
    
    // Opportunités politiques
    if (equilibre.politique.moderates > 40) {
      opportunities.push({
        id: 'moderate_influence',
        label: 'Influence modérée forte',
        description: 'Période favorable aux réformes équilibrées',
        impact: 'Stabilité politique accrue',
        area: 'politique'
      });
    }
    
    // Risques économiques
    if (equilibre.economie.stabilite < 30) {
      risks.push({
        id: 'economic_instability',
        label: 'Instabilité économique',
        description: 'L\'économie est fragile et susceptible de s\'effondrer',
        severity: 'high',
        area: 'economie'
      });
    }
    
    if (equilibre.economie.agriculture < 40) {
      risks.push({
        id: 'food_shortage',
        label: 'Risque de pénurie alimentaire',
        description: 'La production agricole est insuffisante',
        severity: 'critical',
        area: 'economie'
      });
    }
    
    // Opportunités économiques
    if (equilibre.economie.commerce > 70) {
      opportunities.push({
        id: 'trade_boom',
        label: 'Boom commercial',
        description: 'Le commerce est florissant',
        impact: 'Revenus accrus, opportunités d\'expansion',
        area: 'economie'
      });
    }
    
    // Risques militaires
    if (equilibre.militaire.moral < 50) {
      risks.push({
        id: 'low_morale',
        label: 'Moral des troupes bas',
        description: 'Les légions sont démotivées',
        severity: 'medium',
        area: 'militaire'
      });
    }
    
    // Opportunités militaires
    if (equilibre.militaire.discipline > 75 && equilibre.militaire.equipement > 70) {
      opportunities.push({
        id: 'military_excellence',
        label: 'Excellence militaire',
        description: 'Les légions sont bien équipées et disciplinées',
        impact: 'Possibilité de campagnes militaires victorieuses',
        area: 'militaire'
      });
    }
    
    // Risques sociaux
    if ((equilibre.social.cohesion || 50) < 30) {
      risks.push({
        id: 'social_unrest',
        label: 'Troubles sociaux',
        description: 'La population est mécontente et agitée',
        severity: 'high',
        area: 'social'
      });
    }
    
    if (Math.abs(equilibre.social.patriciens - equilibre.social.plebeiens) > 60) {
      risks.push({
        id: 'class_inequality',
        label: 'Inégalités de classe extrêmes',
        description: 'Écart dangereux entre patriciens et plébéiens',
        severity: 'high',
        area: 'social'
      });
    }
    
    // Risques religieux
    if (equilibre.religion.piete < 40) {
      risks.push({
        id: 'divine_disfavor',
        label: 'Défaveur divine',
        description: 'Les dieux sont mécontents du manque de piété',
        severity: 'medium',
        area: 'religion'
      });
    }
    
    if (equilibre.religion.superstition > 80) {
      risks.push({
        id: 'superstition',
        label: 'Superstition excessive',
        description: 'La population est excessivement superstitieuse',
        severity: 'low',
        area: 'religion'
      });
    }
    
    // Opportunités religieuses
    if (equilibre.religion.piete > 80) {
      opportunities.push({
        id: 'divine_favor',
        label: 'Faveur divine',
        description: 'Les dieux sont satisfaits de la piété romaine',
        impact: 'Augmentation du soutien populaire, prestige religieux',
        area: 'religion'
      });
    }
    
    return { risks, opportunities };
  };

  const { risks, opportunities } = calculateCurrentRisksAndOpportunities();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'high':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getAreaColor = (area: string) => {
    switch (area) {
      case 'politique':
        return 'bg-purple-100 text-purple-800';
      case 'economie':
        return 'bg-green-100 text-green-800';
      case 'militaire':
        return 'bg-red-100 text-red-800';
      case 'social':
        return 'bg-blue-100 text-blue-800';
      case 'religion':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Risques actuels */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" /> 
            Risques actuels ({risks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {risks.length === 0 ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Aucun risque majeur détecté
            </div>
          ) : (
            <div className="space-y-3">
              {risks.map(risk => (
                <div key={risk.id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      {getSeverityIcon(risk.severity)}
                      <span className="font-medium ml-2">{risk.label}</span>
                    </div>
                    <Badge className={getAreaColor(risk.area)}>
                      {risk.area}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Opportunités */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" /> 
            Opportunités ({opportunities.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {opportunities.length === 0 ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Info className="h-4 w-4 mr-2" />
              Aucune opportunité majeure pour le moment
            </div>
          ) : (
            <div className="space-y-3">
              {opportunities.map(opportunity => (
                <div key={opportunity.id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium ml-2">{opportunity.label}</span>
                    </div>
                    <Badge className={getAreaColor(opportunity.area)}>
                      {opportunity.area}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                  <p className="text-sm font-medium mt-1 text-green-600">{opportunity.impact}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Journal des impacts récents */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-500" /> 
            Journal des impacts récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {impactLog.length === 0 ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              Aucun changement récent enregistré
            </div>
          ) : (
            <div className="space-y-3">
              {impactLog.slice(0, 5).map((event, index) => (
                <div key={index} className="border-b pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm capitalize">
                      {event.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(event.impact)
                      .filter(([_, value]) => Math.abs(value) > 5)
                      .slice(0, 4)
                      .map(([key, value]) => (
                        <div key={key} className="flex items-center text-xs">
                          {value > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                          )}
                          <span>{key}: {value > 0 ? '+' : ''}{value}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
