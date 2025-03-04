
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Award, Coins, Flag } from 'lucide-react';

export const FamilyStatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatBox 
        title="Influence Sénatoriale" 
        value="72/100" 
        description="Classement des familles les plus puissantes"
        icon={<Award className="h-5 w-5" />}
        trend="up"
        trendValue="+3"
        className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
      />
      <StatBox 
        title="Richesse Apparente" 
        value="3,450,000 Sesterces" 
        description="Aucun changement significatif"
        icon={<Coins className="h-5 w-5" />}
        trend="neutral"
        trendValue="0"
        className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
      />
      <StatBox 
        title="Réputation" 
        value="Respectée" 
        description="En hausse dans l'opinion publique"
        icon={<Flag className="h-5 w-5" />}
        trend="up"
        trendValue="+5%"
        className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
      />
    </div>
  );
};
