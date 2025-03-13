
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scroll, Users, Crown } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { HeirCard } from './inheritance/HeirCard';
import { toast } from 'sonner';

// Données fictives pour les héritiers potentiels
const heirsList = [
  { id: "heir1", name: "Marcus Tullius", role: "Fils aîné", gender: "male" as const, age: 18 },
  { id: "heir2", name: "Lucius Tullius", role: "Fils cadet", gender: "male" as const, age: 16 },
  { id: "heir3", name: "Gnaeus Tullius", role: "Neveu", gender: "male" as const, age: 22 },
];

export const Inheritance: React.FC = () => {
  const [selectedHeirId, setSelectedHeirId] = useState<string>("heir1");
  
  const handleSelectHeir = (heirId: string) => {
    setSelectedHeirId(heirId);
    const heir = heirsList.find(h => h.id === heirId);
    toast.success(`${heir?.name} a été désigné comme héritier principal de la famille`);
  };
  
  return (
    <div className="inheritance">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-cinzel mb-1">Succession Familiale</h3>
          <p className="text-sm text-muted-foreground">
            Choisissez l'héritier qui perpétuera le nom et les traditions de votre famille
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded">
            <Users className="h-4 w-4" />
            <span className="font-medium">{heirsList.length} candidats à la succession</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded">
            <Crown className="h-4 w-4" />
            <span className="font-medium">Héritier: {heirsList.find(h => h.id === selectedHeirId)?.name}</span>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Candidats à la succession</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Sélectionnez le membre de votre famille qui deviendra l'héritier principal. 
              Il héritera du nom familial, des titres et de la position politique.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {heirsList.map(heir => (
                <HeirCard 
                  key={heir.id}
                  heir={heir}
                  isSelected={heir.id === selectedHeirId}
                  onSelect={handleSelectHeir}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
