
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { ScrollText, UserX, Scale, Book, ClipboardCheck } from 'lucide-react';

export const LoisStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Lois Actives"
        value="42"
        icon={<ScrollText className="w-5 h-5" />}
        trend="up"
        trendValue="+3"
        description="Total"
      />
      
      <StatBox 
        title="Propositions"
        value="7"
        icon={<ClipboardCheck className="w-5 h-5" />}
        trend="up"
        trendValue="+2"
        description="En attente"
      />
      
      <StatBox 
        title="Respect des Lois"
        value="Élevé"
        icon={<Scale className="w-5 h-5" />}
        trend="up"
        trendValue="+7%"
        description="Général"
      />
      
      <StatBox 
        title="Censures"
        value="4"
        icon={<UserX className="w-5 h-5" />}
        trend="down"
        trendValue="-1"
        description="Trimestre actuel"
      />
      
      <StatBox 
        title="Édits Censoriaux"
        value="12"
        icon={<Book className="w-5 h-5" />}
        trend="up"
        trendValue="+2"
        description="Actifs"
      />
    </div>
  );
};
