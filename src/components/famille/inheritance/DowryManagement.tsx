
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Coins, Scroll, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { characters } from '@/data/characters';
import { Character } from '@/types/character';

export const DowryManagement: React.FC = () => {
  const { femaleId } = useParams<{ femaleId: string }>();
  const navigate = useNavigate();
  
  const [female, setFemale] = useState<Character | null>(null);
  const [dowryAmount, setDowryAmount] = useState<number>(10000);
  const [dowryItems, setDowryItems] = useState<string[]>([]);
  const [newDowryItem, setNewDowryItem] = useState<string>('');
  const [allocationType, setAllocationType] = useState<string>("percentage");
  const [percentageOfWealth, setPercentageOfWealth] = useState<number>(20);
  
  useEffect(() => {
    if (femaleId) {
      const foundFemale = characters.find(char => char.id === femaleId && char.gender === 'female');
      if (foundFemale) {
        setFemale(foundFemale);
      } else {
        toast.error("Personnage féminin non trouvé");
        navigate('/famille/heritage');
      }
    }
  }, [femaleId, navigate]);
  
  const handleAddDowryItem = () => {
    if (newDowryItem.trim()) {
      setDowryItems([...dowryItems, newDowryItem.trim()]);
      setNewDowryItem('');
    }
  };
  
  const handleRemoveDowryItem = (index: number) => {
    setDowryItems(dowryItems.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Dot définie pour ${female?.name}`);
    navigate('/famille/heritage');
  };
  
  const handleAllocationTypeChange = (value: string) => {
    setAllocationType(value);
  };
  
  if (!female) {
    return (
      <div className="p-4 text-center">
        <p>Chargement des informations...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-cinzel font-medium">Gestion de la Dot pour {female.name}</h2>
        <ActionButton 
          label="Retour à l'héritage" 
          to="/famille/heritage"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      
      <div className="bg-rome-parchment/50 p-4 rounded-md">
        <h3 className="font-cinzel text-xl mb-2 flex items-center gap-2">
          <Heart className="h-5 w-5 text-rome-terracotta" />
          À propos des Dots
        </h3>
        <p className="text-sm">
          À Rome, la dot (dos) est un élément essentiel du mariage. Elle est fournie par la famille de la mariée
          au mari lors du mariage, mais reste théoriquement la propriété de la femme. En cas de divorce ou de décès
          du mari, la dot doit être restituée à la femme ou à sa famille.
        </p>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <div className="flex items-center gap-2">
            <Scroll className="h-5 w-5 text-rome-navy" />
            <h3 className="font-cinzel">Configuration de la Dot</h3>
          </div>
        </RomanCard.Header>
        
        <RomanCard.Content>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Label>Type d'allocation</Label>
              <Select 
                value={allocationType} 
                onValueChange={handleAllocationTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir un type d'allocation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Montant fixe</SelectItem>
                  <SelectItem value="percentage">Pourcentage du patrimoine</SelectItem>
                </SelectContent>
              </Select>
              
              {allocationType === "fixed" ? (
                <div className="space-y-2">
                  <Label htmlFor="dowryAmount">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-rome-gold" />
                      <span>Montant de la dot (en As)</span>
                    </div>
                  </Label>
                  <Input 
                    id="dowryAmount" 
                    type="number" 
                    value={dowryAmount}
                    onChange={(e) => setDowryAmount(parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="percentageOfWealth">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-rome-gold" />
                      <span>Pourcentage du patrimoine familial (%)</span>
                    </div>
                  </Label>
                  <Input 
                    id="percentageOfWealth" 
                    type="number" 
                    value={percentageOfWealth}
                    onChange={(e) => setPercentageOfWealth(parseInt(e.target.value) || 0)}
                    min={0}
                    max={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    Équivalent à environ {Math.round(percentageOfWealth * 1000)} As selon l'estimation actuelle du patrimoine.
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-3 mt-6">
              <Label>Biens inclus dans la dot</Label>
              <div className="flex gap-2">
                <Input 
                  value={newDowryItem}
                  onChange={(e) => setNewDowryItem(e.target.value)}
                  placeholder="Bijoux, terres, esclaves, etc."
                  className="flex-1"
                />
                <ActionButton 
                  label="Ajouter" 
                  onClick={handleAddDowryItem}
                  type="button"
                />
              </div>
              
              {dowryItems.length > 0 && (
                <div className="mt-2 space-y-2">
                  <Label>Biens ajoutés:</Label>
                  <ul className="space-y-1">
                    {dowryItems.map((item, index) => (
                      <li key={index} className="flex justify-between items-center bg-rome-parchment/30 p-2 rounded">
                        <span>{item}</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveDowryItem(index)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Retirer
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <ActionButton 
                variant="outline"
                label="Annuler"
                to="/famille/heritage"
              />
              <ActionButton 
                type="submit"
                label="Enregistrer la dot"
                variant="default"
              />
            </div>
          </form>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};

export default DowryManagement;
