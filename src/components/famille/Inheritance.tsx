import React, { useState } from 'react';
import { ScrollText, Home, Coins, User, Crown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { characters } from '@/data/characters';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

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
      
      <Tabs defaultValue="heirs" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="heirs" className="font-cinzel">Héritiers Potentiels</TabsTrigger>
          <TabsTrigger value="laws" className="font-cinzel">Lois de Succession</TabsTrigger>
        </TabsList>
        
        <TabsContent value="heirs" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="laws" className="space-y-4">
          <div className="roman-card p-4">
            <h4 className="font-cinzel text-base mb-2">Lois de Succession Romaines</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Le droit romain favorisait la ligne masculine et l'aînesse, mais le pater familias avait 
              une grande liberté dans le choix de son héritier principal.
            </p>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-rome-terracotta shrink-0" />
                <p>L'héritier principal (heres) recevait la majorité des propriétés et du patrimoine familial.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-rome-terracotta shrink-0" />
                <p>Les filles pouvaient hériter mais recevaient généralement une dot de mariage plutôt que des terres.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-rome-terracotta shrink-0" />
                <p>Un testament devait être validé par le Sénat pour être considéré comme légal.</p>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
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
  
  return (
    <div className={`roman-card p-3 transition-all ${isSelected ? 'border-l-4 border-l-rome-gold bg-rome-gold/5' : ''}`}>
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
          <span>{heir.gender === 'male' ? 'Hérite des terres' : 'Dot de mariage'}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Coins className="h-4 w-4 text-muted-foreground" />
          <span>{isSelected ? 'Hérite de la fortune' : 'Pension annuelle'}</span>
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
    </div>
  );
};
