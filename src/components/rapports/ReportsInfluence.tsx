
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export const ReportsInfluence: React.FC = () => {
  const influenceData = [
    { name: 'Sénat', value: 35 },
    { name: 'Peuple', value: 25 },
    { name: 'Armée', value: 15 },
    { name: 'Provinces', value: 10 },
    { name: 'Religion', value: 15 },
  ];
  
  const colors = ['#1F487E', '#EEA243', '#7A9E7E', '#CF5C36', '#8A8D8F'];
  
  const competitorData = [
    {
      name: 'Votre Famille',
      senat: 35,
      peuple: 25,
      armee: 15,
    },
    {
      name: 'Claudii',
      senat: 40,
      peuple: 15,
      armee: 20,
    },
    {
      name: 'Metelli',
      senat: 30,
      peuple: 20,
      armee: 10,
    },
    {
      name: 'Cornelii',
      senat: 25,
      peuple: 30,
      armee: 25,
    },
    {
      name: 'Aemilii',
      senat: 20,
      peuple: 25,
      armee: 15,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Distribution de l'Influence</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={influenceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {influenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Comparaison avec d'autres Familles</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={competitorData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2e9d8" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="senat" name="Influence au Sénat" fill="#1F487E" />
                  <Bar dataKey="peuple" name="Soutien du Peuple" fill="#EEA243" />
                  <Bar dataKey="armee" name="Loyauté de l'Armée" fill="#CF5C36" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Recommandations Stratégiques</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <div className="border-l-4 border-rome-gold/50 pl-4">
              <h4 className="font-cinzel font-medium mb-1">Renforcer votre position au Sénat</h4>
              <p className="text-sm text-muted-foreground">
                Continuez à cultiver des relations avec les sénateurs influents et participez activement aux débats sur les questions importantes.
              </p>
            </div>
            
            <div className="border-l-4 border-rome-gold/50 pl-4">
              <h4 className="font-cinzel font-medium mb-1">Améliorer le soutien populaire</h4>
              <p className="text-sm text-muted-foreground">
                Organisez des jeux ou distribuez du grain pour gagner la faveur de la plèbe. Soutenez des lois qui favorisent les intérêts du peuple.
              </p>
            </div>
            
            <div className="border-l-4 border-rome-gold/50 pl-4">
              <h4 className="font-cinzel font-medium mb-1">Développer l'influence militaire</h4>
              <p className="text-sm text-muted-foreground">
                Recherchez des postes de commandement militaire ou cultivez des relations avec des officiers supérieurs pour renforcer votre influence sur l'armée.
              </p>
            </div>
            
            <div className="border-l-4 border-rome-gold/50 pl-4">
              <h4 className="font-cinzel font-medium mb-1">Se méfier des Claudii</h4>
              <p className="text-sm text-muted-foreground">
                Les Claudii représentent votre principal concurrent en termes d'influence sénatoriale. Surveillez leurs actions et contrez leurs initiatives quand c'est possible.
              </p>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
