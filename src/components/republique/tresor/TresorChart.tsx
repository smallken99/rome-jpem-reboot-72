
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEconomy } from '@/hooks/useEconomy';

export const TresorChart: React.FC = () => {
  const economy = useEconomy();
  const [chartData, setChartData] = useState<Array<{name: string, revenus: number, dépenses: number}>>([]);
  
  // Générer des données pour le graphique basées sur les transactions du système économique
  useEffect(() => {
    // Définir les mois pour l'affichage
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    // Initialiser les données avec des valeurs par défaut
    const initialData = months.map(month => ({
      name: month,
      revenus: Math.floor(Math.random() * 200000) + 200000, // Valeurs aléatoires pour démonstration
      dépenses: Math.floor(Math.random() * 150000) + 150000
    }));
    
    // Si nous avons des transactions, les utiliser pour enrichir les données
    if (economy.transactions.length > 0) {
      // Agréger les transactions par mois
      const transactionsByMonth = new Map<number, {incomes: number, expenses: number}>();
      
      economy.transactions.forEach(transaction => {
        const transactionDate = transaction.date instanceof Date ? 
          transaction.date : 
          new Date(transaction.date);
          
        const month = transactionDate.getMonth();
        const current = transactionsByMonth.get(month) || {incomes: 0, expenses: 0};
        
        if (transaction.type === 'income') {
          current.incomes += transaction.amount;
        } else {
          current.expenses += transaction.amount;
        }
        
        transactionsByMonth.set(month, current);
      });
      
      // Mettre à jour les données du graphique avec les transactions réelles
      const updatedData = initialData.map((data, index) => {
        const monthData = transactionsByMonth.get(index);
        
        if (monthData) {
          return {
            name: data.name,
            revenus: monthData.incomes > 0 ? monthData.incomes : data.revenus,
            dépenses: monthData.expenses > 0 ? monthData.expenses : data.dépenses
          };
        }
        
        return data;
      });
      
      setChartData(updatedData);
    } else {
      setChartData(initialData);
    }
  }, [economy.transactions]);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()} As`} />
          <Legend />
          <Bar dataKey="revenus" fill="#84cc16" />
          <Bar dataKey="dépenses" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
