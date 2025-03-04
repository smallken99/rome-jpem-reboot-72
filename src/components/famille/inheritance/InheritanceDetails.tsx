
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Scroll, Coins, Award } from 'lucide-react';
import { toast } from 'sonner';
import { characters } from '@/data/characters';
import { Character } from '@/types/character';

export const InheritanceDetails: React.FC = () => {
  const { heirId } = useParams<{ heirId: string }>();
  const navigate = useNavigate();
  
  const [heir, setHeir] = useState<Character | null>(null);
  const [inheritanceAmount, setInheritanceAmount] = useState<number>(50000);
  const [inheritanceNotes, setInheritanceNotes] = useState<string>('');
  
  useEffect(() => {
    if (heirId) {
      const foundHeir = characters.find(char => char.id === heirId);
      if (foundHeir) {
        setHeir(foundHeir);
      } else {
        toast.error("Héritier non trouvé");
        navigate('/famille/heritage');
      }
    }
  }, [heirId, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Testament mis à jour pour ${heir?.name}`);
    navigate('/famille/heritage');
  };
  
  if (!heir) {
    return (
      <div className="p-4 text-center">
        <p>Chargement des informations...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-cinzel font-medium">Testament pour {heir.name}</h2>
        <ActionButton 
          label="Retour à l'héritage" 
          to="/famille/heritage"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <div className="flex items-center gap-2">
            <Scroll className="h-5 w-5 text-rome-navy" />
            <h3 className="font-cinzel">Détails du Testament</h3>
          </div>
        </RomanCard.Header>
        
        <RomanCard.Content>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heirName">Héritier</Label>
              <Input 
                id="heirName" 
                value={heir.name} 
                disabled
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inheritanceAmount">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-rome-gold" />
                  <span>Montant de l'héritage (en As)</span>
                </div>
              </Label>
              <Input 
                id="inheritanceAmount" 
                type="number" 
                value={inheritanceAmount}
                onChange={(e) => setInheritanceAmount(parseInt(e.target.value) || 0)}
                min={0}
              />
              <p className="text-xs text-muted-foreground">
                La valeur totale du patrimoine familial disponible pour l'héritage.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inheritanceNotes">Conditions et clauses spéciales</Label>
              <Textarea
                id="inheritanceNotes"
                value={inheritanceNotes}
                onChange={(e) => setInheritanceNotes(e.target.value)}
                placeholder="Ajoutez des conditions spéciales ou des clauses au testament..."
                className="min-h-[150px]"
              />
            </div>
            
            <div className="bg-rome-parchment/50 p-3 rounded-md text-sm space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-rome-terracotta" />
                <h4 className="font-medium">Implications légales</h4>
              </div>
              <p>
                Selon la loi romaine, un testament doit nommer un héritier principal (heres) qui
                recevra la majorité du patrimoine. Des legs spécifiques (legata) peuvent être attribués
                à d'autres personnes.
              </p>
              <p>
                Le testament doit être signé en présence de sept témoins citoyens pour être valide.
              </p>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <ActionButton 
                variant="outline"
                label="Annuler"
                to="/famille/heritage"
              />
              <ActionButton 
                type="submit"
                label="Enregistrer le testament"
                variant="default"
              />
            </div>
          </form>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};

export default InheritanceDetails;
