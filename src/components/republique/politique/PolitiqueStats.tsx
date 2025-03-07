
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Globe, Users, Scale, Award, Heart } from 'lucide-react';

export const PolitiqueStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Influence au Sénat"
        value="Forte"
        icon={<Award className="w-5 h-5" />}
        trend="up"
        trendValue="+8%"
        description="Soutien politique"
      />
      
      <StatBox 
        title="Relations Externes"
        value="Stables"
        icon={<Globe className="w-5 h-5" />}
        trend="up"
        trendValue="+3%"
        description="Diplomatie"
      />
      
      <StatBox 
        title="Équilibre Factions"
        value="Modéré"
        icon={<Scale className="w-5 h-5" />}
        trend="neutral"
        trendValue="0%"
        description="Tensions internes"
      />
      
      <StatBox 
        title="Soutien Populaire"
        value="65%"
        icon={<Heart className="w-5 h-5" />}
        trend="up"
        trendValue="+12%"
        description="Favorabilité"
      />
      
      <StatBox 
        title="Réformes Actives"
        value="3"
        icon={<Users className="w-5 h-5" />}
        trend="up"
        trendValue="+1"
        description="Législation"
      />
    </div>
  );
};
