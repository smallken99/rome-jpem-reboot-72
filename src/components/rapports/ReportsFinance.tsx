
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ReportsFinance: React.FC = () => {
  const financialData = [
    {
      mois: 'Jan',
      revenus: 120000,
      depenses: 85000,
      profit: 35000,
    },
    {
      mois: 'Fév',
      revenus: 125000,
      depenses: 88000,
      profit: 37000,
    },
    {
      mois: 'Mar',
      revenus: 130000,
      depenses: 90000,
      profit: 40000,
    },
    {
      mois: 'Avr',
      revenus: 135000,
      depenses: 92000,
      profit: 43000,
    },
    {
      mois: 'Mai',
      revenus: 140000,
      depenses: 95000,
      profit: 45000,
    },
    {
      mois: 'Jun',
      revenus: 145000,
      depenses: 98000,
      profit: 47000,
    },
  ];
  
  const assetData = [
    {
      annee: '5 av. J.-C.',
      proprietes: 2500000,
      liquidites: 500000,
      investissements: 450000,
    },
    {
      annee: '4 av. J.-C.',
      proprietes: 2700000,
      liquidites: 520000,
      investissements: 480000,
    },
    {
      annee: '3 av. J.-C.',
      proprietes: 2900000,
      liquidites: 540000,
      investissements: 510000,
    },
    {
      annee: '2 av. J.-C.',
      proprietes: 3100000,
      liquidites: 560000,
      investissements: 540000,
    },
    {
      annee: '1 av. J.-C.',
      proprietes: 3300000,
      liquidites: 580000,
      investissements: 570000,
    },
    {
      annee: 'Présent',
      proprietes: 3450000,
      liquidites: 600000,
      investissements: 600000,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Revenus et Dépenses (6 derniers mois)</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={financialData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2e9d8" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => `${value.toLocaleString()} As`}
                    contentStyle={{
                      backgroundColor: '#F8F4E3',
                      borderColor: '#EEA243',
                      fontFamily: '"Cinzel", serif'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenus" name="Revenus" stroke="#7A9E7E" strokeWidth={2} />
                  <Line type="monotone" dataKey="depenses" name="Dépenses" stroke="#CF5C36" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" name="Profit" stroke="#1F487E" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Évolution des Actifs (5 ans)</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={300}
                  data={assetData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2e9d8" />
                  <XAxis dataKey="annee" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => `${value.toLocaleString()} As`}
                    contentStyle={{
                      backgroundColor: '#F8F4E3',
                      borderColor: '#EEA243',
                      fontFamily: '"Cinzel", serif'
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="proprietes" name="Propriétés" stackId="1" stroke="#1F487E" fill="#1F487E" />
                  <Area type="monotone" dataKey="liquidites" name="Liquidités" stackId="1" stroke="#EEA243" fill="#EEA243" />
                  <Area type="monotone" dataKey="investissements" name="Investissements" stackId="1" stroke="#7A9E7E" fill="#7A9E7E" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Analyse Financière</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-cinzel font-medium mb-2">Points Forts</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Croissance constante des revenus (+4,2% sur les 6 derniers mois)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Diversification des sources de revenus (propriétés, commerce, agriculture)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Réserves de liquidités importantes pour saisir des opportunités</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Augmentation constante de la valeur du patrimoine immobilier</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-cinzel font-medium mb-2">Points d'Attention</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Augmentation des dépenses parallèle aux revenus (maîtrise à améliorer)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Exposition importante au marché immobilier (risque en cas de baisse)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Rendement des investissements commerciaux inférieur aux attentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Coûts de maintenance des propriétés en hausse (+5% sur l'année)</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-cinzel font-medium mb-2">Recommandations</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Optimiser les dépenses d'entretien des propriétés (économie potentielle de 15%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Investir dans de nouvelles opportunités commerciales en Hispanie et en Gaule</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Développer le commerce maritime pour diversifier davantage les revenus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Réduire progressivement les dépenses de divertissement et de réceptions (-10%)</span>
              </li>
            </ul>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
