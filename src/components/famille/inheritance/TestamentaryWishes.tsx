
import React, { useState } from 'react';
import { Character } from '@/types/character';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui-custom/toast';
import { useCharacters } from '../hooks/useCharacters';

interface TestamentaryWishesProps {
  character: Character;
}

export const TestamentaryWishes: React.FC<TestamentaryWishesProps> = ({ character }) => {
  const { updateCharacter } = useCharacters();
  const [wishes, setWishes] = useState<string>(character.testamentaryWishes || '');
  
  const handleSaveWishes = () => {
    updateCharacter(character.id, { testamentaryWishes: wishes });
    toast.success("Vos dernières volontés ont été enregistrées");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dernières Volontés</CardTitle>
        <CardDescription>
          Rédigez vos instructions pour l'avenir de votre famille et de vos possessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              En tant que Pater Familias, vos dernières volontés seront suivies après votre décès.
              Vous pouvez spécifier comment vous souhaitez que vos biens soient répartis, donner des
              conseils à votre successeur, ou exprimer vos souhaits pour l'avenir de votre famille.
            </p>
            
            <Textarea
              className="min-h-[200px]"
              placeholder="Rédigez vos dernières volontés ici..."
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
            />
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-amber-800 mb-2">Conseils de rédaction</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Désignez clairement votre héritier principal</li>
              <li>• Spécifiez la distribution de vos biens</li>
              <li>• Donnez des instructions pour l'éducation des enfants mineurs</li>
              <li>• Mentionnez les alliances familiales à préserver</li>
              <li>• Adressez vos souhaits concernant vos funérailles</li>
            </ul>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveWishes}>
              Sauvegarder mes dernières volontés
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
