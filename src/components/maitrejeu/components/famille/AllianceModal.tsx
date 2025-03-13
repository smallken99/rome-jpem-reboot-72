
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FamilleAlliance, FamilleInfo } from '../../types/familles';

export interface AllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFamilleId: string;
  familles: FamilleInfo[];
  onSave: (data: any) => void;
  alliance?: FamilleAlliance;
}

export const AllianceModal: React.FC<AllianceModalProps> = ({
  isOpen,
  onClose,
  selectedFamilleId,
  familles,
  onSave,
  alliance
}) => {
  const [formData, setFormData] = useState<FamilleAlliance>({
    id: '',
    famille1Id: selectedFamilleId,
    famille2Id: '',
    type: 'politique',
    dateDebut: new Date().toISOString().split('T')[0],
    dateFin: '',
    termes: '',
    benefices: [],
    statut: 'en négociation',
    membres: []
  });

  const [beneficeInput, setBeneficeInput] = useState('');

  useEffect(() => {
    if (alliance) {
      setFormData({
        ...alliance,
        famille1Id: selectedFamilleId || alliance.famille1Id
      });
    } else {
      setFormData(prev => ({
        ...prev,
        famille1Id: selectedFamilleId
      }));
    }
  }, [alliance, selectedFamilleId]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddBenefice = () => {
    if (beneficeInput.trim()) {
      setFormData(prev => ({
        ...prev,
        benefices: [...prev.benefices, beneficeInput.trim()]
      }));
      setBeneficeInput('');
    }
  };

  const handleRemoveBenefice = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefices: prev.benefices.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  // Filter out the selected famille from dropdown options
  const famillesOptions = familles.filter(f => f.id !== selectedFamilleId);

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{alliance ? 'Modifier une alliance' : 'Créer une alliance'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="famille1">Famille 1</Label>
            <Select
              value={formData.famille1Id}
              onValueChange={value => handleChange('famille1Id', value)}
              disabled={true}
            >
              <SelectTrigger id="famille1">
                <SelectValue placeholder="Sélectionner une famille" />
              </SelectTrigger>
              <SelectContent>
                {familles.map(famille => (
                  <SelectItem key={famille.id} value={famille.id}>
                    {famille.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="famille2">Famille 2</Label>
            <Select
              value={formData.famille2Id}
              onValueChange={value => handleChange('famille2Id', value)}
            >
              <SelectTrigger id="famille2">
                <SelectValue placeholder="Sélectionner une famille" />
              </SelectTrigger>
              <SelectContent>
                {famillesOptions.map(famille => (
                  <SelectItem key={famille.id} value={famille.id}>
                    {famille.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type d'alliance</Label>
            <Select
              value={formData.type}
              onValueChange={value => handleChange('type', value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="politique">Politique</SelectItem>
                <SelectItem value="matrimoniale">Matrimoniale</SelectItem>
                <SelectItem value="commerciale">Commerciale</SelectItem>
                <SelectItem value="militaire">Militaire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="dateDebut">Date de début</Label>
              <Input
                id="dateDebut"
                type="date"
                value={formData.dateDebut.split('T')[0]}
                onChange={e => handleChange('dateDebut', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFin">Date de fin (optionnel)</Label>
              <Input
                id="dateFin"
                type="date"
                value={formData.dateFin?.split('T')[0] || ''}
                onChange={e => handleChange('dateFin', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select
              value={formData.statut}
              onValueChange={value => handleChange('statut', value)}
            >
              <SelectTrigger id="statut">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en négociation">En négociation</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="rompue">Rompue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="termes">Termes de l'alliance</Label>
            <Textarea
              id="termes"
              value={formData.termes}
              onChange={e => handleChange('termes', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Bénéfices</Label>
            <div className="flex space-x-2">
              <Input
                value={beneficeInput}
                onChange={e => setBeneficeInput(e.target.value)}
                placeholder="Ajouter un bénéfice"
              />
              <Button type="button" onClick={handleAddBenefice} variant="secondary">
                Ajouter
              </Button>
            </div>
            <div className="space-y-1 mt-2">
              {formData.benefices.map((benefice, index) => (
                <div key={index} className="flex justify-between items-center bg-secondary/20 p-2 rounded">
                  <span>{benefice}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleRemoveBenefice(index)}
                    className="h-8 w-8 p-0"
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            {alliance ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
