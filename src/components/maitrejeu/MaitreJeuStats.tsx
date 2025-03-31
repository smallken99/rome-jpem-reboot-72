
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { TreasuryStatus } from './types/economie';

export const MaitreJeuStats: React.FC = () => {
  const { currentYear, equilibre, treasury } = useMaitreJeu();
  
  // Format numbers as Roman currency
  const formatAsCurrency = (value: number) => `${value.toLocaleString()} denarii`;

  // Prepare data for political faction chart
  const politicalData = [
    { name: 'Populares', value: equilibre.political.populaires, color: '#ef4444' },
    { name: 'Optimates', value: equilibre.political.optimates, color: '#3b82f6' },
    { name: 'Modérés', value: equilibre.political.moderates, color: '#84cc16' }
  ];
  
  // Prepare quarterly financial data
  const financialData = [
    { name: 'Q1', income: treasury?.income || 0, expenses: treasury?.expenses || 0 },
    { name: 'Q2', income: treasury?.income || 0, expenses: treasury?.expenses || 0 },
    { name: 'Q3', income: treasury?.income || 0, expenses: treasury?.expenses || 0 },
    { name: 'Q4', income: treasury?.income || 0, expenses: treasury?.expenses || 0 }
  ];
  
  // Prepare social stats data
  const socialData = [
    { name: 'Patriciens', value: equilibre.social.patriciens, color: '#8b5cf6' },
    { name: 'Plébéiens', value: equilibre.social.plébéiens, color: '#f59e0b' }
  ];
  
  // Prepare stability indicators data
  const stabilityData = [
    { name: 'Stabilité', value: equilibre.stability, color: '#3b82f6' },
    { name: 'Armée', value: equilibre.armée, color: '#ef4444' },
    { name: 'Loyauté', value: equilibre.loyauté, color: '#84cc16' },
    { name: 'Morale', value: equilibre.morale, color: '#8b5cf6' },
    { name: 'Religion', value: equilibre.religion, color: '#ec4899' },
    { name: 'Juridique', value: equilibre.facteurJuridique, color: '#0ea5e9' }
  ];
  
  return (
    <div className="space-y-6 p-6">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Statistiques de la République</h2>
        <p className="text-muted-foreground">
          Vue d'ensemble des indicateurs clés de la République Romaine pour l'année {currentYear}.
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trésor public</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAsCurrency(treasury?.balance || 0)}</div>
            <p className="text-xs text-muted-foreground">
              {((treasury?.income || 0) > (treasury?.expenses || 0)) 
                ? `Excédent: ${formatAsCurrency((treasury?.income || 0) - (treasury?.expenses || 0))}`
                : `Déficit: ${formatAsCurrency((treasury?.expenses || 0) - (treasury?.income || 0))}`
              }
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenus annuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAsCurrency(treasury?.income || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Taxes, tributs et autres sources
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dépenses annuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAsCurrency(treasury?.expenses || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Militaire, administration et jeux publics
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Variation budgétaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${(treasury?.surplus || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(treasury?.surplus || 0) >= 0 ? '+' : ''}{formatAsCurrency(treasury?.surplus || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {(treasury?.surplus || 0) >= 0 ? 'Excédent budgétaire' : 'Déficit budgétaire'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Équilibre politique</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
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
          <CardHeader>
            <CardTitle>Finances trimestrielles</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={financialData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatAsCurrency(value as number)} />
                <Legend />
                <Bar dataKey="income" name="Revenus" fill="#10b981" />
                <Bar dataKey="expenses" name="Dépenses" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Économie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl font-bold">{equilibre.economie}</div>
                </div>
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={
                      equilibre.economie >= 75 ? "#10b981" :
                      equilibre.economie >= 50 ? "#f59e0b" :
                      "#ef4444"
                    }
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 45 * equilibre.economie / 100} ${2 * Math.PI * 45 * (1 - equilibre.economie / 100)}`}
                  />
                </svg>
              </div>
              <p className="mt-4 text-center text-muted-foreground">
                Indice économique de la République
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Équilibre social</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
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
        <CardHeader>
          <CardTitle>Indicateurs de stabilité</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stabilityData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
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
    </div>
  );
};
