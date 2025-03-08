
import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SenateurJouable, FactionPolitique } from '../types/maitreJeuTypes';
import { Slider } from '@/components/ui/slider';

interface SenateurModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  senateur: SenateurJouable | null;
  factions: FactionPolitique[];
  onSave: (senateur: SenateurJouable) => void;
}

export const SenateurModal: React.FC<SenateurModalProps> = ({
  open,
  onOpenChange,
  senateur,
  factions,
  onSave
}) => {
  const [editedSenateur, setEditedSenateur] = useState<SenateurJouable | null>(null);
  
  useEffect(() => {
    if (senateur) {
      setEditedSenateur({ ...senateur });
    }
  }, [senateur]);
  
  if (!editedSenateur) return null;
  
  const handleSave = () => {
    onSave(editedSenateur);
    onOpenChange(false);
  };
  
  const handleInputChange = (field: keyof SenateurJouable, value: any) => {
    setEditedSenateur({
      ...editedSenateur,
      [field]: value
    });
  };
  
  const handleCompetenceChange = (competence: string, value: number) => {
    setEditedSenateur({
      ...editedSenateur,
      compétences: {
        ...editedSenateur.compétences,
        [competence]: value
      }
    });
  };
  
  const handleRelationChange = (famille: string, value: number) => {
    setEditedSenateur({
      ...editedSenateur,
      relations: {
        ...editedSenateur.relations,
        [famille]: value
      }
    });
  };
  
  const fonctions = [
    "Aucune fonction",
    "Consul",
    "Préteur",
    "Édile",
    "Questeur",
    "Tribun de la plèbe",
    "Censeur",
    "Gouverneur",
    "Légat",
    "Pontife"
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestion du Sénateur: {editedSenateur.nom}</DialogTitle>
          <DialogDescription>
            Modifiez les détails, compétences et caractéristiques de ce sénateur
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Détails personnels</TabsTrigger>
            <TabsTrigger value="competences">Compétences</TabsTrigger>
            <TabsTrigger value="relations">Relations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom</label>
                <Input 
                  value={editedSenateur.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Famille</label>
                <Input 
                  value={editedSenateur.famille}
                  onChange={(e) => handleInputChange('famille', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Âge</label>
                <Input 
                  type="number"
                  min="25"
                  max="80"
                  value={editedSenateur.âge}
                  onChange={(e) => handleInputChange('âge', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Statut</label>
                <Select 
                  value={editedSenateur.statut} 
                  onValueChange={(value) => handleInputChange('statut', value as 'actif' | 'inactif' | 'décédé')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                    <SelectItem value="décédé">Décédé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Fonction actuelle</label>
                <Select 
                  value={editedSenateur.fonctionActuelle || "Aucune fonction"} 
                  onValueChange={(value) => handleInputChange('fonctionActuelle', value === "Aucune fonction" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fonctions.map(fonction => (
                      <SelectItem key={fonction} value={fonction}>
                        {fonction}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Appartenance politique</label>
                <Select 
                  value={editedSenateur.appartenance || "Indépendant"} 
                  onValueChange={(value) => handleInputChange('appartenance', value === "Indépendant" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indépendant">Indépendant</SelectItem>
                    {factions.map(faction => (
                      <SelectItem key={faction.id} value={faction.nom}>
                        {faction.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Ambition</label>
              <Textarea 
                value={editedSenateur.ambition}
                onChange={(e) => handleInputChange('ambition', e.target.value)}
                placeholder="Décrivez les ambitions de ce sénateur..."
              />
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Popularité</label>
                  <span className="text-sm">{editedSenateur.popularité}%</span>
                </div>
                <Slider 
                  value={[editedSenateur.popularité]} 
                  min={0} 
                  max={100} 
                  step={1}
                  onValueChange={(values) => handleInputChange('popularité', values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Influence</label>
                  <span className="text-sm">{editedSenateur.influence}%</span>
                </div>
                <Slider 
                  value={[editedSenateur.influence]} 
                  min={0} 
                  max={100} 
                  step={1}
                  onValueChange={(values) => handleInputChange('influence', values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Richesse</label>
                  <span className="text-sm">{editedSenateur.richesse}%</span>
                </div>
                <Slider 
                  value={[editedSenateur.richesse]} 
                  min={0} 
                  max={100} 
                  step={1}
                  onValueChange={(values) => handleInputChange('richesse', values[0])}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="competences" className="space-y-6">
            {Object.entries(editedSenateur.compétences).map(([competence, value]) => (
              <div key={competence} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">{competence}</label>
                  <span className="text-sm">{value} / 10</span>
                </div>
                <Slider 
                  value={[value]} 
                  min={1} 
                  max={10} 
                  step={1}
                  onValueChange={(values) => handleCompetenceChange(competence, values[0])}
                />
              </div>
            ))}
            
            <div className="pt-2 border-t">
              <div className="flex items-center">
                <Input
                  placeholder="Ajouter une compétence..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      handleCompetenceChange(e.currentTarget.value, 1);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button
                  variant="outline"
                  className="ml-2"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Ajouter une compétence..."]') as HTMLInputElement;
                    if (input && input.value) {
                      handleCompetenceChange(input.value, 1);
                      input.value = '';
                    }
                  }}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="relations" className="space-y-6">
            {Object.entries(editedSenateur.relations).map(([famille, value]) => (
              <div key={famille} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">{famille}</label>
                  <span className="text-sm">{value > 0 ? '+' : ''}{value}</span>
                </div>
                <Slider 
                  value={[value]} 
                  min={-10} 
                  max={10} 
                  step={1}
                  onValueChange={(values) => handleRelationChange(famille, values[0])}
                />
                <p className="text-xs text-muted-foreground">
                  {value > 7 ? 'Alliance forte' 
                    : value > 3 ? 'Amitié'
                    : value > 0 ? 'Relation cordiale'
                    : value > -4 ? 'Relation neutre'
                    : value > -8 ? 'Rivalité'
                    : 'Inimitié profonde'}
                </p>
              </div>
            ))}
            
            <div className="pt-2 border-t">
              <div className="flex items-center">
                <Input
                  placeholder="Ajouter une relation familiale..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      handleRelationChange(e.currentTarget.value, 0);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button
                  variant="outline"
                  className="ml-2"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Ajouter une relation familiale..."]') as HTMLInputElement;
                    if (input && input.value) {
                      handleRelationChange(input.value, 0);
                      input.value = '';
                    }
                  }}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Sauvegarder les modifications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
