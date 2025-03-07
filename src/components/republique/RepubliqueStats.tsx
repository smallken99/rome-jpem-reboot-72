
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Coins, Users, Building, Balance, Award } from 'lucide-react';

export const RepubliqueStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Trésor public"
        value="3,450,000 As"
        icon={<Coins className="w-5 h-5" />}
        trend="up"
        trendValue="+2.4%"
        description="Depuis le dernier mois"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Population"
        value="1,250,000"
        icon={<Users className="w-5 h-5" />}
        trend="up"
        trendValue="+1.1%"
        description="Citoyens et non-citoyens"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Bâtiments publics"
        value="412"
        icon={<Building className="w-5 h-5" />}
        trend="neutral"
        trendValue="0%"
        description="Sur tout le territoire"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Procès en cours"
        value="23"
        icon={<Balance className="w-5 h-5" />}
        trend="down"
        trendValue="-15%"
        description="En attente de jugement"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Réformes en cours"
        value="5"
        icon={<Award className="w-5 h-5" />}
        trend="up"
        trendValue="+2"
        description="À voter au Sénat"
        onClick={() => {}} 
      />
    </div>
  );
};
