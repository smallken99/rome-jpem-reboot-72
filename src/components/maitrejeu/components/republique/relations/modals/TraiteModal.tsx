
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Traite, TraiteModalProps } from '../types';

export const TraiteModal: React.FC<TraiteModalProps> = ({
  isOpen,
  onOpenChange,
  traite,
  isEditable,
  onSave
}) => {
  const [editedTraite, setEditedTraite] = useState<Traite>({ ...traite });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedTraite);
  };
  
  const handleChange = (field: keyof Traite, value: any) => {
    setEditedTraite(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatClausesForDisplay = (clauses: string[]) => {
    return clauses.join('\n');
  };

  const handleClausesChange = (text: string) => {
    const clauses = text
      .split('\n')
      .filter(clause => clause.trim() !== '')
      .map(clause => clause.trim());
    
    handleChange('clauses', clauses);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditable ? 'Modifier le traité' : 'Détails du traité'}</DialogTitle>
          <DialogDescription>
            {isEditable 
              ? "Modifiez les informations du traité ci-dessous."
              : "Informations détaillées sur le traité."
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du traité</Label>
            <Input 
              id="name" 
              value={editedTraite.name} 
              onChange={(e) => handleChange('name', e.target.value)} 
              disabled={!isEditable} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={editedTraite.type} 
                onValueChange={(value) => handleChange('type', value)}
                disabled={!isEditable}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="peace">Paix</SelectItem>
                  <SelectItem value="military">Militaire</SelectItem>
                  <SelectItem value="territorial">Territorial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={editedTraite.status} 
                onValueChange={(value) => handleChange('status', value)}
                disabled={!isEditable}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="expired">Expiré</SelectItem>
                  <SelectItem value="revoked">Révoqué</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateSignature">Date de signature</Label>
              <Input 
                id="dateSignature" 
                value={editedTraite.dateSignature} 
                onChange={(e) => handleChange('dateSignature', e.target.value)} 
                disabled={!isEditable} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateExpiration">Date d'expiration</Label>
              <Input 
                id="dateExpiration" 
                value={editedTraite.dateExpiration} 
                onChange={(e) => handleChange('dateExpiration', e.target.value)} 
                disabled={!isEditable} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parties">Parties (séparées par des virgules)</Label>
            <Input 
              id="parties" 
              value={editedTraite.parties.join(', ')} 
              onChange={(e) => handleChange('parties', e.target.value.split(',').map(p => p.trim()))} 
              disabled={!isEditable} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={editedTraite.description} 
              onChange={(e) => handleChange('description', e.target.value)} 
              disabled={!isEditable}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clauses">Clauses (une par ligne)</Label>
            <Textarea 
              id="clauses" 
              value={formatClausesForDisplay(editedTraite.clauses)} 
              onChange={(e) => handleClausesChange(e.target.value)} 
              disabled={!isEditable}
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="benefits">Bénéfices</Label>
              <Textarea 
                id="benefits" 
                value={typeof editedTraite.benefits === 'string' ? editedTraite.benefits : editedTraite.benefits.join('\n')} 
                onChange={(e) => handleChange('benefits', e.target.value.split('\n').filter(b => b.trim()))} 
                disabled={!isEditable}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="obligations">Obligations</Label>
              <Textarea 
                id="obligations" 
                value={typeof editedTraite.obligations === 'string' ? editedTraite.obligations : editedTraite.obligations.join('\n')} 
                onChange={(e) => handleChange('obligations', e.target.value.split('\n').filter(o => o.trim()))} 
                disabled={!isEditable}
                rows={3}
              />
            </div>
          </div>
          
          {isEditable && (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          )}
          
          {!isEditable && (
            <DialogFooter>
              <Button type="button" onClick={() => onOpenChange(false)}>
                Fermer
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
