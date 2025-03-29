import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useMaitreJeu } from '../../context';
import { RiskFactor, HistoriqueEntry } from '../../types/equilibre';
import RecentEventsTable from './RecentEventsTable';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlarmClock, AlertTriangle, BarChart, Crown, Scale, ShieldAlert, TrendingUp, Users } from 'lucide-react';

interface EquilibreOverviewProps {
  equilibre: Equilibre;
  recentEvents: PoliticalEvent[];
  currentThreats: {
    id: string;
    name: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }[];
  formatDate: (date: Date) => string;
}

export const EquilibreOverview: React.FC<EquilibreOverviewProps> = ({
  equilibre,
  recentEvents,
  currentThreats,
  formatDate
}) => {
  const factionData = [
    { name: 'Populares', value: equilibre.populares },
    { name: 'Optimates', value: equilibre.optimates },
    { name: 'Modérés', value: equilibre.moderates }
  ];
  
  const socialData = [
    { name: 'Patriciens', value: equilibre.patriciens },
    { name: 'Plébéiens', value: equilibre.plébéiens },
    { name: 'Économie', value: equilibre.économie }
  ];
  
  const militaryData = [
    { name: 'Armée', value: equilibre.armée },
    { name: 'Loyauté', value: equilibre.loyauté },
    { name: 'Morale', value: equilibre.morale }
  ];
  
  const getStatusIcon = (value: number) => {
    if (value > 70) return <TrendingUp className="text-green-500 h-4 w-4" />;
    if (value < 40) return <TrendingDown className="text-red-500 h-4 w-4" />;
    return <Minus className="text-amber-500 h-4 w-4" />;
  };
  
  const getStatusColor = (value: number) => {
    if (value > 70) return "text-green-500";
    if (value < 40) return "text-red-500";
    return "text-amber-500";
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Équilibre politique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart data={factionData} type="pie" height={200} />
            <div className="grid grid-cols-3 gap-2 mt-2">
              {factionData.map(faction => (
                <div key={faction.name} className="text-center">
                  <div className="text-sm font-medium">{faction.name}</div>
                  <div className={`text-lg font-bold ${getStatusColor(faction.value)}`}>
                    {faction.value}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Équilibre social
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialData.map(item => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getStatusColor(item.value)}`}>
                        {item.value}%
                      </span>
                      {getStatusIcon(item.value)}
                    </div>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Swords className="h-5 w-5" />
              Équilibre militaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {militaryData.map(item => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getStatusColor(item.value)}`}>
                        {item.value}%
                      </span>
                      {getStatusIcon(item.value)}
                    </div>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <EquilibreStatus equilibre={equilibre} />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Menaces actuelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CurrentThreats threats={currentThreats} />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Événements récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentEventsTable events={recentEvents} formatDate={formatDate} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
