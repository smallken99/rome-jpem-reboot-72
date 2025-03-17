
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FamilleInfo, FamilleAlliance } from '../../../../types';
import { Badge } from '@/components/ui/badge';
import { useMaitreJeu } from '../../../../context';
import { X } from 'lucide-react';

interface AllianceCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAlliance: (data: any) => void;
  onUpdateAlliance: (data: any) => void;
  alliance: FamilleAlliance | null;
  familles: FamilleInfo[];
  currentFamilleId: string | null;
}

export const AllianceCreationDialog: React.FC<AllianceCreationDialogProps> = ({
  isOpen,
  onClose,
  onCreateAlliance,
  onUpdateAlliance,
  alliance,
  familles,
  currentFamilleId
}) => {
  const { getMembre } = useMaitreJeu();
  
  const [formData, setFormData] = useState<any>({
    famille1Id: currentFamilleId || '',
    famille2Id: '',
    type: 'politique',
    termes: '',
    benefices: [],
    statut: 'en négociation',
    membres: []
  });
  
  const [newBenefice, setNewBenefice] = useState('');
  const [selectedMembreId, setSelectedMembreId] = useState('');

  useEffect(() => {
    if (alliance) {
      setFormData({
        famille1Id: alliance.famille1Id,
        famille2Id: alliance.famille2Id,
        type: alliance.type,
        termes: alliance.termes,
        benefices: [...alliance.benefices],
        statut: alliance.statut,
        membres: [...alliance.membres]
      });
    } else {
      // Reset to default values
      setFormData({
        famille1Id: currentFamilleId || '',
        famille2Id: '',
        type: 'politique',
        termes: '',
        benefices: [],
        statut: 'en négociation',
        membres: []
      });
    }
  }, [alliance, currentFamilleId, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddBenefice = () => {
    if (newBenefice.trim()) {
      setFormData(prev => ({
        ...prev,
        benefices: [...prev.benefices, newBenefice.trim()]
      }));
      setNewBenefice('');
    }
  };

  const handleRemoveBenefice = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefices: prev.benefices.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleAddMembre = () => {
    if (selectedMembreId && !formData.membres.includes(selectedMembreId)) {
      setFormData(prev => ({
        ...prev,
        membres: [...prev.membres, selectedMembreId]
      }));
      setSelectedMembreId('');
    }
  };

  const handleRemoveMembre = (membreId: string) => {
    setFormData(prev => ({
      ...prev,
      membres: prev.membres.filter((id: string) => id !== membreId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (alliance) {
      onUpdateAlliance(formData);
    } else {
      onCreateAlliance(formData);
    }
  };

  // Get all members from both families
  const getFamilleMembers = () => {
    const famille1 = familles.find(f => f.id === formData.famille1Id);
    const famille2 = familles.find(f => f.id === formData.famille2Id);
    
    const membres = [];
    
    if (famille1) {
      membres.push(...famille1.membres.map(membreId => getMembre(membreId)).filter(Boolean));
    }
    
    if (famille2) {
      membres.push(...famille2.membres.map(membreId => getMembre(membreId)).filter(Boolean));
    }
    
    return membres;
  };

  const alliablesFamilles = familles.filter(f => f.id !== formData.famille1Id);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {alliance ? 'Modifier une alliance' : 'Créer une nouvelle alliance'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="famille1Id">Première famille</Label>
              <Select 
                value={formData.famille1Id} 
                onValueChange={(value) => handleChange('famille1Id', value)}
                disabled={!!currentFamilleId}
              >
                <SelectTrigger id="famille1Id">
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
              <Label htmlFor="famille2Id">Deuxième famille</Label>
              <Select 
                value={formData.famille2Id} 
                onValueChange={(value) => handleChange('famille2Id', value)}
              >
                <SelectTrigger id="famille2Id">
                  <SelectValue placeholder="Sélectionner une famille" />
                </SelectTrigger>
                <SelectContent>
                  {alliablesFamilles.map(famille => (
                    <SelectItem key={famille.id} value={famille.id}>
                      {famille.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Type d'alliance</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleChange('type', value)}
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
          
          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select 
              value={formData.statut} 
              onValueChange={(value) => handleChange('statut', value)}
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
              onChange={(e) => handleChange('termes', e.target.value)} 
              rows={3} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Bénéfices</Label>
            <div className="flex space-x-2">
              <input 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newBenefice} 
                onChange={(e) => setNewBenefice(e.target.value)} 
                placeholder="Ajouter un bénéfice"
              />
              <Button type="button" onClick={handleAddBenefice}>Ajouter</Button>
            </div>
            
            <ScrollArea className="h-20 border rounded-md p-2">
              <div className="flex flex-wrap gap-2">
                {formData.benefices.map((benefice: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {benefice}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveBenefice(index)}
                      className="text-xs rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {formData.benefices.length === 0 && (
                  <p className="text-sm text-muted-foreground">Aucun bénéfice ajouté</p>
                )}
              </div>
            </ScrollArea>
          </div>
          
          <div className="space-y-2">
            <Label>Membres impliqués</Label>
            <div className="flex space-x-2">
              <Select 
                value={selectedMembreId} 
                onValueChange={setSelectedMembreId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un membre" />
                </SelectTrigger>
                <SelectContent>
                  {getFamilleMembers().map((membre: any) => (
                    <SelectItem key={membre.id} value={membre.id}>
                      {membre.prenom} {membre.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleAddMembre}>Ajouter</Button>
            </div>
            
            <ScrollArea className="h-20 border rounded-md p-2">
              <div className="flex flex-wrap gap-2">
                {formData.membres.map((membreId: string) => {
                  const membre = getMembre(membreId);
                  if (!membre) return null;
                  
                  return (
                    <Badge key={membreId} variant="secondary" className="flex items-center gap-1">
                      {membre.prenom} {membre.nom}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveMembre(membreId)}
                        className="text-xs rounded-full hover:bg-muted p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
                {formData.membres.length === 0 && (
                  <p className="text-sm text-muted-foreground">Aucun membre impliqué</p>
                )}
              </div>
            </ScrollArea>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit">{alliance ? 'Mettre à jour' : 'Créer'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
