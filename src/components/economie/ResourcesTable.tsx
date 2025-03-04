
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

export const ResourcesTable: React.FC = () => {
  const resources = [
    { 
      name: 'Or', 
      quantity: '12 livres', 
      value: '30,000 As',
      location: 'Coffre personnel',
      trend: 'up'
    },
    { 
      name: 'Argent', 
      quantity: '45 livres', 
      value: '22,500 As',
      location: 'Coffre personnel',
      trend: 'up'
    },
    { 
      name: 'Blé', 
      quantity: '1,200 modii', 
      value: '24,000 As',
      location: 'Greniers de Campanie',
      trend: 'up'
    },
    { 
      name: 'Vin', 
      quantity: '80 amphores', 
      value: '16,000 As',
      location: 'Cave de la Villa Aurelia',
      trend: 'neutral'
    },
    { 
      name: 'Huile d\'olive', 
      quantity: '50 amphores', 
      value: '12,500 As',
      location: 'Entrepôt d\'Ostie',
      trend: 'up'
    },
    { 
      name: 'Tissu de luxe', 
      quantity: '20 rouleaux', 
      value: '10,000 As',
      location: 'Villa Aurelia',
      trend: 'down'
    },
    { 
      name: 'Marbre', 
      quantity: '15 blocs', 
      value: '30,000 As',
      location: 'Carrière de Carrare',
      trend: 'neutral'
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-rome-gold/10 text-left">
            <th className="p-4 font-cinzel font-semibold">Ressource</th>
            <th className="p-4 font-cinzel font-semibold">Quantité</th>
            <th className="p-4 font-cinzel font-semibold">Valeur</th>
            <th className="p-4 font-cinzel font-semibold">Emplacement</th>
            <th className="p-4 font-cinzel font-semibold">Tendance</th>
            <th className="p-4 font-cinzel font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, index) => (
            <tr 
              key={index} 
              className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
            >
              <td className="p-4 font-cinzel">{resource.name}</td>
              <td className="p-4">{resource.quantity}</td>
              <td className="p-4 font-semibold">{resource.value}</td>
              <td className="p-4 text-sm text-muted-foreground">{resource.location}</td>
              <td className="p-4">
                {getTrendIcon(resource.trend)}
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs font-medium flex items-center gap-1 h-8 px-2 roman-btn-outline"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    Vendre
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs font-medium flex items-center gap-1 h-8 px-2 roman-btn-outline"
                  >
                    <ArrowUpDown className="h-3 w-3" />
                    Échanger
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-rome-gold/20 font-semibold">
            <td colSpan={2} className="p-4 text-right font-cinzel">Valeur totale:</td>
            <td className="p-4 font-bold">145,000 As</td>
            <td colSpan={3}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
