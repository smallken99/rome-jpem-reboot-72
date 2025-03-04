
import React from 'react';
import { Button } from '@/components/ui/button';
import { Receipt } from 'lucide-react';

export const TaxTable: React.FC = () => {
  const taxes = [
    { 
      name: 'Tributum', 
      description: 'Impôt sur la propriété foncière', 
      rate: '1%', 
      amount: '42,500 As',
      dueDate: 'Calendes de Mars'
    },
    { 
      name: 'Portorium', 
      description: 'Taxes douanières sur le commerce', 
      rate: '2.5%', 
      amount: '15,000 As',
      dueDate: 'Calendes de Juin'
    },
    { 
      name: 'Vicesima libertatis', 
      description: 'Taxe sur l\'affranchissement des esclaves', 
      rate: '5%', 
      amount: '8,000 As',
      dueDate: 'Calendes de Septembre'
    },
    { 
      name: 'Scriptura', 
      description: 'Taxe sur les pâturages publics', 
      rate: '3%', 
      amount: '12,000 As',
      dueDate: 'Calendes de Décembre'
    },
    { 
      name: 'Contributions spéciales', 
      description: 'Financement de la campagne militaire en Hispanie', 
      rate: 'Fixe', 
      amount: '10,000 As',
      dueDate: 'Ides de Juillet'
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-rome-gold/10 text-left">
            <th className="p-4 font-cinzel font-semibold">Nom</th>
            <th className="p-4 font-cinzel font-semibold">Description</th>
            <th className="p-4 font-cinzel font-semibold">Taux</th>
            <th className="p-4 font-cinzel font-semibold">Montant</th>
            <th className="p-4 font-cinzel font-semibold">Échéance</th>
            <th className="p-4 font-cinzel font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax, index) => (
            <tr 
              key={index} 
              className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
            >
              <td className="p-4 font-cinzel">{tax.name}</td>
              <td className="p-4 text-sm text-muted-foreground">{tax.description}</td>
              <td className="p-4">{tax.rate}</td>
              <td className="p-4 font-semibold">{tax.amount}</td>
              <td className="p-4 text-sm">{tax.dueDate}</td>
              <td className="p-4">
                <Button 
                  variant="outline" 
                  className="text-xs font-medium flex items-center gap-1 roman-btn-outline"
                >
                  <Receipt className="h-3 w-3" />
                  Payer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-rome-gold/20 font-semibold">
            <td colSpan={3} className="p-4 text-right font-cinzel">Total:</td>
            <td className="p-4 font-bold">87,500 As</td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
