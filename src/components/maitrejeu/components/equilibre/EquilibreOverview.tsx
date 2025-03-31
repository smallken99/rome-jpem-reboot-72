
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, Activity, Heart } from 'lucide-react';
import { Equilibre } from '../../types/equilibre';
import { GameDate, formatGameDate } from '../../types/common';

// Define the PoliticalEvent type
interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: GameDate | Date;
  impact: Record<string, number>;
  type: string;
  importance: 'high' | 'low' | 'medium' | 'critical';
}

interface EquilibreOverviewProps {
  equilibre: Equilibre;
}

export const EquilibreOverview: React.FC<EquilibreOverviewProps> = ({ equilibre }) => {
  // Prepare data for political pie chart
  const politicalData = [
    { name: 'Populares', value: equilibre.political.populaires, color: '#ef4444' },
    { name: 'Optimates', value: equilibre.political.optimates, color: '#3b82f6' },
    { name: 'Modérés', value: equilibre.political.moderates, color: '#84cc16' }
  ];
  
  // Prepare data for social pie chart
  const socialData = [
    { name: 'Patriciens', value: equilibre.social.patriciens, color: '#8b5cf6' },
    { name: 'Plébéiens', value: equilibre.social.plébéiens, color: '#f59e0b' }
  ];
  
  // Prepare data for stability bar chart
  const stabilityData = [
    { name: 'Économie', value: equilibre.economie, color: '#f59e0b' },
    { name: 'Stabilité', value: equilibre.stability, color: '#3b82f6' },
    { name: 'Armée', value: equilibre.armée, color: '#ef4444' },
    { name: 'Loyauté', value: equilibre.loyauté, color: '#84cc16' },
    { name: 'Morale', value: equilibre.morale, color: '#8b5cf6' },
    { name: 'Religion', value: equilibre.religion, color: '#ec4899' },
    { name: 'Juridique', value: equilibre.facteurJuridique, color: '#0ea5e9' }
  ];
  
  // Example political events (replace with real data in production)
  const recentEvents: PoliticalEvent[] = [
    {
      id: '1',
      title: 'Débat sur la loi agraire',
      description: 'Important débat au Sénat concernant la redistribution des terres publiques.',
      date: { year: 705, season: 'SUMMER' },
      impact: { populaires: 5, optimates: -3 },
      type: 'political',
      importance: 'high'
    },
    {
      id: '2',
      title: 'Mauvaise récolte en Sicile',
      description: 'Les récoltes de blé ont été décevantes, entraînant une hausse des prix.',
      date: { year: 705, season: 'AUTUMN' },
      impact: { economie: -4, morale: -2 },
      type: 'economic',
      importance: 'medium'
    },
    {
      id: '3',
      title: 'Victoire militaire en Gaule',
      description: 'Les légions romaines ont remporté une victoire significative contre les tribus gauloises.',
      date: { year: 705, season: 'SPRING' },
      impact: { armée: 3, morale: 4, optimates: 2 },
      type: 'military',
      importance: 'high'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Équilibre politique</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              {equilibre.political.optimates > equilibre.political.populaires
                ? 'Dominance Optimates'
                : equilibre.political.populaires > equilibre.political.optimates
                ? 'Dominance Populares'
                : 'Équilibre'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Optimates: {equilibre.political.optimates}% | 
              Populares: {equilibre.political.populaires}% | 
              Modérés: {equilibre.political.moderates}%
            </p>
            <div className="mt-3 flex">
              <div className="h-2 flex-1 rounded-l-full bg-red-500" style={{ width: `${equilibre.political.populaires}%` }}></div>
              <div className="h-2 flex-1 bg-blue-500" style={{ width: `${equilibre.political.optimates}%` }}></div>
              <div className="h-2 flex-1 rounded-r-full bg-green-500" style={{ width: `${equilibre.political.moderates}%` }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Classes sociales</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              {equilibre.social.patriciens > 70
                ? 'Dominance Patricienne'
                : equilibre.social.plébéiens > 70
                ? 'Force Plébéienne'
                : 'Équilibre Social'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Patriciens: {equilibre.social.patriciens}% | 
              Plébéiens: {equilibre.social.plébéiens}%
            </p>
            <div className="mt-3 flex">
              <div className="h-2 flex-1 rounded-l-full bg-purple-500" style={{ width: `${equilibre.social.patriciens}%` }}></div>
              <div className="h-2 flex-1 rounded-r-full bg-amber-500" style={{ width: `${equilibre.social.plébéiens}%` }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Économie</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              {equilibre.economie >= 75
                ? 'Prospérité'
                : equilibre.economie >= 50
                ? 'Stable'
                : equilibre.economie >= 25
                ? 'Préoccupante'
                : 'Crise'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Indice économique: {equilibre.economie}/100
            </p>
            <div className="mt-3">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    equilibre.economie >= 75 ? 'bg-green-500' : 
                    equilibre.economie >= 50 ? 'bg-amber-500' : 
                    equilibre.economie >= 25 ? 'bg-orange-500' : 
                    'bg-red-500'
                  }`} 
                  style={{ width: `${equilibre.economie}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stabilité générale</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              {equilibre.stability >= 75
                ? 'Très stable'
                : equilibre.stability >= 50
                ? 'Stable'
                : equilibre.stability >= 25
                ? 'Instable'
                : 'Critique'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Indice de stabilité: {equilibre.stability}/100
            </p>
            <div className="mt-3">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    equilibre.stability >= 75 ? 'bg-green-500' : 
                    equilibre.stability >= 50 ? 'bg-blue-500' : 
                    equilibre.stability >= 25 ? 'bg-orange-500' : 
                    'bg-red-500'
                  }`} 
                  style={{ width: `${equilibre.stability}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Équilibre politique</CardTitle>
            <PieChartIcon size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={politicalData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {politicalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Équilibre social</CardTitle>
            <PieChartIcon size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={socialData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {socialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-medium">Facteurs de stabilité</CardTitle>
          <BarChartIcon size={16} className="text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stabilityData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value) => `${value}/100`} />
              <Legend />
              <Bar dataKey="value" name="Indice" radius={[0, 10, 10, 0]}>
                {stabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-medium">Événements récents</CardTitle>
          <Activity size={16} className="text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <Badge 
                    variant={
                      event.importance === 'critical' ? 'destructive' :
                      event.importance === 'high' ? 'destructive' :
                      event.importance === 'medium' ? 'outline' :
                      'secondary'
                    }
                  >
                    {event.importance.charAt(0).toUpperCase() + event.importance.slice(1)}
                  </Badge>
                </div>
                <div className="flex mt-2 text-xs text-muted-foreground justify-between">
                  <span>
                    {formatGameDate(event.date as GameDate)}
                  </span>
                  <div className="flex gap-2">
                    {Object.entries(event.impact).map(([key, value]) => (
                      <span key={key} className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                        {key}: {value > 0 ? `+${value}` : value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
