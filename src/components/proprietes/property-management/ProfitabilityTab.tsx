
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building, Home, Tractor, User, Landmark, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProfitabilityTab: React.FC = () => {
  const [activeView, setActiveView] = useState<'yearly' | 'monthly'>('yearly');
  
  // Données simulées pour le graphique des revenus et dépenses par type de propriété
  const revenueExpenseData = [
    {
      name: 'Insulae',
      revenus: 48000,
      depenses: 20000,
      icon: <Building className="h-4 w-4" />,
    },
    {
      name: 'Domus',
      revenus: 15000,
      depenses: 30000,
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: 'Domaines',
      revenus: 75000,
      depenses: 35000,
      icon: <Tractor className="h-4 w-4" />,
    },
    {
      name: 'Publics',
      revenus: 10000,
      depenses: 45000,
      icon: <Landmark className="h-4 w-4" />,
    },
  ];
  
  // Données simulées pour le graphique circulaire des sources de revenus
  const revenueSourcesData = [
    { name: 'Loyers', value: 45, color: '#7A9E7E' },
    { name: 'Agriculture', value: 30, color: '#EEA243' },
    { name: 'Commerce', value: 15, color: '#CF5C36' },
    { name: 'Autres', value: 10, color: '#1F487E' },
  ];
  
  // Données simulées des propriétés les plus rentables
  const topProperties = [
    {
      name: 'Insula de la Via Sacra',
      type: 'Insula',
      revenue: 12000,
      expenses: 4000,
      roi: 200,
      trend: 'up'
    },
    {
      name: 'Domaine Viticole de Campanie',
      type: 'Vignoble',
      revenue: 18000,
      expenses: 7000,
      roi: 157,
      trend: 'up'
    },
    {
      name: 'Insula du Champ de Mars',
      type: 'Insula',
      revenue: 10000,
      expenses: 4500,
      roi: 122,
      trend: 'down'
    },
    {
      name: 'Oliveraie d\'Apulie',
      type: 'Domaine rural',
      revenue: 15000,
      expenses: 7500,
      roi: 100,
      trend: 'neutral'
    },
  ];
  
  // Fonction pour obtenir l'icône de tendance
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <ArrowRight className="h-4 w-4 text-yellow-600" />;
    }
  };
  
  // Formatage des données pour l'affichage mensuel/annuel
  const formatData = (data: typeof revenueExpenseData) => {
    if (activeView === 'monthly') {
      return data.map(item => ({
        ...item,
        revenus: Math.round(item.revenus / 12),
        depenses: Math.round(item.depenses / 12),
      }));
    }
    return data;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-4">
        <div>
          <h3 className="font-cinzel text-lg text-rome-navy">Analyse de Rentabilité</h3>
          <p className="text-sm text-muted-foreground">
            Examinez la performance financière de vos propriétés pour optimiser votre patrimoine.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={activeView === 'yearly' ? 'default' : 'outline'} 
            size="sm"
            className={activeView === 'yearly' ? 'roman-btn' : 'roman-btn-outline'}
            onClick={() => setActiveView('yearly')}
          >
            Annuel
          </Button>
          <Button 
            variant={activeView === 'monthly' ? 'default' : 'outline'} 
            size="sm"
            className={activeView === 'monthly' ? 'roman-btn' : 'roman-btn-outline'}
            onClick={() => setActiveView('monthly')}
          >
            Mensuel
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenus et dépenses par type de propriété */}
        <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
          <h4 className="font-cinzel text-rome-navy mb-4">Revenus et Dépenses par Type</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={formatData(revenueExpenseData)}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f2e9d8" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#1F487E' }} 
                  axisLine={{ stroke: '#EEA243' }}
                />
                <YAxis 
                  tick={{ fill: '#1F487E' }} 
                  axisLine={{ stroke: '#EEA243' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#F8F4E3',
                    borderColor: '#EEA243',
                    fontFamily: '"Cinzel", serif'
                  }}
                  formatter={(value) => [`${value} As`, null]}
                />
                <Legend />
                <Bar dataKey="revenus" name="Revenus" fill="#7A9E7E" />
                <Bar dataKey="depenses" name="Dépenses" fill="#CF5C36" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Sources de revenus */}
        <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
          <h4 className="font-cinzel text-rome-navy mb-4">Sources de Revenus</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={300}>
                <Pie
                  data={revenueSourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#F8F4E3',
                    borderColor: '#EEA243',
                    fontFamily: '"Cinzel", serif'
                  }}
                  formatter={(value) => [`${value}%`, null]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Propriétés les plus rentables */}
      <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
        <h4 className="font-cinzel text-rome-navy mb-4">Propriétés les Plus Rentables</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-rome-gold/10 text-left">
                <th className="p-3 font-cinzel">Propriété</th>
                <th className="p-3 font-cinzel">Type</th>
                <th className="p-3 font-cinzel">Revenus ({activeView === 'yearly' ? 'Annuel' : 'Mensuel'})</th>
                <th className="p-3 font-cinzel">Dépenses ({activeView === 'yearly' ? 'Annuel' : 'Mensuel'})</th>
                <th className="p-3 font-cinzel">ROI (%)</th>
                <th className="p-3 font-cinzel">Tendance</th>
              </tr>
            </thead>
            <tbody>
              {topProperties.map((property, index) => (
                <tr 
                  key={index} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
                >
                  <td className="p-3 font-medium">{property.name}</td>
                  <td className="p-3 text-sm">{property.type}</td>
                  <td className="p-3 text-green-600 font-medium">
                    {activeView === 'yearly' 
                      ? property.revenue.toLocaleString() 
                      : Math.round(property.revenue / 12).toLocaleString()
                    } As
                  </td>
                  <td className="p-3 text-red-600">
                    {activeView === 'yearly' 
                      ? property.expenses.toLocaleString() 
                      : Math.round(property.expenses / 12).toLocaleString()
                    } As
                  </td>
                  <td className="p-3 font-bold">{property.roi}%</td>
                  <td className="p-3">{getTrendIcon(property.trend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            className="text-xs roman-btn-outline"
            onClick={() => window.alert("Fonction en développement.")}
          >
            Rapport complet
          </Button>
        </div>
      </div>
      
      {/* Recommandations d'optimisation */}
      <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
        <h4 className="font-cinzel text-rome-navy mb-4">Recommandations d'Optimisation</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-50 p-2 rounded-full border border-green-200">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h5 className="font-medium">Augmenter les loyers des Insulae</h5>
              <p className="text-sm text-muted-foreground">
                Les bâtiments locatifs du Champ de Mars et de la Subure sont sous-évalués par rapport au marché actuel. 
                Une augmentation de 10% générerait 4,800 As supplémentaires par an.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-amber-50 p-2 rounded-full border border-amber-200">
              <User className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h5 className="font-medium">Renégocier les contrats d'entretien</h5>
              <p className="text-sm text-muted-foreground">
                Les coûts d'entretien de vos domaines ruraux sont 15% au-dessus de la moyenne. 
                Une renégociation permettrait d'économiser jusqu'à 5,250 As annuellement.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-full border border-blue-200">
              <Tractor className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h5 className="font-medium">Diversifier la production agricole</h5>
              <p className="text-sm text-muted-foreground">
                L'ajout de cultures secondaires sur vos domaines céréaliers pourrait augmenter la rentabilité 
                de 20% sans investissement significatif supplémentaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
