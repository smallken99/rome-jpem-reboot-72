
import React from 'react';
import { ScrollText, Home, Coins, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Sample inheritance data
const heirs = [
  {
    id: '1',
    name: 'Gaius Tullius',
    relation: 'Fils Aîné',
    inheritance: {
      lands: 60,
      money: 45,
      titles: ['Villa Tusculana', 'Terres agricoles de Campanie']
    },
    isMainHeir: true
  },
  {
    id: '2',
    name: 'Julia Tullia',
    relation: 'Fille',
    inheritance: {
      lands: 20,
      money: 30,
      titles: ['Dot matrimoniale']
    },
    isMainHeir: false
  },
  {
    id: '3',
    name: 'Titus Tullius',
    relation: 'Fils Cadet',
    inheritance: {
      lands: 20,
      money: 25,
      titles: ['Insulae à Rome']
    },
    isMainHeir: false
  }
];

export const Inheritance: React.FC = () => {
  return (
    <div className="inheritance">
      <div className="p-4 mb-4 bg-rome-parchment/50 rounded-md">
        <p className="italic text-muted-foreground">
          La transmission du patrimoine est cruciale pour la survie de votre Gens.
          Répartissez vos biens entre vos héritiers pour garantir la pérennité de votre nom.
        </p>
      </div>
      
      <div className="testament-section mb-4">
        <div className="flex items-center gap-2 mb-3">
          <ScrollText className="h-5 w-5 text-rome-terracotta" />
          <h3 className="font-cinzel text-lg">Testament Actuel</h3>
        </div>
        
        <div className="p-3 border border-rome-gold/30 rounded-md bg-white/70">
          <p className="text-sm">
            <span className="font-medium">Status:</span>{' '}
            <span className="text-green-600">Validé par le Sénat</span>
          </p>
          <p className="text-sm mt-1">
            <span className="font-medium">Dernière modification:</span>{' '}
            <span>Ides de Mars, 710 AUC</span>
          </p>
        </div>
      </div>
      
      <div className="heirs-section">
        <div className="flex items-center gap-2 mb-3">
          <User className="h-5 w-5 text-rome-terracotta" />
          <h3 className="font-cinzel text-lg">Héritiers</h3>
        </div>
        
        <div className="space-y-3">
          {heirs.map(heir => (
            <HeirCard key={heir.id} heir={heir} />
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="roman-btn-outline text-sm">
          Modifier le Testament
        </button>
      </div>
    </div>
  );
};

interface HeirCardProps {
  heir: {
    id: string;
    name: string;
    relation: string;
    inheritance: {
      lands: number;
      money: number;
      titles: string[];
    };
    isMainHeir: boolean;
  };
}

const HeirCard: React.FC<HeirCardProps> = ({ heir }) => {
  return (
    <div className={`roman-card p-3 ${heir.isMainHeir ? 'border-l-4 border-l-rome-gold' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-cinzel">{heir.name}</h4>
          <p className="text-sm text-muted-foreground">{heir.relation}</p>
        </div>
        
        {heir.isMainHeir && (
          <div className="px-2 py-1 text-xs bg-rome-gold/20 text-rome-gold rounded">
            Héritier Principal
          </div>
        )}
      </div>
      
      <Separator className="my-2" />
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1">
          <Home className="h-4 w-4 text-muted-foreground" />
          <span>Terres: {heir.inheritance.lands}%</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Coins className="h-4 w-4 text-muted-foreground" />
          <span>Fortune: {heir.inheritance.money}%</span>
        </div>
      </div>
      
      <div className="mt-2 text-sm">
        <p className="font-medium">Titres et propriétés:</p>
        <ul className="ml-5 list-disc text-xs mt-1 text-muted-foreground">
          {heir.inheritance.titles.map((title, idx) => (
            <li key={idx}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
