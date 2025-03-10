
import React, { useState, useEffect } from 'react';
import { useMaitreJeu } from '../../context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FamilleInfo, FamilleAlliance, MembreFamille } from '../../types';

interface AllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  familles: FamilleInfo[];
  membres: MembreFamille[];
  initialFamilleId?: string | null;
  editAlliance?: FamilleAlliance | null;
}

export const AllianceModal: React.FC<AllianceModalProps> = ({
  isOpen,
  onClose,
  familles,
  membres,
  initialFamilleId,
  editAlliance
}) => {
  const { createAlliance, updateAlliance, getFamille } = useMaitreJeu();
  const [formData, setFormData] = useState<{
    famille1Id: string;
    famille2Id: string;
    type: 'matrimoniale' | 'politique' | 'commerciale' | 'militaire';
    dateDebut: string;
    dateFin?: string;
    termes: string;
    benefices: string[];
    statut: 'active' | 'inactive' | 'en négociation' | 'rompue';
    membresIds: string[];
  }>({
    famille1Id: initialFamilleId || '',
    famille2Id: '',
    type: 'politique',
    dateDebut: new Date().toISOString().split('T')[0],
    dateFin: '',
    termes: '',
    benefices: [''],
    statut: 'active',
    membresIds: []
  });
  
  // Récupérer la date actuelle sous format YYYY-MM-DD
  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };
  
  // Quand on ouvre la modale en mode édition
  useEffect(() => {
    if (editAlliance) {
      setFormData({
        famille1Id: editAlliance.famille1Id,
        famille2Id: editAlliance.famille2Id,
        type: editAlliance.type,
        dateDebut: editAlliance.dateDebut,
        dateFin: editAlliance.dateFin,
        termes: editAlliance.termes,
        benefices: editAlliance.benefices,
        statut: editAlliance.statut,
        membresIds: editAlliance.membres
      });
    } else {
      // Reset du formulaire en mode création
      setFormData({
        famille1Id: initialFamilleId || '',
        famille2Id: '',
        type: 'politique',
        dateDebut: getCurrentDate(),
        dateFin: '',
        termes: '',
        benefices: [''],
        statut: 'active',
        membresIds: []
      });
    }
  }, [isOpen, editAlliance, initialFamilleId]);
  
  const handleInputChange = (key: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleBeneficeChange = (index: number, value: string) => {
    const newBenefices = [...formData.benefices];
    newBenefices[index] = value;
    handleInputChange('benefices', newBenefices);
  };
  
  const addBenefice = () => {
    handleInputChange('benefices', [...formData.benefices, '']);
  };
  
  const removeBenefice = (index: number) => {
    const newBenefices = formData.benefices.filter((_, i) => i !== index);
    handleInputChange('benefices', newBenefices);
  };
  
  const handleMembreToggle = (membreId: string) => {
    const newMembresIds = formData.membresIds.includes(membreId)
      ? formData.membresIds.filter(id => id !== membreId)
      : [...formData.membresIds, membreId];
    
    handleInputChange('membresIds', newMembresIds);
  };
  
  const handleSubmit = () => {
    if (editAlliance) {
      updateAlliance(editAlliance.id, {
        ...formData,
        membres: formData.membresIds
      });
    } else {
      createAlliance(
        formData.famille1Id,
        formData.famille2Id,
        formData.type,
        formData.termes,
        formData.benefices
      );
    }
    onClose();
  };
  
  const formValid = 
    formData.famille1Id !== '' && 
    formData.famille2Id !== '' && 
    formData.famille1Id !== formData.famille2Id &&
    formData.termes.trim() !== '';
  
  // Filtrer les membres des deux familles sélectionnées
  const famille1Membres = formData.famille1Id ? membres.filter(m => getFamille(formData.famille1Id)?.membres.includes(m.id)) : [];
  const famille2Membres = formData.famille2Id ? membres.filter(m => getFamille(formData.famille2Id)?.membres.includes(m.id)) : [];
  const allianceMembres = [...famille1Membres, ...famille2Membres];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editAlliance ? 'Modifier une alliance' : 'Créer une nouvelle alliance'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="famille1">Première famille</Label>
            <Select
              value={formData.famille1Id}
              onValueChange={(value) => handleInputChange('famille1Id', value)}
              disabled={!!initialFamilleId || !!editAlliance}
            >
              <SelectTrigger id="famille1">
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
            <Label htmlFor="famille2">Seconde famille</Label>
            <Select
              value={formData.famille2Id}
              onValueChange={(value) => handleInputChange('famille2Id', value)}
              disabled={!!editAlliance}
            >
              <SelectTrigger id="famille2">
                <SelectValue placeholder="Sélectionner une famille" />
              </SelectTrigger>
              <SelectContent>
                {familles
                  .filter(f => f.id !== formData.famille1Id)
                  .map(famille => (
                    <SelectItem key={famille.id} value={famille.id}>
                      {famille.nom}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Type d'alliance</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange('type', value as typeof formData.type)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matrimoniale">Matrimoniale</SelectItem>
                <SelectItem value="politique">Politique</SelectItem>
                <SelectItem value="commerciale">Commerciale</SelectItem>
                <SelectItem value="militaire">Militaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select
              value={formData.statut}
              onValueChange={(value) => handleInputChange('statut', value as typeof formData.statut)}
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
          
          <div className="space-y-2">
            <Label htmlFor="dateDebut">Date de début</Label>
            <Input
              id="dateDebut"
              type="date"
              value={formData.dateDebut}
              onChange={(e) => handleInputChange('dateDebut', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateFin">Date de fin (optionnelle)</Label>
            <Input
              id="dateFin"
              type="date"
              value={formData.dateFin || ''}
              onChange={(e) => handleInputChange('dateFin', e.target.value || undefined)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="termes">Termes de l'alliance</Label>
          <Textarea
            id="termes"
            value={formData.termes}
            onChange={(e) => handleInputChange('termes', e.target.value)}
            placeholder="Détaillez les termes de l'alliance"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Bénéfices</Label>
            <Button type="button" variant="outline" size="sm" onClick={addBenefice}>
              Ajouter
            </Button>
          </div>
          
          {formData.benefices.map((benefice, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={benefice}
                onChange={(e) => handleBeneficeChange(index, e.target.value)}
                placeholder={`Bénéfice ${index + 1}`}
              />
              {formData.benefices.length > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeBenefice(index)}
                >
                  Supprimer
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <Label>Membres impliqués</Label>
          <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
            {allianceMembres.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Sélectionnez deux familles pour voir leurs membres
              </p>
            ) : (
              <div className="space-y-2">
                {allianceMembres.map(membre => (
                  <div key={membre.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={membre.id} 
                      checked={formData.membresIds.includes(membre.id)}
                      onCheckedChange={() => handleMembreToggle(membre.id)}
                    />
                    <label 
                      htmlFor={membre.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {membre.prenom} {membre.nom} ({getFamille(membre.id)?.nom})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={!formValid}>
            {editAlliance ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
