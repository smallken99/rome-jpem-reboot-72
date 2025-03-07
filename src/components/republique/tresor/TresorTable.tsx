
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Check
} from 'lucide-react';

export const TresorTable: React.FC = () => {
  const transactions = [
    { 
      id: 1,
      date: "XV Kal. Mar.",
      description: "Financement de la légion XII Fulminata", 
      montant: "-150,000 As", 
      categorie: "Militaire",
      type: "depense",
      approuvePar: "Quintus Fabius Maximus"
    },
    { 
      id: 2,
      date: "III Non. Mar.",
      description: "Collecte du tributum - Province d'Hispanie", 
      montant: "+230,000 As", 
      categorie: "Impôts",
      type: "revenu",
      approuvePar: "Quintus Fabius Maximus"
    },
    { 
      id: 3,
      date: "Id. Mar.",
      description: "Construction du nouvel aqueduc à Rome", 
      montant: "-120,000 As", 
      categorie: "Infrastructure",
      type: "depense",
      approuvePar: "Gaius Cornelius Scipio"
    },
    { 
      id: 4,
      date: "VI Kal. Apr.",
      description: "Taxes portuaires - Port d'Ostie", 
      montant: "+85,000 As", 
      categorie: "Commerce",
      type: "revenu",
      approuvePar: "Quintus Fabius Maximus"
    },
    { 
      id: 5,
      date: "III Kal. Apr.",
      description: "Paiement des fonctionnaires publics", 
      montant: "-65,000 As", 
      categorie: "Administration",
      type: "depense",
      approuvePar: "Quintus Fabius Maximus"
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-rome-gold/10 text-left">
            <th className="p-4 font-cinzel font-semibold">Date</th>
            <th className="p-4 font-cinzel font-semibold">Description</th>
            <th className="p-4 font-cinzel font-semibold">Montant</th>
            <th className="p-4 font-cinzel font-semibold">Catégorie</th>
            <th className="p-4 font-cinzel font-semibold">Approuvé par</th>
            <th className="p-4 font-cinzel font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr 
              key={transaction.id} 
              className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
            >
              <td className="p-4 font-cinzel text-sm">{transaction.date}</td>
              <td className="p-4">{transaction.description}</td>
              <td className={`p-4 font-semibold ${transaction.type === 'revenu' ? 'text-green-600' : 'text-red-600'}`}>
                <div className="flex items-center">
                  {transaction.type === 'revenu' ? 
                    <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  }
                  {transaction.montant}
                </div>
              </td>
              <td className="p-4 text-sm">{transaction.categorie}</td>
              <td className="p-4 text-sm text-muted-foreground">{transaction.approuvePar}</td>
              <td className="p-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs font-medium flex items-center gap-1 h-8 px-2 roman-btn-outline"
                >
                  <Check className="h-3 w-3" />
                  Détails
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
