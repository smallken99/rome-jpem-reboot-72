
import React, { useState } from 'react';
import { Character } from '@/types/character';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInheritanceRules } from './inheritanceUtils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollText, Info, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useCharacters } from '../hooks/useCharacters';

interface HeirSelectionProps {
  character: Character;
  allCharacters: Character[];
  eligibleHeirs: Character[];
}

export const HeirSelection: React.FC<HeirSelectionProps> = ({
  character,
  allCharacters,
  eligibleHeirs
}) => {
  const { updateCharacter } = useCharacters();
  const [selectedHeir, setSelectedHeir] = useState<string | null>(null);
  const [overrideRules, setOverrideRules] = useState<boolean>(false);
  
  const rules = getInheritanceRules();
  
  const handleConfirmHeirSelection = () => {
    if (!selectedHeir) return;
    
    try {
      // Dans une implémentation réelle, cela mettrait à jour le testament
      updateCharacter(character.id, {
        testamentaryWishes: `Je désigne ${allCharacters.find(c => c.id === selectedHeir)?.name} comme mon héritier principal. ${character.testamentaryWishes || ''}`
      });
      
      toast.success("Héritier désigné avec succès");
    } catch (error) {
      console.error("Erreur lors de la désignation de l'héritier:", error);
      toast.error("Une erreur s'est produite lors de la désignation de l'héritier");
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary" />
            Règles de succession
          </CardTitle>
          <CardDescription>
            Règles traditionnelles romaines pour la succession
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/20 p-4 rounded-md mb-4">
            <div className="flex items-start gap-2 mb-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <p className="text-sm">
                Selon la tradition romaine, la succession suit des règles strictes.
                Toutefois, le chef de famille peut désigner un héritier spécifique
                dans son testament, qui prévaudra sur l'ordre naturel.
              </p>
            </div>
            
            <ul className="space-y-2 pl-6 list-disc">
              {rules.map((rule, index) => (
                <li key={index} className="text-sm">{rule}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox 
              id="override" 
              checked={overrideRules} 
              onCheckedChange={(checked) => setOverrideRules(checked as boolean)}
            />
            <Label htmlFor="override" className="text-sm">
              Je souhaite désigner un héritier spécifique
            </Label>
          </div>
        </CardContent>
      </Card>
      
      {overrideRules && (
        <Card>
          <CardHeader>
            <CardTitle>Sélection de l'héritier</CardTitle>
            <CardDescription>
              Choisissez qui héritera de vos biens et titres
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eligibleHeirs.length > 0 ? (
                <>
                  {eligibleHeirs.map((heir) => (
                    <div 
                      key={heir.id} 
                      className={`flex items-center p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${selectedHeir === heir.id ? 'border-primary bg-primary/10' : ''}`}
                      onClick={() => setSelectedHeir(heir.id)}
                    >
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={heir.portrait} alt={heir.name} />
                        <AvatarFallback>{heir.name?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{heir.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {heir.relation} • {heir.age} ans
                        </p>
                      </div>
                      {selectedHeir === heir.id && (
                        <Badge className="ml-auto bg-green-500 gap-1">
                          <Check className="h-3 w-3" />
                          Sélectionné
                        </Badge>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      onClick={handleConfirmHeirSelection}
                      disabled={!selectedHeir}
                    >
                      Confirmer la sélection
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  <p>Aucun héritier potentiel disponible</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
