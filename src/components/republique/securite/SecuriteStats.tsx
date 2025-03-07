
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Shield, Users, Gavel, AlertCircle, UserCheck } from 'lucide-react';

export const SecuriteStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Activité Criminelle"
        value="Modérée"
        icon={<AlertCircle className="w-5 h-5" />}
        trend="down"
        trendValue="-12%"
        description="Dernière période"
      />
      
      <StatBox 
        title="Milice Urbaine"
        value="240 hommes"
        icon={<Shield className="w-5 h-5" />}
        trend="up"
        trendValue="+5%"
        description="Force active"
      />
      
      <StatBox 
        title="Ordre Public"
        value="Stable"
        icon={<Users className="w-5 h-5" />}
        trend="neutral"
        trendValue="0%"
        description="État actuel"
      />
      
      <StatBox 
        title="Procès Criminels"
        value="12 en attente"
        icon={<Gavel className="w-5 h-5" />}
        trend="down"
        trendValue="-3"
        description="Cours de justice"
      />
      
      <StatBox 
        title="Satisfaction"
        value="72%"
        icon={<UserCheck className="w-5 h-5" />}
        trend="up"
        trendValue="+4%"
        description="Population"
      />
    </div>
  );
};
