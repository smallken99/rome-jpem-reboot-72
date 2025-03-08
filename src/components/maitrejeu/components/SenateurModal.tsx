
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SenateurJouable, SenateurModalProps } from '../types/senateurs';

export const SenateurModal: React.FC<SenateurModalProps> = ({ 
  isOpen, 
  senateur, 
  onClose, 
  onUpdate 
}) => {
  const [editedSenateur, setEditedSenateur] = useState<SenateurJouable | null>(null);
  
  useEffect(() => {
    if (senateur) {
      setEditedSenateur({...senateur});
    }
  }, [senateur]);
  
  const handleChange = (field: keyof SenateurJouable, value: any) => {
    if (!editedSenateur) return;
    
    setEditedSenateur(prev => {
      if (!prev) return prev;
      
      // Pour les champs numériques
      if (['age', 'popularite', 'richesse', 'influence'].includes(field as string)) {
        return {
          ...prev,
          [field]: Number(value)
        };
      }
      
      return {
        ...prev,
        [field]: value
      };
    });
  };
  
  const handleSave = () => {
    if (editedSenateur) {
      onUpdate(editedSenateur);
      onClose();
    }
  };
  
  if (!senateur || !editedSenateur) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier le Sénateur</DialogTitle>
          <DialogDescription>
            Modifiez les informations du sénateur {senateur.nom}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">
              Nom
            </Label>
            <Input
              id="nom"
              value={editedSenateur.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="famille" className="text-right">
              Famille
            </Label>
            <Input
              id="famille"
              value={editedSenateur.famille}
              onChange={(e) => handleChange('famille', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Âge
            </Label>
            <Input
              id="age"
              type="number"
              value={editedSenateur.âge || editedSenateur.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="popularite" className="text-right">
              Popularité
            </Label>
            <Input
              id="popularite"
              type="number"
              value={editedSenateur.popularité || editedSenateur.popularite}
              onChange={(e) => handleChange('popularite', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="richesse" className="text-right">
              Richesse
            </Label>
            <Input
              id="richesse"
              type="number"
              value={editedSenateur.richesse}
              onChange={(e) => handleChange('richesse', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="influence" className="text-right">
              Influence
            </Label>
            <Input
              id="influence"
              type="number"
              value={editedSenateur.influence}
              onChange={(e) => handleChange('influence', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fonction" className="text-right">
              Fonction
            </Label>
            <Input
              id="fonction"
              value={editedSenateur.fonctionActuelle || editedSenateur.fonction}
              onChange={(e) => handleChange('fonction', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="appartenance" className="text-right">
              Appartenance
            </Label>
            <Select
              value={editedSenateur.appartenance}
              onValueChange={(value) => handleChange('appartenance', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un parti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Populares">Populares</SelectItem>
                <SelectItem value="Optimates">Optimates</SelectItem>
                <SelectItem value="Neutre">Neutre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="statut" className="text-right">
              Statut
            </Label>
            <Select
              value={editedSenateur.statut || editedSenateur.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="décédé">Décédé</SelectItem>
                <SelectItem value="retraité">Retraité</SelectItem>
                <SelectItem value="exilé">Exilé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="magistrature" className="text-right">
              Magistrature
            </Label>
            <Select
              value={editedSenateur.magistrature}
              onValueChange={(value) => handleChange('magistrature', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner une magistrature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONSUL">Consul</SelectItem>
                <SelectItem value="PRETEUR">Préteur</SelectItem>
                <SelectItem value="EDILE">Édile</SelectItem>
                <SelectItem value="QUESTEUR">Questeur</SelectItem>
                <SelectItem value="CENSEUR">Censeur</SelectItem>
                <SelectItem value="TRIBUN">Tribun</SelectItem>
                <SelectItem value="AUCUNE">Aucune</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="playerId" className="text-right">
              ID Joueur
            </Label>
            <Input
              id="playerId"
              value={editedSenateur.playerId || ''}
              onChange={(e) => handleChange('playerId', e.target.value || null)}
              className="col-span-3"
              placeholder="Laisser vide si non assigné"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
