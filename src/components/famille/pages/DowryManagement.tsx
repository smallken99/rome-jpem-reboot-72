
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { formatMoney } from '@/utils/formatUtils';
import { toast } from 'sonner';
import { Coins, Heart, Scale, User } from 'lucide-react';

export const DowryManagement: React.FC = () => {
  const [charName, setCharName] = useState<string>("Julia");
  const [dowryAmount, setDowryAmount] = useState<number>(15000);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  
  // Sample data for potential families
  const eligibleFamilies = [
    { id: 'cornelia', name: 'Gens Cornelia', prestige: 'Haute', influence: '+++', wealth: '++' },
    { id: 'julia', name: 'Gens Julia', prestige: 'Très haute', influence: '++++', wealth: '+++' },
    { id: 'claudia', name: 'Gens Claudia', prestige: 'Moyenne', influence: '++', wealth: '++++' },
  ];
  
  const handleDowrySubmit = () => {
    if (!selectedFamily) {
      toast.error("Veuillez sélectionner une famille pour l'alliance");
      return;
    }
    
    const familyName = eligibleFamilies.find(f => f.id === selectedFamily)?.name || "famille inconnue";
    
    toast.success(`Proposition de dot de ${formatMoney(dowryAmount)} envoyée à la ${familyName}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" />
              Configuration de la Dot
            </CardTitle>
            <CardDescription>
              La dot est un élément crucial des alliances matrimoniales. Une dot généreuse peut attirer des familles prestigieuses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="characterName">Nom de la personne concernée</Label>
              <Input 
                id="characterName" 
                value={charName} 
                onChange={(e) => setCharName(e.target.value)} 
                placeholder="Nom du personnage"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Montant de la dot</Label>
                <span className="text-lg font-medium">{formatMoney(dowryAmount)}</span>
              </div>
              <Slider
                value={[dowryAmount]}
                min={5000}
                max={50000}
                step={1000}
                onValueChange={(value) => setDowryAmount(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 000 As</span>
                <span>50 000 As</span>
              </div>
            </div>
            
            <div className="pt-3">
              <Label>Famille potentielle pour l'alliance</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                {eligibleFamilies.map((family) => (
                  <button
                    key={family.id}
                    className={`p-3 rounded-md border text-left transition-all ${
                      selectedFamily === family.id 
                        ? 'border-amber-500 bg-amber-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedFamily(family.id)}
                  >
                    <div className="font-medium">{family.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Prestige: {family.prestige}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Influence: {family.influence}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Annuler</Button>
            <Button onClick={handleDowrySubmit}>Proposer la Dot</Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                Avantages d'une Bonne Dot
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>Une dot généreuse peut apporter:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Alliances avec des familles prestigieuses</li>
                <li>Augmentation de l'influence politique</li>
                <li>Meilleure position sociale pour vos enfants</li>
                <li>Opportunités commerciales avec la famille alliée</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Scale className="h-4 w-4 text-blue-500" />
                Impact sur les Finances
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <span>Dot actuelle:</span>
                    <span className="font-medium">{formatMoney(dowryAmount)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Impact sur votre trésorerie:</span>
                    <span>{dowryAmount > 20000 ? "Élevé" : dowryAmount > 10000 ? "Modéré" : "Faible"}</span>
                  </div>
                </div>
                
                <div className="bg-muted p-2 rounded text-xs">
                  <p className="font-medium">Note:</p>
                  <p>La dot est versée en une seule fois lors de la conclusion de l'alliance matrimoniale.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
