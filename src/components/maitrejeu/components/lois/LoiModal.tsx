
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useMaitreJeu } from '../../context';
import { Loi } from '../../types/lois';
import { v4 as uuidv4 } from 'uuid';
import { Season, ImportanceType } from '../../types/common';

interface LoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loi: Loi) => void;
  editLoi?: Loi | null;
}

export const LoiModal: React.FC<LoiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editLoi
}) => {
  const { currentDate } = useMaitreJeu();
  
  const [formData, setFormData] = useState<Omit<Loi, 'id'>>({
    titre: '',
    description: '',
    proposeur: '',
    catégorie: 'Agraire',
    date: currentDate,
    état: 'En délibération',
    importance: 'mineure',
    votesPositifs: 0,
    votesNégatifs: 0,
    votesAbstention: 0,
    effets: {}
  });
  
  useEffect(() => {
    if (editLoi) {
      // Pré-remplir le formulaire avec les données de la loi à éditer
      const { id, ...loiData } = editLoi;
      setFormData(loiData);
    }
  }, [editLoi]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEffetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      effets: {
        ...prev.effets,
        [name]: parseInt(value) || 0
      }
    }));
  };
  
  const handleSubmit = () => {
    const loi: Loi = {
      id: editLoi?.id || uuidv4(),
      ...formData
    };
    onSave(loi);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editLoi ? 'Modifier une loi' : 'Créer une nouvelle loi'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre</Label>
            <Input
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleInputChange}
              placeholder="Ex: Lex Agraria de Tiberius Gracchus"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description détaillée de la loi et de ses effets"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proposeur">Proposeur</Label>
              <Input
                id="proposeur"
                name="proposeur"
                value={formData.proposeur}
                onChange={handleInputChange}
                placeholder="Nom du sénateur proposant la loi"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="catégorie">Catégorie</Label>
              <Select
                value={formData.catégorie}
                onValueChange={(value) => handleSelectChange('catégorie', value)}
              >
                <SelectTrigger id="catégorie">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agraire">Agraire</SelectItem>
                  <SelectItem value="Électorale">Électorale</SelectItem>
                  <SelectItem value="Administrative">Administrative</SelectItem>
                  <SelectItem value="Judiciaire">Judiciaire</SelectItem>
                  <SelectItem value="Militaire">Militaire</SelectItem>
                  <SelectItem value="Fiscale">Fiscale</SelectItem>
                  <SelectItem value="Religieuse">Religieuse</SelectItem>
                  <SelectItem value="Sociale">Sociale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="état">État</Label>
              <Select
                value={formData.état}
                onValueChange={(value) => handleSelectChange('état', value)}
              >
                <SelectTrigger id="état">
                  <SelectValue placeholder="Sélectionner un état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En délibération">En délibération</SelectItem>
                  <SelectItem value="Promulguée">Promulguée</SelectItem>
                  <SelectItem value="Rejetée">Rejetée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Importance</Label>
              <RadioGroup
                value={formData.importance}
                onValueChange={(value) => handleSelectChange('importance', value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mineure" id="mineure" />
                  <Label htmlFor="mineure">Mineure</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normale" id="normale" />
                  <Label htmlFor="normale">Normale</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="majeure" id="majeure" />
                  <Label htmlFor="majeure">Majeure</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="votesPositifs">Votes pour</Label>
              <Input
                id="votesPositifs"
                name="votesPositifs"
                type="number"
                value={formData.votesPositifs}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="votesNégatifs">Votes contre</Label>
              <Input
                id="votesNégatifs"
                name="votesNégatifs"
                type="number"
                value={formData.votesNégatifs}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="votesAbstention">Abstentions</Label>
              <Input
                id="votesAbstention"
                name="votesAbstention"
                type="number"
                value={formData.votesAbstention}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Effets de la loi</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stabilité">Stabilité</Label>
                <Input
                  id="stabilité"
                  name="stabilité"
                  type="number"
                  value={formData.effets.stabilité || 0}
                  onChange={handleEffetChange}
                  placeholder="-10 à +10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="popularité">Popularité</Label>
                <Input
                  id="popularité"
                  name="popularité"
                  type="number"
                  value={formData.effets.popularité || 0}
                  onChange={handleEffetChange}
                  placeholder="-10 à +10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="corruption">Corruption</Label>
                <Input
                  id="corruption"
                  name="corruption"
                  type="number"
                  value={formData.effets.corruption || 0}
                  onChange={handleEffetChange}
                  placeholder="-10 à +10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="efficacité">Efficacité</Label>
                <Input
                  id="efficacité"
                  name="efficacité"
                  type="number"
                  value={formData.effets.efficacité || 0}
                  onChange={handleEffetChange}
                  placeholder="-10 à +10"
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {editLoi ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
