
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AddTraiteModalProps, Nation, Traite } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { CheckIcon, Plus, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const AddTraiteModal: React.FC<AddTraiteModalProps> = ({
  isOpen,
  onClose,
  nations,
  onSave
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'commercial' | 'peace' | 'military' | 'territorial'>('commercial');
  const [selectedNations, setSelectedNations] = useState<string[]>(['rome']);
  const [status, setStatus] = useState<'active' | 'draft' | 'expired' | 'revoked'>('active');
  const [description, setDescription] = useState('');
  const [dateSignature, setDateSignature] = useState('');
  const [dateExpiration, setDateExpiration] = useState('');
  const [clauses, setClauses] = useState<string[]>([]);
  const [newClause, setNewClause] = useState('');
  const [benefits, setBenefits] = useState('');
  const [obligations, setObligations] = useState('');
  
  const typeOptions = [
    { id: 'commercial', name: 'Commercial' },
    { id: 'peace', name: 'Paix' },
    { id: 'military', name: 'Militaire' },
    { id: 'territorial', name: 'Territorial' }
  ];
  
  const statusOptions = [
    { id: 'active', name: 'Actif' },
    { id: 'draft', name: 'Brouillon' },
    { id: 'expired', name: 'Expiré' },
    { id: 'revoked', name: 'Révoqué' }
  ];
  
  const handleAddClause = () => {
    if (newClause.trim()) {
      setClauses([...clauses, newClause.trim()]);
      setNewClause('');
    }
  };
  
  const handleRemoveClause = (index: number) => {
    setClauses(clauses.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTraite: Traite = {
      id: uuidv4(),
      name,
      type,
      parties: selectedNations,
      status,
      description,
      dateSignature,
      dateExpiration,
      clauses,
      benefits,
      obligations,
      dateCreation: new Date().toISOString()
    };
    
    onSave(newTraite);
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setName('');
    setType('commercial');
    setSelectedNations(['rome']);
    setStatus('active');
    setDescription('');
    setDateSignature('');
    setDateExpiration('');
    setClauses([]);
    setNewClause('');
    setBenefits('');
    setObligations('');
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
          <DialogTitle>Ajouter un nouveau traité</DialogTitle>
          <DialogDescription>
            Créez un nouveau traité diplomatique entre Rome et d'autres nations
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du traité</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type de traité</Label>
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
            <Label>Parties concernées</Label>
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
                      .filter(nation => nation.id !== 'rome') // Exclure Rome car déjà ajoutée
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
              <Label htmlFor="dateSignature">Date de signature</Label>
              <Input
                type="date"
                id="dateSignature"
                value={dateSignature}
                onChange={(e) => setDateSignature(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateExpiration">Date d'expiration</Label>
              <Input
                type="date"
                id="dateExpiration"
                value={dateExpiration}
                onChange={(e) => setDateExpiration(e.target.value)}
              />
            </div>
          </div>
          
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Clauses du traité</Label>
            <div className="flex space-x-2">
              <Input
                value={newClause}
                onChange={(e) => setNewClause(e.target.value)}
                placeholder="Ajouter une clause..."
              />
              <Button type="button" onClick={handleAddClause}>
                Ajouter
              </Button>
            </div>
            
            {clauses.length > 0 && (
              <div className="mt-2 space-y-2">
                {clauses.map((clause, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span className="text-sm">{clause}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveClause(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="benefits">Bénéfices pour Rome</Label>
            <Textarea
              id="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="obligations">Obligations de Rome</Label>
            <Textarea
              id="obligations"
              value={obligations}
              onChange={(e) => setObligations(e.target.value)}
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Créer le traité</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
