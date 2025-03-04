
import React, { useState } from 'react';
import { ScrollText, User, Crown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { characters } from '@/data/characters';
import { useToast } from '@/components/ui/use-toast';
import { HeirCard } from './inheritance/HeirCard';
import { FemaleCard } from './inheritance/FemaleCard';

export const Inheritance: React.FC = () => {
  // Filter to only male heirs for inheritance eligibility
  const eligibleHeirs = characters.filter(char => 
    char.gender === 'male' && (
      char.role?.toLowerCase().includes('fils') || 
      char.role?.toLowerCase().includes('neveu') ||
      char.role?.toLowerCase().includes('frère')
    )
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
            <p className="text-muted-foreground">Aucun héritier potentiel masculin n'a été trouvé dans votre famille.</p>
          </div>
        )}
        
        {/* Display female family members separately as non-eligible */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-rome-terracotta" />
            <h3 className="font-cinzel text-lg">Membres Féminins (non éligibles à l'héritage principal)</h3>
          </div>
          
          {characters.filter(char => char.gender === 'female' && char.role?.toLowerCase().includes('fille')).map(female => (
            <FemaleCard key={female.id} female={female} />
          ))}
        </div>
      </div>
    </div>
  );
};
