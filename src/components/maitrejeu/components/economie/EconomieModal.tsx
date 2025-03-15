
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { EconomieRecord, EconomieCreationData } from '../../types/economie';
import { useMaitreJeu } from '../../context';

interface EconomieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EconomieCreationData) => void;
  editRecord?: EconomieRecord;
}

export const EconomieModal: React.FC<EconomieModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editRecord
}) => {
  const { currentDate } = useMaitreJeu();
  
  const [formData, setFormData] = useState<EconomieCreationData>({
    amount: 0,
    category: 'general',
    description: '',
    type: 'income',
    date: currentDate,
    approved: true,
    isRecurring: false
  });
  
  // Initialiser le formulaire avec les données de l'enregistrement à éditer
  useEffect(() => {
    if (editRecord) {
      setFormData({
        amount: editRecord.amount,
        category: editRecord.category,
        description: editRecord.description,
        type: editRecord.type,
        date: editRecord.date,
        source: editRecord.source,
        approved: editRecord.approved,
        tags: editRecord.tags,
        impactFactors: editRecord.impactFactors,
        isRecurring: editRecord.isRecurring,
        recurringInterval: editRecord.recurringInterval
      });
    } else {
      // Réinitialiser le formulaire
      setFormData({
        amount: 0,
        category: 'general',
        description: '',
        type: 'income',
        date: currentDate,
        approved: true,
        isRecurring: false
      });
    }
  }, [editRecord, currentDate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ajuster le montant si c'est une dépense
    let adjustedData = { ...formData };
    if (formData.type === 'expense' && formData.amount > 0) {
      adjustedData.amount = -formData.amount;
    }
    
    onSave(adjustedData);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editRecord ? 'Modifier la transaction' : 'Nouvelle transaction'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de transaction</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Revenu</SelectItem>
                  <SelectItem value="expense">Dépense</SelectItem>
                  <SelectItem value="tax">Taxe</SelectItem>
                  <SelectItem value="transfer">Transfert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (As)</Label>
              <Input 
                id="amount" 
                name="amount" 
                type="number" 
                value={Math.abs(formData.amount)} 
                onChange={handleNumberChange} 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionner la catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">Général</SelectItem>
                <SelectItem value="military">Militaire</SelectItem>
                <SelectItem value="governance">Gouvernance</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="entertainment">Divertissement</SelectItem>
                <SelectItem value="religion">Religion</SelectItem>
                <SelectItem value="trade">Commerce</SelectItem>
                <SelectItem value="wages">Salaires</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isRecurring" 
              checked={formData.isRecurring} 
              onCheckedChange={(checked) => 
                handleCheckboxChange('isRecurring', checked as boolean)
              } 
            />
            <Label htmlFor="isRecurring">
              Transaction récurrente
            </Label>
          </div>
          
          {formData.isRecurring && (
            <div className="space-y-2">
              <Label htmlFor="recurringInterval">Intervalle de récurrence (en saisons)</Label>
              <Input 
                id="recurringInterval" 
                name="recurringInterval" 
                type="number" 
                min="1" 
                value={formData.recurringInterval || 1} 
                onChange={handleNumberChange} 
              />
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {editRecord ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
