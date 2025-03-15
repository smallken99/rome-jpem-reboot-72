
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { EconomieModalProps, EconomieCreationData, EconomieType, EconomieCategory, EconomieSource } from '../../types/economie';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMaitreJeu } from '../../context';

export const EconomieModal: React.FC<EconomieModalProps> = ({
  isOpen,
  onClose,
  onSave,
  record
}) => {
  const { senateurs, provinces } = useMaitreJeu();
  const [formData, setFormData] = useState<EconomieCreationData>({
    amount: 0,
    category: 'other',
    description: '',
    type: 'income',
    source: 'manual_entry',
    tags: [],
    approved: true,
  });

  useEffect(() => {
    if (record) {
      setFormData({
        amount: record.amount,
        category: record.category,
        description: record.description,
        date: record.date,
        type: record.type,
        source: record.source,
        affectedSenateurId: record.affectedSenateurId,
        affectedProvinceId: record.affectedProvinceId,
        approved: record.approved,
        tags: record.tags,
        impactFactors: record.impactFactors,
        isRecurring: record.isRecurring,
        recurringInterval: record.recurringInterval,
      });
    } else {
      setFormData({
        amount: 0,
        category: 'other',
        description: '',
        type: 'income',
        source: 'manual_entry',
        tags: [],
        approved: true,
      });
    }
  }, [record]);

  const handleChange = (field: keyof EconomieCreationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleTypeChange = (type: EconomieType) => {
    handleChange('type', type);
    // Si c'est une dépense, on s'assure que le montant est négatif
    if (type === 'expense' && formData.amount > 0) {
      handleChange('amount', -Math.abs(formData.amount));
    } 
    // Si c'est un revenu, on s'assure que le montant est positif
    else if (type === 'income' && formData.amount < 0) {
      handleChange('amount', Math.abs(formData.amount));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {record ? 'Modifier la transaction' : 'Nouvelle transaction'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleTypeChange(value as EconomieType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Revenu</SelectItem>
                  <SelectItem value="expense">Dépense</SelectItem>
                  <SelectItem value="tax">Impôt</SelectItem>
                  <SelectItem value="trade">Commerce</SelectItem>
                  <SelectItem value="military">Militaire</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="slaves">Esclaves</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Montant</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange('category', value as EconomieCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="military">Militaire</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="religion">Religion</SelectItem>
                  <SelectItem value="slaves">Esclaves</SelectItem>
                  <SelectItem value="entertainment">Divertissement</SelectItem>
                  <SelectItem value="tax">Impôts</SelectItem>
                  <SelectItem value="trade">Commerce</SelectItem>
                  <SelectItem value="diplomacy">Diplomatie</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select 
                value={formData.source} 
                onValueChange={(value) => handleChange('source', value as EconomieSource)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tax">Impôt</SelectItem>
                  <SelectItem value="trade">Commerce</SelectItem>
                  <SelectItem value="war">Guerre</SelectItem>
                  <SelectItem value="donation">Donation</SelectItem>
                  <SelectItem value="fine">Amende</SelectItem>
                  <SelectItem value="sale">Vente</SelectItem>
                  <SelectItem value="purchase">Achat</SelectItem>
                  <SelectItem value="salary">Salaire</SelectItem>
                  <SelectItem value="rent">Loyer</SelectItem>
                  <SelectItem value="manual_entry">Saisie manuelle</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="affectedSenateur">Sénateur concerné</Label>
              <Select 
                value={formData.affectedSenateurId || ""} 
                onValueChange={(value) => handleChange('affectedSenateurId', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un sénateur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucun</SelectItem>
                  {senateurs.map((senateur) => (
                    <SelectItem key={senateur.id} value={senateur.id}>
                      {senateur.nom} {senateur.prenom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="affectedProvince">Province concernée</Label>
              <Select 
                value={formData.affectedProvinceId || ""} 
                onValueChange={(value) => handleChange('affectedProvinceId', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucune</SelectItem>
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox 
              id="approved" 
              checked={formData.approved} 
              onCheckedChange={(checked) => handleChange('approved', !!checked)}
            />
            <Label htmlFor="approved">Approuvé</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox 
              id="isRecurring" 
              checked={formData.isRecurring} 
              onCheckedChange={(checked) => handleChange('isRecurring', !!checked)}
            />
            <Label htmlFor="isRecurring">Transaction récurrente</Label>
          </div>

          {formData.isRecurring && (
            <div className="space-y-2">
              <Label htmlFor="recurringInterval">Interval (en saisons)</Label>
              <Input
                id="recurringInterval"
                type="number"
                min={1}
                value={formData.recurringInterval || 1}
                onChange={(e) => handleChange('recurringInterval', Number(e.target.value))}
              />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
