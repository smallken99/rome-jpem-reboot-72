
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { EconomieCreationData, EconomieRecord, ECONOMIE_TYPES, ECONOMIE_CATEGORIES, ECONOMIE_SOURCE } from '../../types/economie';

export interface EconomieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EconomieCreationData) => void;
  record?: EconomieRecord;
}

export const EconomieModal: React.FC<EconomieModalProps> = ({ isOpen, onClose, onSave, record }) => {
  const [formData, setFormData] = useState<EconomieCreationData>({
    amount: 0,
    category: 'administration',
    description: '',
    type: 'income',
    source: 'treasury',
    tags: [],
    approved: true,
    date: new Date().toISOString(),
    recurring: false,
    recurringInterval: 'monthly'
  });
  
  // Initialize form data from record if editing
  useEffect(() => {
    if (record) {
      setFormData({
        amount: record.amount,
        category: record.category,
        description: record.description,
        type: record.type,
        source: record.source,
        tags: record.tags,
        approved: record.approved,
        date: record.date instanceof Date ? record.date.toISOString() : record.date,
        recurring: record.recurring,
        recurringInterval: 'monthly', // Default value
        affectedSenateurId: record.affectedSenateurId,
        affectedProvinceId: record.affectedProvinceId
      });
    }
  }, [record]);
  
  // Handle form submission
  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle recurring switch
  const handleRecurringChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      recurring: checked
    }));
  };
  
  // Handle recurring interval select
  const handleRecurringIntervalChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      recurringInterval: value
    }));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {record ? 'Modifier' : 'Ajouter'} une transaction
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Informations de base</TabsTrigger>
            <TabsTrigger value="advanced">Options avancées</TabsTrigger>
          </TabsList>
          
          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type de transaction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Revenus</SelectItem>
                    <SelectItem value="expense">Dépenses</SelectItem>
                    <SelectItem value="transfer">Transfert</SelectItem>
                    <SelectItem value="loan">Prêt</SelectItem>
                    <SelectItem value="investment">Investissement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="military">Militaire</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="religion">Religion</SelectItem>
                    <SelectItem value="trade">Commerce</SelectItem>
                    <SelectItem value="diplomacy">Diplomatie</SelectItem>
                    <SelectItem value="entertainment">Divertissement</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Montant</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                className={formData.type === 'expense' ? 'text-red-500' : 'text-green-500'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description de la transaction..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={typeof formData.date === 'string' ? formData.date.split('T')[0] : ''}
                onChange={handleInputChange}
              />
            </div>
          </TabsContent>
          
          {/* Advanced Options Tab */}
          <TabsContent value="advanced" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select
                value={formData.source}
                onValueChange={(value) => handleSelectChange('source', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="treasury">Trésorerie</SelectItem>
                  <SelectItem value="province">Province</SelectItem>
                  <SelectItem value="private">Privé</SelectItem>
                  <SelectItem value="foreign">Étranger</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="approved"
                checked={formData.approved}
                onCheckedChange={(checked) => handleCheckboxChange('approved', !!checked)}
              />
              <Label htmlFor="approved">Approuvé</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={formData.recurring}
                onCheckedChange={handleRecurringChange}
              />
              <Label htmlFor="recurring">Transaction récurrente</Label>
            </div>
            
            {formData.recurring && (
              <div className="space-y-2">
                <Label htmlFor="recurringInterval">Fréquence</Label>
                <Select
                  value={formData.recurringInterval}
                  onValueChange={handleRecurringIntervalChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                    <SelectItem value="quarterly">Trimestrielle</SelectItem>
                    <SelectItem value="biannually">Semestrielle</SelectItem>
                    <SelectItem value="annually">Annuelle</SelectItem>
                    <SelectItem value="special">Spéciale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Tags could be added here */}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>
            {record ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
