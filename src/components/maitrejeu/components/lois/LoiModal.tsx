
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loi, CategorieLoi } from '../../types/lois';
import { LoiModalProps } from '../lois/types';
import { dateToGameDate } from '@/utils/formatUtils';

const LOI_CATEGORIES = [
  { id: 'politique', name: 'Politique', description: 'Lois concernant la structure politique' },
  { id: 'judiciaire', name: 'Judiciaire', description: 'Lois concernant le système judiciaire' },
  { id: 'sociale', name: 'Sociale', description: 'Lois concernant les affaires sociales' },
  { id: 'militaire', name: 'Militaire', description: 'Lois concernant les affaires militaires' },
  { id: 'economique', name: 'Économique', description: 'Lois concernant l\'économie' },
  { id: 'religieuse', name: 'Religieuse', description: 'Lois concernant les affaires religieuses' },
];

export const LoiModal: React.FC<LoiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  loi,
  categories = LOI_CATEGORIES,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('info');
  
  const initialState: Loi = loi || {
    id: '',
    title: '',
    description: '',
    proposedBy: '',
    date: dateToGameDate(new Date()),
    status: 'proposed',
    category: '',
    votesFor: 0,
    votesAgainst: 0,
    effets: [],
    conditions: [],
    penalites: []
  };
  
  const [formData, setFormData] = useState<Loi>(initialState);
  const [effetInput, setEffetInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');
  const [penaliteInput, setPenaliteInput] = useState('');
  
  useEffect(() => {
    if (loi) {
      setFormData(loi);
    } else {
      setFormData(initialState);
    }
  }, [loi, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre de la loi est requis",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.category) {
      toast({
        title: "Erreur",
        description: "La catégorie de la loi est requise",
        variant: "destructive",
      });
      return;
    }
    
    // Generate ID if it's a new law
    const newLoi = formData.id ? formData : { ...formData, id: `loi-${Date.now()}` };
    
    onSave(newLoi);
    onClose();
    
    toast({
      title: loi ? "Loi mise à jour" : "Loi créée",
      description: `La loi "${formData.title}" a été ${loi ? 'mise à jour' : 'créée'} avec succès.`,
    });
  };
  
  const addEffet = () => {
    if (effetInput.trim()) {
      setFormData(prev => ({
        ...prev,
        effets: [...(prev.effets || []), effetInput.trim()]
      }));
      setEffetInput('');
    }
  };
  
  const removeEffet = (index: number) => {
    setFormData(prev => ({
      ...prev,
      effets: (prev.effets || []).filter((_, i) => i !== index)
    }));
  };
  
  const addCondition = () => {
    if (conditionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        conditions: [...(prev.conditions || []), conditionInput.trim()]
      }));
      setConditionInput('');
    }
  };
  
  const removeCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: (prev.conditions || []).filter((_, i) => i !== index)
    }));
  };
  
  const addPenalite = () => {
    if (penaliteInput.trim()) {
      setFormData(prev => ({
        ...prev,
        penalites: [...(prev.penalites || []), penaliteInput.trim()]
      }));
      setPenaliteInput('');
    }
  };
  
  const removePenalite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      penalites: (prev.penalites || []).filter((_, i) => i !== index)
    }));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{loi ? 'Modifier une loi' : 'Créer une nouvelle loi'}</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="effets">Effets</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="penalites">Pénalités</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la loi</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Lex Julia de..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez le contenu et le but de cette loi..."
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="proposedBy">Proposée par</Label>
                  <Input
                    id="proposedBy"
                    name="proposedBy"
                    value={formData.proposedBy}
                    onChange={handleChange}
                    placeholder="Nom du sénateur"
                  />
                </div>
              </div>
              
              {loi && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange('status', value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proposed">Proposée</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="rejected">Rejetée</SelectItem>
                        <SelectItem value="expired">Expirée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input
                      id="notes"
                      name="notes"
                      value={formData.notes || ''}
                      onChange={handleChange}
                      placeholder="Notes additionnelles"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="effets" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="effet">Ajouter un effet</Label>
                  <Input
                    id="effet"
                    value={effetInput}
                    onChange={(e) => setEffetInput(e.target.value)}
                    placeholder="Décrivez un effet de cette loi..."
                  />
                </div>
                <Button type="button" onClick={addEffet}>Ajouter</Button>
              </div>
              
              <div className="space-y-2">
                <Label>Effets de la loi</Label>
                <div className="border rounded-md p-4 space-y-2">
                  {formData.effets && formData.effets.length > 0 ? (
                    formData.effets.map((effet, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                        <span>{effet}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEffet(index)}
                          className="h-7 text-destructive"
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      Aucun effet défini pour cette loi
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="conditions" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="condition">Ajouter une condition</Label>
                  <Input
                    id="condition"
                    value={conditionInput}
                    onChange={(e) => setConditionInput(e.target.value)}
                    placeholder="Décrivez une condition d'application..."
                  />
                </div>
                <Button type="button" onClick={addCondition}>Ajouter</Button>
              </div>
              
              <div className="space-y-2">
                <Label>Conditions d'application</Label>
                <div className="border rounded-md p-4 space-y-2">
                  {formData.conditions && formData.conditions.length > 0 ? (
                    formData.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                        <span>{condition}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCondition(index)}
                          className="h-7 text-destructive"
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      Aucune condition définie pour cette loi
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="penalites" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="penalite">Ajouter une pénalité</Label>
                  <Input
                    id="penalite"
                    value={penaliteInput}
                    onChange={(e) => setPenaliteInput(e.target.value)}
                    placeholder="Décrivez une pénalité en cas de non-respect..."
                  />
                </div>
                <Button type="button" onClick={addPenalite}>Ajouter</Button>
              </div>
              
              <div className="space-y-2">
                <Label>Pénalités en cas de non-respect</Label>
                <div className="border rounded-md p-4 space-y-2">
                  {formData.penalites && formData.penalites.length > 0 ? (
                    formData.penalites.map((penalite, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                        <span>{penalite}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePenalite(index)}
                          className="h-7 text-destructive"
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      Aucune pénalité définie pour cette loi
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>{loi ? 'Mettre à jour' : 'Créer'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
