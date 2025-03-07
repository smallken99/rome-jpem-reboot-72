
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Gavel, CalendarDays, FileClock, Scale, FileCheck } from 'lucide-react';

export const JudiciaryStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Procès en cours"
        value="23"
        icon={<Gavel className="w-5 h-5" />}
        trend="down"
        trendValue="-15%"
        description="Cette semaine"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Procès à venir"
        value="18"
        icon={<CalendarDays className="w-5 h-5" />}
        trend="up"
        trendValue="+4"
        description="Programmés"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Attente de jugement"
        value="7"
        icon={<FileClock className="w-5 h-5" />}
        trend="neutral"
        trendValue="0"
        description="Délibération"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Procès criminels"
        value="14"
        icon={<Scale className="w-5 h-5" />}
        trend="up"
        trendValue="+2"
        description="En cours"
        onClick={() => {}} 
      />
      
      <StatBox 
        title="Jugements rendus"
        value="126"
        icon={<FileCheck className="w-5 h-5" />}
        trend="up"
        trendValue="+8%"
        description="Cette année"
        onClick={() => {}} 
      />
    </div>
  );
};
