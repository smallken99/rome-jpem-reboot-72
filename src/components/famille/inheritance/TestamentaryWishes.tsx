
import React, { useState } from 'react';
import { Character } from '@/types/character';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui-custom/toast';
import { Card } from '@/components/ui/card';

interface TestamentaryWishesProps {
  character: Character;
}

export const TestamentaryWishes: React.FC<TestamentaryWishesProps> = ({ character }) => {
  const [wishes, setWishes] = useState<string>(
    character.testamentaryWishes || 
    "Je soussigné, [Nom], sain de corps et d'esprit, déclare ceci comme étant mon testament et ma dernière volonté..."
  );
  
  const handleSave = () => {
    // In a real app, this would update the character's wishes
    toast.success("Dernières volontés sauvegardées avec succès.");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Déclaration Testamentaire</h3>
        <p className="text-sm text-gray-500 mb-4">
          Rédigez vos dernières volontés et instructions pour vos héritiers.
          Ce document sera lu lors de votre décès.
        </p>
        
        <Card className="p-6 bg-stone-50">
          <Textarea 
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            className="min-h-[300px] font-serif text-base bg-white border-gray-300"
          />
        </Card>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline">
          Modèles
        </Button>
        <Button onClick={handleSave}>
          Sauvegarder
        </Button>
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded">
        <h4 className="font-semibold text-amber-800 mb-2">Rappel Important</h4>
        <p className="text-sm text-amber-700">
          En droit romain, le testament doit respecter certaines formalités pour être valide.
          Assurez-vous de désigner clairement vos héritiers et les parts qui leur reviennent.
          Une consultation avec un juriste est recommandée pour garantir la validité du document.
        </p>
      </div>
    </div>
  );
};
