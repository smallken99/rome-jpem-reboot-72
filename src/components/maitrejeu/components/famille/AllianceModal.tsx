
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FamilleInfo, FamilleAlliance } from '../../types';

export interface AllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: FamilleAlliance;
  familles: FamilleInfo[];
  selectedFamilleId?: string;
  onSave: (data: any) => void;
}

export const AllianceModal: React.FC<AllianceModalProps> = ({
  isOpen,
  onClose,
  initialData,
  familles,
  selectedFamilleId,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    id: '',
    famille1Id: selectedFamilleId || '',
    famille2Id: '',
    type: 'politique' as 'politique' | 'matrimoniale' | 'commerciale' | 'militaire',
    dateDebut: new Date().toISOString().split('T')[0],
    dateFin: '',
    termes: '',
    benefices: [] as string[],
    statut: 'active' as 'active' | 'inactive' | 'en négociation' | 'rompue',
    membres: [] as string[],
  });

  const [benefice, setBenefice] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dateDebut: initialData.dateDebut || new Date().toISOString().split('T')[0],
      });
    } else if (selectedFamilleId) {
      setFormData((prev) => ({
        ...prev,
        famille1Id: selectedFamilleId,
      }));
    }
  }, [initialData, selectedFamilleId]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addBenefice = () => {
    if (benefice.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefices: [...prev.benefices, benefice.trim()],
      }));
      setBenefice('');
    }
  };

  const removeBenefice = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefices: prev.benefices.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Modifier une alliance' : 'Créer une alliance'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="famille1Id">Famille 1</Label>
            <Select
              value={formData.famille1Id}
              onValueChange={(value) => handleChange('famille1Id', value)}
              disabled={!!selectedFamilleId}
            >
              <SelectTrigger id="famille1Id">
                <SelectValue placeholder="Sélectionner une famille" />
              </SelectTrigger>
              <SelectContent>
                {familles.map((famille) => (
                  <SelectItem key={famille.id} value={famille.id}>
                    {famille.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="famille2Id">Famille 2</Label>
            <Select
              value={formData.famille2Id}
              onValueChange={(value) => handleChange('famille2Id', value)}
            >
              <SelectTrigger id="famille2Id">
                <SelectValue placeholder="Sélectionner une famille" />
              </SelectTrigger>
              <SelectContent>
                {familles
                  .filter((f) => f.id !== formData.famille1Id)
                  .map((famille) => (
                    <SelectItem key={famille.id} value={famille.id}>
                      {famille.nom}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type d'alliance</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                handleChange(
                  'type',
                  value as 'politique' | 'matrimoniale' | 'commerciale' | 'militaire'
                )
              }
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

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="dateDebut">Date de début</Label>
              <Input
                id="dateDebut"
                type="date"
                value={formData.dateDebut}
                onChange={(e) => handleChange('dateDebut', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="dateFin">Date de fin (optionnel)</Label>
              <Input
                id="dateFin"
                type="date"
                value={formData.dateFin}
                onChange={(e) => handleChange('dateFin', e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="statut">Statut</Label>
            <Select
              value={formData.statut}
              onValueChange={(value) =>
                handleChange(
                  'statut',
                  value as 'active' | 'inactive' | 'en négociation' | 'rompue'
                )
              }
            >
              <SelectTrigger id="statut">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="en négociation">En négociation</SelectItem>
                <SelectItem value="rompue">Rompue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="termes">Termes de l'alliance</Label>
            <Textarea
              id="termes"
              value={formData.termes}
              onChange={(e) => handleChange('termes', e.target.value)}
              placeholder="Détaillez les termes de l'alliance..."
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Bénéfices</Label>
            <div className="flex gap-2">
              <Input
                value={benefice}
                onChange={(e) => setBenefice(e.target.value)}
                placeholder="Ajouter un bénéfice..."
                className="flex-1"
              />
              <Button type="button" onClick={addBenefice} variant="secondary">
                Ajouter
              </Button>
            </div>
            <div className="mt-2">
              {formData.benefices.length > 0 ? (
                <ul className="space-y-1">
                  {formData.benefices.map((ben, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{ben}</span>
                      <Button
                        type="button"
                        onClick={() => removeBenefice(index)}
                        variant="ghost"
                        className="h-8 px-2"
                      >
                        ×
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun bénéfice ajouté.
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
