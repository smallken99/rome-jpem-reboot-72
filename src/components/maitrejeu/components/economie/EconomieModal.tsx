
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
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { EconomieRecord, EconomieCreationData } from '@/components/maitrejeu/types/economie';
import { ECONOMIE_CATEGORIES, SOURCE_TYPES } from '@/components/maitrejeu/types/economieConstants';

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
  const { senateurs, provinces, currentDate } = useMaitreJeu();
  
  const defaultFormData: EconomieCreationData = {
    source: '',
    category: '',
    amount: 0,
    description: '',
    date: currentDate,
    type: 'income',
    isRecurring: false,
    tags: []
  };
  
  const [formData, setFormData] = useState<EconomieCreationData>(defaultFormData);
  const [tab, setTab] = useState('general');
  const [tagInput, setTagInput] = useState('');
  
  useEffect(() => {
    if (editRecord) {
      setFormData({
        source: editRecord.source,
        category: editRecord.category,
        amount: editRecord.amount,
        description: editRecord.description,
        date: editRecord.date,
        affectedSenateurId: editRecord.affectedSenateurId,
        affectedProvinceId: editRecord.affectedProvinceId,
        type: editRecord.type,
        isRecurring: editRecord.isRecurring,
        recurringInterval: editRecord.recurringInterval,
        tags: editRecord.tags || []
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [editRecord, isOpen, currentDate]);
  
  const handleChange = (field: keyof EconomieCreationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editRecord ? 'Modifier la transaction' : 'Ajouter une transaction'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type de transaction</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange('type', value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Revenu</SelectItem>
                      <SelectItem value="expense">Dépense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (As)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min={0}
                    value={formData.amount}
                    onChange={(e) => handleChange('amount', Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => handleChange('source', value)}
                  >
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Sélectionner source" />
                    </SelectTrigger>
                    <SelectContent>
                      {SOURCE_TYPES.map(source => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Sélectionner catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {ECONOMIE_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Entité affectée</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senateurId">Sénateur</Label>
                    <Select
                      value={formData.affectedSenateurId || ''}
                      onValueChange={(value) => {
                        if (value) {
                          handleChange('affectedSenateurId', value);
                          handleChange('affectedProvinceId', undefined);
                        }
                      }}
                    >
                      <SelectTrigger id="senateurId">
                        <SelectValue placeholder="Aucun" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Aucun</SelectItem>
                        {senateurs.map(senateur => (
                          <SelectItem key={senateur.id} value={senateur.id}>
                            {senateur.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="provinceId">Province</Label>
                    <Select
                      value={formData.affectedProvinceId || ''}
                      onValueChange={(value) => {
                        if (value) {
                          handleChange('affectedProvinceId', value);
                          handleChange('affectedSenateurId', undefined);
                        }
                      }}
                    >
                      <SelectTrigger id="provinceId">
                        <SelectValue placeholder="Aucune" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Aucune</SelectItem>
                        {provinces.map(province => (
                          <SelectItem key={province.id} value={province.id}>
                            {province.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="recurring"
                  checked={formData.isRecurring}
                  onCheckedChange={(checked) => handleChange('isRecurring', checked)}
                />
                <Label htmlFor="recurring">Transaction récurrente</Label>
              </div>
              
              {formData.isRecurring && (
                <div className="space-y-2">
                  <Label htmlFor="interval">Intervalle</Label>
                  <Select
                    value={formData.recurringInterval || 'monthly'}
                    onValueChange={(value) => handleChange('recurringInterval', value)}
                  >
                    <SelectTrigger id="interval">
                      <SelectValue placeholder="Sélectionner intervalle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Quotidien</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuel</SelectItem>
                      <SelectItem value="seasonal">Saisonnier</SelectItem>
                      <SelectItem value="yearly">Annuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags?.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Ajouter un tag"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    Ajouter
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
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
