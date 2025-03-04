
import React, { useState } from 'react';
import { ScrollText, Home, Coins, User, Crown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { characters } from '@/data/characters';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RomanCard } from '@/components/ui-custom/RomanCard';

// Function to calculate dowry value based on age and other factors
const calculateDowryValue = (heir: {
  age: number;
  gender: 'male' | 'female';
  role?: string;
}) => {
  // Base value for dowry calculation
  const baseValue = 100000; // 100,000 As as base value
  
  // Age factor - younger brides/grooms have higher dowry potential
  const ageFactor = Math.max(0.5, 1 - (heir.age - 12) * 0.05);
  
  // Role bonus - certain roles (like being the first daughter) increase dowry
  const roleBonus = heir.role?.toLowerCase().includes('aîné') ? 1.5 : 1.2;
  
  // Calculate final value
  const dowryValue = Math.round(baseValue * ageFactor * roleBonus);
  
  // Format with Roman numerals for large values
  return `${(dowryValue / 1000).toFixed(0)}K As`;
};

export const Inheritance: React.FC = () => {
  const eligibleHeirs = characters.filter(char => 
    char.role?.toLowerCase().includes('fils') || 
    char.role?.toLowerCase().includes('fille')
  );
  
  const defaultHeir = eligibleHeirs.find(heir => 
    heir.role?.toLowerCase().includes('fils aîné')
  ) || eligibleHeirs[0];
  
  const [selectedHeirId, setSelectedHeirId] = useState<string>(defaultHeir?.id || '');
  const { toast } = useToast();
  
  const handleHeirSelection = (heirId: string) => {
    setSelectedHeirId(heirId);
    
    toast({
      title: "Héritier sélectionné",
      description: "L'héritier principal a été désigné avec succès.",
      duration: 3000,
    });
  };
  
  return (
    <div className="inheritance">
      <div className="p-4 mb-4 bg-rome-parchment/50 rounded-md">
        <p className="italic text-muted-foreground">
          Dans la tradition romaine, la succession se faisait par désignation d'un héritier principal, 
          généralement le fils aîné. Désignez votre héritier pour assurer la continuité de votre Gens.
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
          
          {selectedHeirId && (
            <div className="mt-3 pt-3 border-t border-dashed border-muted">
              <p className="text-sm font-medium flex items-center gap-1.5">
                <Crown className="h-4 w-4 text-rome-gold" />
                Héritier Principal: 
                <span className="text-rome-navy">
                  {characters.find(char => char.id === selectedHeirId)?.name || 'Inconnu'}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="heirs-section space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <User className="h-5 w-5 text-rome-terracotta" />
          <h3 className="font-cinzel text-lg">Héritiers Potentiels</h3>
        </div>
        
        {eligibleHeirs.length > 0 ? (
          eligibleHeirs.map(heir => (
            <HeirCard 
              key={heir.id} 
              heir={heir} 
              isSelected={heir.id === selectedHeirId}
              onSelect={handleHeirSelection}
            />
          ))
        ) : (
          <div className="text-center p-4 border border-dashed border-muted rounded-md">
            <p className="text-muted-foreground">Aucun héritier potentiel n'a été trouvé dans votre famille.</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface HeirCardProps {
  heir: {
    id: string;
    name: string;
    role?: string;
    gender: 'male' | 'female';
    age: number;
  };
  isSelected: boolean;
  onSelect: (heirId: string) => void;
}

const HeirCard: React.FC<HeirCardProps> = ({ heir, isSelected, onSelect }) => {
  const relation = heir.role || (heir.gender === 'male' ? 'Fils' : 'Fille');
  const dowryValue = calculateDowryValue(heir);
  
  return (
    <RomanCard className={`p-3 transition-all ${isSelected ? 'border-l-4 border-l-rome-gold bg-rome-gold/5' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-cinzel">{heir.name}</h4>
          <p className="text-sm text-muted-foreground">{relation} • {heir.age} ans</p>
        </div>
        
        {isSelected ? (
          <div className="px-2 py-1 text-xs bg-rome-gold/20 text-rome-gold rounded flex items-center gap-1">
            <Crown className="h-3.5 w-3.5" />
            Héritier Principal
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onSelect(heir.id)}
            className="text-xs border-rome-navy/30 text-rome-navy hover:bg-rome-navy/10"
          >
            Désigner Héritier
          </Button>
        )}
      </div>
      
      <Separator className="my-2" />
      
      <div className="text-sm grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1">
          <Home className="h-4 w-4 text-muted-foreground" />
          <span>{heir.gender === 'male' ? 'Hérite des terres' : `Dot de mariage (${dowryValue})`}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Coins className="h-4 w-4 text-muted-foreground" />
          <span>{isSelected ? 'Hérite de la fortune' : 'Portion d\'héritage'}</span>
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-3 pt-2 border-t border-dashed border-muted">
          <p className="text-xs text-rome-navy">
            En tant qu'héritier principal, {heir.name} recevra la majorité des terres et des propriétés, 
            ainsi que le nom et les titres de la famille.
          </p>
        </div>
      )}
    </RomanCard>
  );
};
