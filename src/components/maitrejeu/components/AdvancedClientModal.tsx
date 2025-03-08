
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ClientCreationData, Client } from '../types/clients';
import { Plus, Minus, X } from 'lucide-react';

interface AdvancedClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: ClientCreationData | Client) => void;
  client: Client | null;
}

export const AdvancedClientModal: React.FC<AdvancedClientModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  client 
}) => {
  const isEditMode = !!client;
  
  const [formData, setFormData] = useState<ClientCreationData>({
    name: '',
    type: 'artisan_commercant',
    subType: '',
    location: 'Forum',
    loyalty: 'moyenne',
    influences: {
      political: 1,
      popular: 1,
      religious: 1
    },
    competencePoints: 3,
    specialAbilities: [],
    backstory: '',
    activeStatus: 'active',
    relationshipLevel: 1
  });
  
  const [newAbility, setNewAbility] = useState('');
  
  useEffect(() => {
    // Initialiser le formulaire avec les données du client en mode édition
    if (client) {
      setFormData({
        name: client.name,
        type: client.type,
        subType: client.subType,
        location: client.location,
        loyalty: client.loyalty,
        influences: { ...client.influences },
        assignedToSenateurId: client.assignedToSenateurId,
        competencePoints: client.competencePoints || 3,
        specialAbilities: client.specialAbilities || [],
        backstory: client.backstory || '',
        activeStatus: client.activeStatus || 'active',
        relationshipLevel: client.relationshipLevel || 1,
        lastInteraction: client.lastInteraction
      });
    }
  }, [client]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleInfluenceChange = (type: keyof ClientCreationData['influences'], value: string) => {
    setFormData(prev => ({
      ...prev,
      influences: {
        ...prev.influences,
        [type]: parseInt(value) || 1
      }
    }));
  };
  
  const handleAddAbility = () => {
    if (newAbility.trim() && !formData.specialAbilities?.includes(newAbility.trim())) {
      setFormData(prev => ({
        ...prev,
        specialAbilities: [...(prev.specialAbilities || []), newAbility.trim()]
      }));
      setNewAbility('');
    }
  };
  
  const handleRemoveAbility = (ability: string) => {
    setFormData(prev => ({
      ...prev,
      specialAbilities: prev.specialAbilities?.filter(a => a !== ability) || []
    }));
  };
  
  const handleRelationshipChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      relationshipLevel: value[0]
    }));
  };
  
  const handleSubmit = () => {
    if (isEditMode && client) {
      onSave({
        ...client,
        ...formData
      });
    } else {
      onSave(formData);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Modifier le client' : 'Ajouter un nouveau client'}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="abilities">Compétences</TabsTrigger>
            <TabsTrigger value="backstory">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nom</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Nom complet"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <div className="col-span-3">
                <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artisan_commercant">Artisan & Commerçant</SelectItem>
                    <SelectItem value="politicien">Politicien</SelectItem>
                    <SelectItem value="religieux">Religieux</SelectItem>
                    <SelectItem value="proprietaire">Propriétaire Terrien</SelectItem>
                    <SelectItem value="pegre">Pègre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subType" className="text-right">Spécialité</Label>
              <Input
                id="subType"
                name="subType"
                value={formData.subType}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Ex: Forgeron, Boulanger..."
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Quartier</Label>
              <div className="col-span-3">
                <Select value={formData.location} onValueChange={(value) => handleSelectChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Quartier/Localisation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Forum">Forum</SelectItem>
                    <SelectItem value="Subure">Subure</SelectItem>
                    <SelectItem value="Palatin">Palatin</SelectItem>
                    <SelectItem value="Aventin">Aventin</SelectItem>
                    <SelectItem value="Esquilin">Esquilin</SelectItem>
                    <SelectItem value="Capitole">Capitole</SelectItem>
                    <SelectItem value="Quirinal">Quirinal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loyalty" className="text-right">Loyauté</Label>
              <div className="col-span-3">
                <Select value={formData.loyalty} onValueChange={(value) => handleSelectChange('loyalty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau de loyauté" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faible">Faible</SelectItem>
                    <SelectItem value="moyenne">Moyenne</SelectItem>
                    <SelectItem value="forte">Forte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activeStatus" className="text-right">Statut</Label>
              <div className="col-span-3">
                <Select 
                  value={formData.activeStatus || 'active'} 
                  onValueChange={(value: 'active' | 'inactive' | 'probation') => handleSelectChange('activeStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Statut actuel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="probation">Probation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Influences</Label>
              <div className="col-span-3 grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="political" className="text-xs">Politique</Label>
                  <Input
                    id="political"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.influences.political}
                    onChange={(e) => handleInfluenceChange('political', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="popular" className="text-xs">Populaire</Label>
                  <Input
                    id="popular"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.influences.popular}
                    onChange={(e) => handleInfluenceChange('popular', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="religious" className="text-xs">Religieuse</Label>
                  <Input
                    id="religious"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.influences.religious}
                    onChange={(e) => handleInfluenceChange('religious', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationshipLevel" className="text-right">Niveau de relation</Label>
              <div className="col-span-3">
                <Slider 
                  defaultValue={[formData.relationshipLevel || 1]} 
                  max={10} 
                  min={1}
                  step={1}
                  onValueChange={handleRelationshipChange}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Faible</span>
                  <span>Moyenne</span>
                  <span>Forte</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="abilities" className="space-y-4 mt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="competencePoints" className="text-right">Points de compétence</Label>
              <Input
                id="competencePoints"
                name="competencePoints"
                type="number"
                min="0"
                value={formData.competencePoints || 0}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Capacités spéciales</Label>
              <div className="col-span-3 space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newAbility}
                    onChange={(e) => setNewAbility(e.target.value)}
                    placeholder="Nouvelle capacité..."
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={handleAddAbility}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.specialAbilities?.map((ability) => (
                    <Badge key={ability} variant="secondary" className="flex items-center gap-1">
                      {ability}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveAbility(ability)}
                        className="ml-1 rounded-full hover:bg-muted p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {!formData.specialAbilities?.length && (
                    <p className="text-sm text-muted-foreground">Aucune capacité spéciale ajoutée</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="backstory" className="space-y-4 mt-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="backstory" className="text-right pt-2">Histoire personnelle</Label>
              <Textarea
                id="backstory"
                name="backstory"
                value={formData.backstory || ''}
                onChange={handleChange}
                className="col-span-3"
                rows={8}
                placeholder="Écrivez l'histoire du client ici..."
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastInteraction" className="text-right">Dernière interaction</Label>
              <Input
                id="lastInteraction"
                name="lastInteraction"
                type="date"
                value={formData.lastInteraction ? new Date(formData.lastInteraction).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>{isEditMode ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
