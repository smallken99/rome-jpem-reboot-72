
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Scroll, Check, Clock, XCircle, Scale } from 'lucide-react';
import { useLois } from './hooks/useLois';

export const LoisStats: React.FC = () => {
  const { lois, isLoading } = useLois();
  
  // Calculer les statistiques à partir des lois
  const promulguéesCount = lois.filter(loi => loi.statut === 'promulguée').length;
  const enDebatCount = lois.filter(loi => loi.statut === 'en_débat').length;
  const proposéesCount = lois.filter(loi => loi.statut === 'proposée').length;
  const rejetéesCount = lois.filter(loi => loi.statut === 'rejetée').length;
  
  // Taux d'approbation (lois votées + promulguées / total des lois votées, promulguées et rejetées)
  const votedLaws = lois.filter(loi => ['votée', 'promulguée', 'rejetée'].includes(loi.statut));
  const approvedLaws = lois.filter(loi => ['votée', 'promulguée'].includes(loi.statut));
  const tauxApprobation = votedLaws.length > 0 ? Math.round((approvedLaws.length / votedLaws.length) * 100) : 0;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Lois Promulguées"
        value={isLoading ? "..." : promulguéesCount.toString()}
        icon={<Check className="w-5 h-5" />}
        trend="up"
        trendValue="+2"
        description="Dernière année"
      />
      
      <StatBox 
        title="En Débat"
        value={isLoading ? "..." : enDebatCount.toString()}
        icon={<Scale className="w-5 h-5" />}
        trend="neutral"
        trendValue="0"
        description="Sénat"
      />
      
      <StatBox 
        title="Proposées"
        value={isLoading ? "..." : proposéesCount.toString()}
        icon={<Scroll className="w-5 h-5" />}
        trend="up"
        trendValue="+3"
        description="Derniers mois"
      />
      
      <StatBox 
        title="Rejetées"
        value={isLoading ? "..." : rejetéesCount.toString()}
        icon={<XCircle className="w-5 h-5" />}
        trend="down"
        trendValue="-1"
        description="Dernière année"
      />
      
      <StatBox 
        title="Taux d'Approbation"
        value={isLoading ? "..." : `${tauxApprobation}%`}
        icon={<Clock className="w-5 h-5" />}
        trend={tauxApprobation >= 50 ? "up" : "down"}
        trendValue={`${tauxApprobation >= 50 ? "+" : ""}${tauxApprobation - 50}%`}
        description="Moyenne historique"
      />
    </div>
  );
};
