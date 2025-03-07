
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Scale, FileText, CircleDashed, Users, Award } from 'lucide-react';

export const JudiciaryStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Procès en Cours"
        value="14"
        icon={<Scale className="w-5 h-5" />}
        trend="down"
        trendValue="-3"
        description="Tribunaux"
      />
      
      <StatBox 
        title="Cas Résolus"
        value="27"
        icon={<FileText className="w-5 h-5" />}
        trend="up"
        trendValue="+8"
        description="Trimestre actuel"
      />
      
      <StatBox 
        title="Délai Moyen"
        value="24 jours"
        icon={<CircleDashed className="w-5 h-5" />}
        trend="neutral"
        trendValue="0"
        description="Résolution"
      />
      
      <StatBox 
        title="Autorité"
        value="Élevée"
        icon={<Award className="w-5 h-5" />}
        trend="up"
        trendValue="+4%"
        description="Respect de la loi"
      />
      
      <StatBox 
        title="Satisfaction"
        value="68%"
        icon={<Users className="w-5 h-5" />}
        trend="up"
        trendValue="+2%"
        description="Citoyens"
      />
    </div>
  );
};
