
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AddAllianceModalProps, Nation, Alliance } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { CheckIcon, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export const AddAllianceModal: React.FC<AddAllianceModalProps> = ({
  isOpen,
  onClose,
  nations,
  onSave
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'military' | 'economic' | 'cultural' | 'political' | 'defensive' | 'trade'>('military');
  const [selectedNations, setSelectedNations] = useState<string[]>(['rome']);
  const [status, setStatus] = useState<'active' | 'pending' | 'expired' | 'broken' | 'inactive'>('active');
  const [description, setDescription] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [dateEnds, setDateEnds] = useState('');
  const [terms, setTerms] = useState<string[]>([]);
  const [newTerm, setNewTerm] = useState('');
  const [benefits, setBenefits] = useState('');
  const [requirements, setRequirements] = useState('');
  const [duration, setDuration] = useState(10);
  
  const typeOptions = [
    { id: 'military', name: 'Militaire' },
    { id: 'economic', name: 'Économique' },
    { id: 'cultural', name: 'Culturelle' },
    { id: 'political', name: 'Politique' },
    { id: 'defensive', name: 'Défensive' },
    { id: 'trade', name: 'Commerciale' }
  ];
  
  const statusOptions = [
    { id: 'active', name: 'Active' },
    { id: 'pending', name: 'En attente' },
    { id: 'expired', name: 'Expirée' },
    { id: 'broken', name: 'Rompue' },
    { id: 'inactive', name: 'Inactive' }
  ];
  
  const handleAddTerm = () => {
    if (newTerm.trim()) {
      setTerms([...terms, newTerm.trim()]);
      setNewTerm('');
    }
  };
  
  const handleRemoveTerm = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAlliance: Alliance = {
      id: uuidv4(),
      name,
      type,
      parties: selectedNations,
      status,
      description,
      dateCreated,
      dateEnds,
      terms,
      benefits,
      requirements,
      duration,
      members: selectedNations,
      dateCreation: dateCreated
    };
    
    onSave(newAlliance);
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setName('');
    setType('military');
    setSelectedNations(['rome']);
    setStatus('active');
    setDescription('');
    setDateCreated('');
    setDateEnds('');
    setTerms([]);
    setNewTerm('');
    setBenefits('');
    setRequirements('');
    setDuration(10);
  };
  
  // Ajouter les nations disponibles (incluant Rome)
  const availableNations = [
    { id: 'rome', name: 'Rome', region: 'italia' },
    ...nations
  ];
  
  const isNationSelected = (nationId: string) => {
    return selectedNations.includes(nationId);
  };
  
  const toggleNation = (nationId: string) => {
    if (nationId === 'rome') return; // Rome doit toujours être inclus
    
    if (isNationSelected(nationId)) {
      setSelectedNations(selectedNations.filter(id => id !== nationId));
    } else {
      setSelectedNations([...selectedNations, nationId]);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle alliance</DialogTitle>
          <DialogDescription>
            Créez une nouvelle alliance entre Rome et d'autres nations
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'alliance</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type d'alliance</Label>
              <Select value={type} onValueChange={(value) => setType(value as any)} required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Nations membres</Label>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {selectedNations.map(nationId => {
                const nation = availableNations.find(n => n.id === nationId);
                return (
                  <Badge key={nationId} variant="secondary" className="py-1">
                    {nation?.name || nationId}
                    {nationId !== 'rome' && (
                      <button 
                        type="button" 
                        onClick={() => toggleNation(nationId)}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                );
              })}
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" type="button" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une nation
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Command>
                  <CommandInput placeholder="Rechercher une nation..." />
                  <CommandEmpty>Aucune nation trouvée</CommandEmpty>
                  <CommandGroup>
                    {availableNations
                      .filter(nation => nation.id !== 'rome')
                      .map(nation => (
                        <CommandItem
                          key={nation.id}
                          value={nation.id}
                          onSelect={() => toggleNation(nation.id)}
                        >
                          <div className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isNationSelected(nation.id) ? "bg-primary text-primary-foreground" : "opacity-50"
                          )}>
                            {isNationSelected(nation.id) && (
                              <CheckIcon className="h-3 w-3" />
                            )}
                          </div>
                          {nation.name}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateCreated">Date de création</Label>
              <Input
                type="date"
                id="dateCreated"
                value={dateCreated}
                onChange={(e) => setDateCreated(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateEnds">Date de fin</Label>
              <Input
                type="date"
                id="dateEnds"
                value={dateEnds}
                onChange={(e) => setDateEnds(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as any)} required>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (années)</Label>
              <Input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min={1}
                max={100}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Termes de l'alliance</Label>
            <div className="flex space-x-2">
              <Input
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                placeholder="Ajouter un terme..."
              />
              <Button type="button" onClick={handleAddTerm}>
                Ajouter
              </Button>
            </div>
            
            {terms.length > 0 && (
              <div className="mt-2 space-y-2">
                {terms.map((term, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span className="text-sm">{term}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTerm(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="benefits">Bénéfices de l'alliance</Label>
            <Textarea
              id="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requirements">Exigences et obligations</Label>
            <Textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Créer l'alliance</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
