
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Scale, 
  Users, 
  TrendingUp, 
  Landmark,
  GraduationCap,
  ShieldAlert
} from 'lucide-react';
import { Equilibre } from '../../types/equilibre';
import { Separator } from '@/components/ui/separator';

interface EquilibreOverviewProps {
  equilibre: Equilibre;
}

export const EquilibreOverview: React.FC<EquilibreOverviewProps> = ({ equilibre }) => {
  // Helper to compute a normalized stability score based on various factors
  const computeStabilityScore = (): number => {
    if (!equilibre) return 50;
    
    const social = (equilibre.social?.cohesion || 50) * 0.7 + 
                  (equilibre.social?.patriciens + equilibre.social?.plebeiens) / 2 * 0.3;
    
    const political = (equilibre.politique?.moderates || 34) * 0.5 + 
                     ((equilibre.stabilite?.senat || 50) + (equilibre.stabilite?.lois || 50)) / 2 * 0.5;
    
    const economic = (equilibre.economie?.stabilite || 50) * 0.6 + 
                    (equilibre.economie?.croissance || 50) * 0.4;
    
    const religious = (equilibre.religion?.piete || 50) * 0.4 + 
                     (equilibre.religion?.traditions || 50) * 0.6;
    
    return Math.round((social * 0.3 + political * 0.3 + economic * 0.25 + religious * 0.15));
  };
  
  const stabilityScore = computeStabilityScore();
  
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    if (score >= 25) return "text-orange-500";
    return "text-red-500";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    if (score >= 25) return "bg-orange-500";
    return "bg-red-500";
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Scale className="h-5 w-5" />
          État de la République
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Indice de stabilité</span>
              <span className={`text-sm font-medium ${getScoreColor(stabilityScore)}`}>
                {stabilityScore}%
              </span>
            </div>
            <Progress value={stabilityScore} className={getProgressColor(stabilityScore)} />
            <div className="mt-2 text-sm text-muted-foreground">
              {stabilityScore >= 75 
                ? "La République est stable et prospère."
                : stabilityScore >= 50 
                  ? "La République connaît quelques difficultés mais reste stable."
                  : stabilityScore >= 25
                    ? "La République traverse une période de crise."
                    : "La République est au bord de l'effondrement."}
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <EquilibreFactorCard 
              title="Équilibre social" 
              icon={<Users className="h-4 w-4" />}
              value={(equilibre.social?.cohesion || 50)}
              description={`Patriciens: ${equilibre.social?.patriciens || 0}%, Plébéiens: ${equilibre.social?.plebeiens || 0}%`}
            />
            
            <EquilibreFactorCard 
              title="Stabilité politique" 
              icon={<Landmark className="h-4 w-4" />}
              value={(equilibre.stabilite || 50)}
              description={`Sénat: ${equilibre.stabilite?.senat || 0}%, Lois: ${equilibre.stabilite?.lois || 0}%`}
            />
            
            <EquilibreFactorCard 
              title="Santé économique" 
              icon={<TrendingUp className="h-4 w-4" />}
              value={(equilibre.economie?.stabilite || 50)}
              description={`Croissance: ${equilibre.economie?.croissance || 0}%, Commerce: ${equilibre.economie?.commerce || 0}%`}
            />
            
            <EquilibreFactorCard 
              title="Climat religieux" 
              icon={<GraduationCap className="h-4 w-4" />}
              value={(equilibre.religion?.piete || 50)}
              description={`Traditions: ${equilibre.religion?.traditions || 0}%, Superstition: ${equilibre.religion?.superstition || 0}%`}
            />
          </div>
          
          {equilibre.risques && Array.isArray(equilibre.risques) && equilibre.risques.length > 0 && (
            <>
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                  Risques actuels
                </h3>
                <div className="space-y-1">
                  {equilibre.risques.slice(0, 3).map((risk, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Badge variant="outline" className="mt-0.5">
                        {risk.type}
                      </Badge>
                      <span>{risk.name} - {risk.description}</span>
                    </div>
                  ))}
                  {equilibre.risques.length > 3 && (
                    <div className="text-sm text-muted-foreground">
                      +{equilibre.risques.length - 3} autres risques...
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface EquilibreFactorCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  description: string;
}

const EquilibreFactorCard: React.FC<EquilibreFactorCardProps> = ({ 
  title, 
  icon, 
  value, 
  description 
}) => {
  const getColor = (value: number) => {
    if (value >= 75) return "text-green-500";
    if (value >= 50) return "text-yellow-500";
    if (value >= 25) return "text-orange-500";
    return "text-red-500";
  };
  
  return (
    <div className="border rounded-md p-3">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className={`text-lg font-bold ${getColor(value)}`}>
        {value}%
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {description}
      </div>
    </div>
  );
};
