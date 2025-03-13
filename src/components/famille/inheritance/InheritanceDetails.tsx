
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Scroll, Crown, Award } from 'lucide-react';
import { toast } from 'sonner';
import { characters } from '@/data/characters';
import { Character } from '@/types/character';

export const InheritanceDetails: React.FC = () => {
  const { heirId } = useParams<{ heirId: string }>();
  const navigate = useNavigate();
  
  const [heir, setHeir] = useState<Character | null>(null);
  const [inheritanceNotes, setInheritanceNotes] = useState<string>('');
  const [futureTitle, setFutureTitle] = useState<string>('');
  
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
    toast.success(`${heir?.name} a été confirmé comme héritier principal`);
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
        <h2 className="text-2xl font-cinzel font-medium">Succession de {heir.name}</h2>
        <ActionButton 
          label="Retour" 
          to="/famille/heritage"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-rome-navy" />
            <h3 className="font-cinzel">Détails de l'Héritier</h3>
          </div>
        </RomanCard.Header>
        
        <RomanCard.Content>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heirName">Héritier désigné</Label>
              <Input 
                id="heirName" 
                value={heir.name} 
                disabled
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="futureTitle">Titre futur</Label>
              <Input 
                id="futureTitle" 
                value={futureTitle}
                onChange={(e) => setFutureTitle(e.target.value)}
                placeholder="Ex: Pater Familias de la Gens Julia"
              />
              <p className="text-xs text-muted-foreground">
                Le titre qui sera accordé à l'héritier lorsqu'il prendra la tête de la famille.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inheritanceNotes">Instructions et conditions spéciales</Label>
              <Textarea
                id="inheritanceNotes"
                value={inheritanceNotes}
                onChange={(e) => setInheritanceNotes(e.target.value)}
                placeholder="Ajoutez des conditions ou instructions particulières pour l'héritier..."
                className="min-h-[150px]"
              />
            </div>
            
            <div className="bg-rome-parchment/50 p-3 rounded-md text-sm space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-rome-terracotta" />
                <h4 className="font-medium">Tradition familiale</h4>
              </div>
              <p>
                Selon la tradition romaine, l'héritier principal (heres) devient le nouveau 
                Pater Familias et chef de la famille. Il aura la responsabilité de préserver 
                l'honneur et la position de la famille dans la société romaine.
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
                label="Confirmer l'héritier"
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
