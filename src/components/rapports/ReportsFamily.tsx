
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const ReportsFamily: React.FC = () => {
  const familyStats = [
    {
      name: 'Éducation',
      valeur: 75,
      moyenne: 60,
    },
    {
      name: 'Influence',
      valeur: 80,
      moyenne: 65,
    },
    {
      name: 'Alliances',
      valeur: 70,
      moyenne: 55,
    },
    {
      name: 'Discipline',
      valeur: 85,
      moyenne: 60,
    },
    {
      name: 'Piété',
      valeur: 65,
      moyenne: 70,
    },
  ];
  
  const ageData = [
    { name: 'Enfants (<16)', value: 5 },
    { name: 'Jeunes (16-25)', value: 7 },
    { name: 'Adultes (26-45)', value: 12 },
    { name: 'Aînés (>45)', value: 4 },
  ];
  
  const COLORS = ['#EEA243', '#7A9E7E', '#1F487E', '#CF5C36'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Qualité Familiale</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={familyStats}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2e9d8" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="valeur" name="Votre Famille" fill="#1F487E" />
                  <Bar dataKey="moyenne" name="Moyenne des Familles" fill="#EEA243" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Démographie Familiale</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} membres`, "Nombre"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Analyse et Recommandations</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <div className="border-l-4 border-rome-gold/50 pl-4">
              <h4 className="font-cinzel font-medium mb-1">Points Forts</h4>
              <p className="text-sm text-muted-foreground">
                Votre famille se distingue particulièrement dans les domaines de la discipline et de l'influence politique. 
                La forte présence d'adultes en âge de contribuer activement est un atout majeur.
              </p>
            </div>
            
            <div className="border-l-4 border-rome-gold/50 pl-4">
              <h4 className="font-cinzel font-medium mb-1">Points à Améliorer</h4>
              <p className="text-sm text-muted-foreground">
                La piété familiale est légèrement inférieure à la moyenne, ce qui pourrait affecter votre réputation parmi 
                les familles plus traditionnelles et les collèges religieux.
              </p>
            </div>
            
            <div className="border-l-4 border-rome-gold/50 pl-4">
              <h4 className="font-cinzel font-medium mb-1">Recommandations</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Renforcer l'éducation religieuse des plus jeunes membres</li>
                <li>Encourager la participation aux cérémonies publiques</li>
                <li>Rechercher des alliances matrimoniales stratégiques pour les jeunes adultes</li>
                <li>Maintenir la discipline familiale qui est votre point fort</li>
                <li>Prévoir une stratégie de succession claire étant donné la répartition démographique</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-rome-gold/50 pl-4">
              <h4 className="font-cinzel font-medium mb-1">Projection Future</h4>
              <p className="text-sm text-muted-foreground">
                Avec un bon équilibre entre les générations et d'excellents scores en influence et discipline, 
                votre famille est bien positionnée pour les prochaines décennies. L'accent mis sur l'éducation 
                portera ses fruits lorsque les plus jeunes atteindront l'âge adulte.
              </p>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
