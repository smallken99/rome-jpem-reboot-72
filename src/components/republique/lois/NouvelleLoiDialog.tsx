
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLois, CategorieLoi } from './hooks/useLois';
import { toast } from 'sonner';
import { Tag, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NouvelleLoiDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export const NouvelleLoiDialog: React.FC<NouvelleLoiDialogProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const { categories, proposerLoi } = useLois();
  
  const [formState, setFormState] = useState({
    titre: '',
    description: '',
    categorieId: '',
    auteur: '', // Dans un cas réel, ce serait le nom du sénateur connecté
    tags: [] as string[]
  });
  
  const [currentTag, setCurrentTag] = useState('');
  
  const handleChange = (field: string, value: string) => {
    setFormState({ ...formState, [field]: value });
  };
  
  const handleAddTag = () => {
    if (currentTag.trim() && !formState.tags.includes(currentTag.trim())) {
      setFormState({
        ...formState,
        tags: [...formState.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setFormState({
      ...formState,
      tags: formState.tags.filter(t => t !== tag)
    });
  };
  
  const handleSubmit = () => {
    if (!formState.titre || !formState.description || !formState.categorieId || !formState.auteur) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    proposerLoi({
      titre: formState.titre,
      description: formState.description,
      categorieId: formState.categorieId,
      auteur: formState.auteur,
      tags: formState.tags
    });
    
    toast.success("Votre proposition de loi a été soumise avec succès");
    
    // Réinitialiser le formulaire
    setFormState({
      titre: '',
      description: '',
      categorieId: '',
      auteur: '',
      tags: []
    });
    
    onSubmit();
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">Proposer une nouvelle loi</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="titre">Titre de la loi</Label>
            <Input
              id="titre"
              placeholder="Ex: Lex Agraria de divisione"
              value={formState.titre}
              onChange={(e) => handleChange('titre', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Décrivez le contenu et l'objectif de cette loi..."
              rows={4}
              value={formState.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="auteur">Auteur</Label>
              <Input
                id="auteur"
                placeholder="Votre nom complet"
                value={formState.auteur}
                onChange={(e) => handleChange('auteur', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="categorie">Catégorie</Label>
              <Select
                value={formState.categorieId}
                onValueChange={(value) => handleChange('categorieId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((categorie: CategorieLoi) => (
                    <SelectItem key={categorie.id} value={categorie.id}>
                      {categorie.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (mots-clés)</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Ex: agriculture"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formState.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formState.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            Soumettre la proposition
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
