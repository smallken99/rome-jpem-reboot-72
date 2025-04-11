
import React, { useState } from 'react';
import { Character } from '@/types/character';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Scroll, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useCharacters } from '../hooks/useCharacters';

interface TestamentaryWishesProps {
  character: Character;
}

export const TestamentaryWishes: React.FC<TestamentaryWishesProps> = ({
  character
}) => {
  const { updateCharacter } = useCharacters();
  const [wishes, setWishes] = useState<string>(character.testamentaryWishes || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const handleSave = () => {
    try {
      updateCharacter({
        ...character,
        testamentaryWishes: wishes
      });
      setIsEditing(false);
      toast.success("Dernières volontés sauvegardées");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des volontés:", error);
      toast.error("Une erreur s'est produite lors de la sauvegarde");
    }
  };
  
  const handleCancel = () => {
    setWishes(character.testamentaryWishes || '');
    setIsEditing(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scroll className="h-5 w-5 text-primary" />
          Dernières Volontés
        </CardTitle>
        <CardDescription>
          Rédigez vos instructions pour la transmission de votre héritage
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="wishes">Mes dernières volontés</Label>
              <Textarea
                id="wishes"
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                className="min-h-[200px] mt-2"
                placeholder="Rédigez ici vos dernières volontés et instructions pour vos héritiers..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Sauvegarder
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="min-h-[200px] border rounded-md p-4 bg-muted/20">
              {character.testamentaryWishes ? (
                <div className="prose prose-sm max-w-none">
                  <p>{character.testamentaryWishes}</p>
                </div>
              ) : (
                <div className="text-muted-foreground italic h-full flex items-center justify-center">
                  <p>Aucune disposition testamentaire rédigée</p>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(true)}>
                {character.testamentaryWishes ? 'Modifier' : 'Rédiger'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
