
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { FamilleInfo, StatutFamilial, FamilleCreationData } from '../../../../types';

interface FamilleCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFamille: (data: FamilleCreationData) => void;
  onUpdateFamille: (data: FamilleCreationData) => void;
  famille?: FamilleInfo | null;
}

export const FamilleCreationDialog: React.FC<FamilleCreationDialogProps> = ({
  isOpen,
  onClose,
  onCreateFamille,
  onUpdateFamille,
  famille
}) => {
  const [formData, setFormData] = useState<FamilleCreationData>({
    nom: '',
    gens: '',
    statut: 'Patricien' as StatutFamilial,
    prestige: 50,
    influence: 50,
    richesse: 10000,
    description: '',
    devise: '',
    couleurPrimaire: '#' + Math.floor(Math.random() * 16777215).toString(16),
    couleurSecondaire: '#' + Math.floor(Math.random() * 16777215).toString(16)
  });

  useEffect(() => {
    if (famille) {
      setFormData({
        nom: famille.nom,
        gens: famille.gens,
        statut: famille.statut,
        prestige: famille.prestige,
        influence: famille.influence,
        richesse: famille.richesse,
        description: famille.description,
        devise: famille.devise || '',
        blason: famille.blason,
        couleurPrimaire: famille.couleurPrimaire || '#000000',
        couleurSecondaire: famille.couleurSecondaire || '#ffffff'
      });
    } else {
      // Reset to default values
      setFormData({
        nom: '',
        gens: '',
        statut: 'Patricien' as StatutFamilial,
        prestige: 50,
        influence: 50,
        richesse: 10000,
        description: '',
        devise: '',
        couleurPrimaire: '#' + Math.floor(Math.random() * 16777215).toString(16),
        couleurSecondaire: '#' + Math.floor(Math.random() * 16777215).toString(16)
      });
    }
  }, [famille, isOpen]);

  const handleChange = (field: keyof FamilleCreationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (famille) {
      onUpdateFamille(formData);
    } else {
      onCreateFamille(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {famille ? `Modifier la famille ${famille.nom}` : 'Créer une nouvelle famille'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom de famille</Label>
              <Input 
                id="nom" 
                value={formData.nom} 
                onChange={(e) => handleChange('nom', e.target.value)} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gens">Gens</Label>
              <Input 
                id="gens" 
                value={formData.gens} 
                onChange={(e) => handleChange('gens', e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select 
              value={formData.statut} 
              onValueChange={(value) => handleChange('statut', value as StatutFamilial)}
            >
              <SelectTrigger id="statut">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Patricien">Patricien</SelectItem>
                <SelectItem value="Plébéien">Plébéien</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Prestige ({formData.prestige})</Label>
            <Slider 
              value={[formData.prestige]} 
              min={0} 
              max={100} 
              step={1} 
              onValueChange={(values) => handleChange('prestige', values[0])} 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Influence ({formData.influence})</Label>
            <Slider 
              value={[formData.influence]} 
              min={0} 
              max={100} 
              step={1} 
              onValueChange={(values) => handleChange('influence', values[0])} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="richesse">Richesse (as)</Label>
            <Input 
              id="richesse" 
              type="number" 
              value={formData.richesse} 
              onChange={(e) => handleChange('richesse', Number(e.target.value))} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={(e) => handleChange('description', e.target.value)} 
              rows={3} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="devise">Devise</Label>
            <Input 
              id="devise" 
              value={formData.devise} 
              onChange={(e) => handleChange('devise', e.target.value)} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="couleurPrimaire">Couleur primaire</Label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  id="couleurPrimaire" 
                  value={formData.couleurPrimaire} 
                  onChange={(e) => handleChange('couleurPrimaire', e.target.value)} 
                  className="w-10 h-10 rounded" 
                />
                <Input 
                  value={formData.couleurPrimaire} 
                  onChange={(e) => handleChange('couleurPrimaire', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="couleurSecondaire">Couleur secondaire</Label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  id="couleurSecondaire" 
                  value={formData.couleurSecondaire} 
                  onChange={(e) => handleChange('couleurSecondaire', e.target.value)} 
                  className="w-10 h-10 rounded" 
                />
                <Input 
                  value={formData.couleurSecondaire} 
                  onChange={(e) => handleChange('couleurSecondaire', e.target.value)} 
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit">{famille ? 'Mettre à jour' : 'Créer'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
