
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, AlertTriangle, ArrowDown, ArrowUp, Check, Info } from 'lucide-react';
import { Equilibre } from '../../types/equilibre';
import { normalizeEconomie, getEquilibreValue } from '../../utils/equilibreAdapter';

interface SocialTensionsProps {
  equilibre: Equilibre;
  onUpdateSocial: (value: any) => void;
}

export const SocialTensions: React.FC<SocialTensionsProps> = ({ equilibre, onUpdateSocial }) => {
  // Use normalize functions to make sure we work with the correct type regardless of input
  const economieObj = normalizeEconomie(equilibre);
  
  // State for the economic stability value
  const [economieValue, setEconomieValue] = useState<number>(
    getEquilibreValue(equilibre.economie)
  );
  
  // Update when the equilibre changes
  useEffect(() => {
    setEconomieValue(getEquilibreValue(equilibre.economie));
  }, [equilibre]);
  
  // Get tension level based on values
  const getTensionLevel = (patricians: number, plebeians: number, economy: number) => {
    const difference = Math.abs(patricians - plebeians);
    
    if (economy < 30 || difference > 50) {
      return {
        level: 'Élevée',
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        color: 'bg-red-100 text-red-800',
        description: 'Des troubles civils sont imminents. Une intervention immédiate est nécessaire.'
      };
    } else if (economy < 50 || difference > 30) {
      return {
        level: 'Modérée',
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        color: 'bg-amber-100 text-amber-800',
        description: 'Les tensions augmentent. Des mesures préventives sont recommandées.'
      };
    } else if (economy < 70 || difference > 15) {
      return {
        level: 'Faible',
        icon: <Info className="h-5 w-5 text-blue-500" />,
        color: 'bg-blue-100 text-blue-800',
        description: 'Situation stable mais à surveiller.'
      };
    } else {
      return {
        level: 'Minimale',
        icon: <Check className="h-5 w-5 text-green-500" />,
        color: 'bg-green-100 text-green-800',
        description: 'Harmonie sociale. Aucune mesure particulière n\'est requise.'
      };
    }
  };
  
  // Get the current tension level
  const tensionLevel = getTensionLevel(
    equilibre.patriciens, 
    equilibre.plébéiens, 
    economieValue
  );
  
  // Calculate if the different factors are contributing to peace or tension
  const factorAnalysis = {
    patricianWealth: {
      status: equilibre.patriciens > 70 ? 'positive' : equilibre.patriciens < 40 ? 'negative' : 'neutral',
      icon: equilibre.patriciens > 70 ? <ArrowUp className="h-4 w-4 text-green-500" /> : 
            equilibre.patriciens < 40 ? <ArrowDown className="h-4 w-4 text-red-500" /> : 
            <Check className="h-4 w-4 text-blue-500" />,
      description: equilibre.patriciens > 70 ? 
                  'La prospérité des patriciens stabilise la société' : 
                  equilibre.patriciens < 40 ? 
                  'La pauvreté des patriciens provoque du mécontentement' : 
                  'La richesse patricienne est équilibrée'
    },
    plebeianWelfare: {
      status: equilibre.plébéiens > 60 ? 'positive' : equilibre.plébéiens < 30 ? 'negative' : 'neutral',
      icon: equilibre.plébéiens > 60 ? <ArrowUp className="h-4 w-4 text-green-500" /> : 
            equilibre.plébéiens < 30 ? <ArrowDown className="h-4 w-4 text-red-500" /> : 
            <Check className="h-4 w-4 text-blue-500" />,
      description: equilibre.plébéiens > 60 ? 
                  'Le bien-être des plébéiens favorise la paix sociale' : 
                  equilibre.plébéiens < 30 ? 
                  'La misère des plébéiens pourrait mener à des révoltes' : 
                  'Les plébéiens sont relativement satisfaits'
    },
    economy: {
      status: economieValue > 70 ? 'positive' : economieValue < 40 ? 'negative' : 'neutral',
      icon: economieValue > 70 ? <ArrowUp className="h-4 w-4 text-green-500" /> : 
            economieValue < 40 ? <ArrowDown className="h-4 w-4 text-red-500" /> : 
            <Check className="h-4 w-4 text-blue-500" />,
      description: economieValue > 70 ? 
                  'L\'économie florissante apaise les tensions sociales' : 
                  economieValue < 40 ? 
                  'Les difficultés économiques exacerbent les tensions' : 
                  'L\'économie est stable'
    },
    inequality: {
      status: Math.abs(equilibre.patriciens - equilibre.plébéiens) < 20 ? 'positive' : 
              Math.abs(equilibre.patriciens - equilibre.plébéiens) > 50 ? 'negative' : 'neutral',
      icon: Math.abs(equilibre.patriciens - equilibre.plébéiens) < 20 ? <ArrowUp className="h-4 w-4 text-green-500" /> : 
            Math.abs(equilibre.patriciens - equilibre.plébéiens) > 50 ? <ArrowDown className="h-4 w-4 text-red-500" /> : 
            <Check className="h-4 w-4 text-blue-500" />,
      description: Math.abs(equilibre.patriciens - equilibre.plébéiens) < 20 ? 
                  'Faible inégalité entre les classes sociales' : 
                  Math.abs(equilibre.patriciens - equilibre.plébéiens) > 50 ? 
                  'Forte inégalité entre patriciens et plébéiens' : 
                  'Inégalité modérée entre les classes'
    }
  };
  
  // Handlers for the policy buttons
  const handleDistributeGrain = () => {
    if (economieValue < 30) {
      return;  // Can't afford it in bad economy
    }
    
    // Improve plebeian welfare at the cost of some economy
    onUpdateSocial({
      plébéiens: Math.min(100, equilibre.plébéiens + 10),
      economie: economieObj.stabilite > 20 ? 
        {
          stabilite: economieObj.stabilite - 5,
          croissance: economieObj.croissance,
          commerce: economieObj.commerce,
          agriculture: economieObj.agriculture + 5
        } : economieObj
    });
  };
  
  const handleIncreaseTaxes = () => {
    // Increase patrician welfare at the cost of plebeian welfare
    onUpdateSocial({
      patriciens: Math.min(100, equilibre.patriciens + 8),
      plébéiens: Math.max(10, equilibre.plébéiens - 5),
      economie: {
        stabilite: economieObj.stabilite,
        croissance: economieObj.croissance + 3,
        commerce: economieObj.commerce + 5,
        agriculture: economieObj.agriculture - 3
      }
    });
  };
  
  const handlePublicWorks = () => {
    if (economieValue < 40) {
      return;  // Can't afford it in bad economy
    }
    
    // Improve both welfare metrics at a cost to economy
    onUpdateSocial({
      patriciens: Math.min(100, equilibre.patriciens + 5),
      plébéiens: Math.min(100, equilibre.plébéiens + 8),
      economie: {
        stabilite: Math.max(10, economieObj.stabilite - 8),
        croissance: economieObj.croissance + 5,
        commerce: economieObj.commerce + 5,
        agriculture: economieObj.agriculture
      }
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tensions Sociales</CardTitle>
        <CardDescription>
          Analyse des rapports entre patriciens et plébéiens
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Tension Level Indicator */}
          <div className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
            <div className="flex items-center">
              {tensionLevel.icon}
              <div className="ml-3">
                <p className="font-medium">Niveau de tension: <span className={`px-2 py-1 rounded-full text-sm ${tensionLevel.color}`}>{tensionLevel.level}</span></p>
                <p className="text-sm text-muted-foreground">{tensionLevel.description}</p>
              </div>
            </div>
          </div>
          
          {/* Class Balance */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-medium">Patriciens</p>
              <p className="text-sm font-medium">Plébéiens</p>
            </div>
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 float-left rounded-l-full" 
                style={{ width: `${equilibre.patriciens}%` }}
              />
              <div 
                className="h-full bg-amber-500 float-right rounded-r-full" 
                style={{ width: `${equilibre.plébéiens}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-purple-700">{equilibre.patriciens}%</p>
              <p className="text-xs text-amber-700">{equilibre.plébéiens}%</p>
            </div>
          </div>
          
          <Separator />
          
          {/* Contributing Factors */}
          <div>
            <h3 className="text-sm font-medium mb-3">Facteurs d'influence</h3>
            <div className="space-y-3">
              {Object.entries(factorAnalysis).map(([key, factor]) => (
                <div key={key} className="flex justify-between items-center">
                  <div className="flex items-center">
                    {factor.icon}
                    <span className="ml-2 text-sm">{factor.description}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    factor.status === 'positive' ? 'bg-green-100 text-green-800' :
                    factor.status === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {factor.status === 'positive' ? 'Favorable' :
                     factor.status === 'negative' ? 'Défavorable' :
                     'Neutre'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Policy Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-3">Politiques possibles</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                onClick={handleDistributeGrain}
                disabled={economieValue < 30}
                variant={economieValue < 30 ? "outline" : "default"}
              >
                Distribution de grain
              </Button>
              <Button 
                size="sm" 
                onClick={handleIncreaseTaxes}
                variant="outline"
              >
                Augmentation des taxes
              </Button>
              <Button 
                size="sm" 
                onClick={handlePublicWorks}
                disabled={economieValue < 40}
                variant={economieValue < 40 ? "outline" : "secondary"}
              >
                Travaux publics
              </Button>
            </div>
            {economieValue < 40 && (
              <p className="text-xs text-muted-foreground mt-2">
                Certaines politiques ne sont pas disponibles en raison de la situation économique.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
