
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Données financières de l'année
const financialData = [
  { month: new Date(45, 0), income: 1200000, expenses: 950000, balance: 250000 },
  { month: new Date(45, 1), income: 1350000, expenses: 980000, balance: 370000 },
  { month: new Date(45, 2), income: 1250000, expenses: 1050000, balance: 200000 },
  { month: new Date(45, 3), income: 1400000, expenses: 1100000, balance: 300000 },
  { month: new Date(45, 4), income: 1500000, expenses: 1150000, balance: 350000 },
  { month: new Date(45, 5), income: 1300000, expenses: 1200000, balance: 100000 },
  { month: new Date(45, 6), income: 1350000, expenses: 1180000, balance: 170000 },
  { month: new Date(45, 7), income: 1450000, expenses: 1250000, balance: 200000 },
  { month: new Date(45, 8), income: 1550000, expenses: 1300000, balance: 250000 },
  { month: new Date(45, 9), income: 1600000, expenses: 1350000, balance: 250000 },
  { month: new Date(45, 10), income: 1400000, expenses: 1250000, balance: 150000 },
  { month: new Date(45, 11), income: 1550000, expenses: 1300000, balance: 250000 }
];

const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

export const TresorChart: React.FC = () => {
  const [period, setPeriod] = useState('annual');
  
  const formatMonthLabel = (date: Date) => {
    if (typeof date === 'string') {
      return '';
    }
    return months[date.getMonth()];
  };

  const getFilteredData = () => {
    switch (period) {
      case 'quarterly':
        return financialData.slice(0, 3);
      case 'semiannual':
        return financialData.slice(0, 6);
      case 'annual':
      default:
        return financialData;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quarterly">Trimestre actuel</SelectItem>
            <SelectItem value="semiannual">Semestre actuel</SelectItem>
            <SelectItem value="annual">Année complète</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[400px] border rounded-md p-4 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getFilteredData()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              tickFormatter={formatMonthLabel}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => `${value / 1000000}M`} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`${(value as number).toLocaleString()} As`, ""]}
              labelFormatter={(label) => `Mois: ${formatMonthLabel(label as Date)}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              name="Revenus" 
              dataKey="income" 
              stroke="#16a34a" 
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line 
              type="monotone" 
              name="Dépenses" 
              dataKey="expenses" 
              stroke="#dc2626" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              name="Balance" 
              dataKey="balance" 
              stroke="#2563eb" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-md p-4 bg-green-50">
          <h3 className="font-semibold text-green-800 mb-1">Revenus</h3>
          <p className="text-2xl font-bold text-green-700">16.9M As</p>
          <p className="text-sm text-green-600 mt-1">+8.5% vs année précédente</p>
        </div>
        
        <div className="border rounded-md p-4 bg-red-50">
          <h3 className="font-semibold text-red-800 mb-1">Dépenses</h3>
          <p className="text-2xl font-bold text-red-700">14.1M As</p>
          <p className="text-sm text-red-600 mt-1">+5.2% vs année précédente</p>
        </div>
        
        <div className="border rounded-md p-4 bg-blue-50">
          <h3 className="font-semibold text-blue-800 mb-1">Balance</h3>
          <p className="text-2xl font-bold text-blue-700">2.8M As</p>
          <p className="text-sm text-blue-600 mt-1">+31% vs année précédente</p>
        </div>
      </div>
    </div>
  );
};
