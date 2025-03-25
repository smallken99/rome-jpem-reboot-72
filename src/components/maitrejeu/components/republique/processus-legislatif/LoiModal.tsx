
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loi } from '@/components/maitrejeu/types/lois';

interface LoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loiData: any) => void;
  loi?: Loi;
  categories: { id: string; name: string; description: string }[];
}

export const LoiModal: React.FC<LoiModalProps> = ({ isOpen, onClose, onSave, loi, categories }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState('normale');
  
  // Réinitialiser le formulaire lorsqu'une loi est sélectionnée
  useEffect(() => {
    if (loi) {
      setTitle(loi.titre || loi.name || '');
      setAuthor(loi.proposeur || loi.auteur || '');
      setCategory(loi.catégorieId || '');
      setContent(Array.isArray(loi.contenu) ? loi.contenu.join('\n') : loi.contenu || '');
      setDescription(loi.description || '');
      setImportance(loi.importance || 'normale');
    } else {
      // Réinitialiser à vide pour une nouvelle loi
      setTitle('');
      setAuthor('');
      setCategory('');
      setContent('');
      setDescription('');
      setImportance('normale');
    }
  }, [loi, isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const loiData = {
      titre: title,
      proposeur: author,
      catégorieId: category,
      catégorie: categories.find(c => c.id === category)?.name || '',
      description,
      contenu: content,
      importance,
      état: 'Proposée',
      votes: {
        pour: 0,
        contre: 0,
        abstention: 0
      }
    };
    
    onSave(loiData);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{loi ? 'Modifier la loi' : 'Proposer une nouvelle loi'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la loi</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Lex Agraria de coloniis" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Proposeur</Label>
              <Input 
                id="author" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                placeholder="Marcus Tullius Cicero" 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="importance">Importance</Label>
              <Select value={importance} onValueChange={setImportance}>
                <SelectTrigger id="importance">
                  <SelectValue placeholder="Niveau d'importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="faible">Faible</SelectItem>
                  <SelectItem value="normale">Normale</SelectItem>
                  <SelectItem value="haute">Haute</SelectItem>
                  <SelectItem value="critique">Critique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description brève du but et des conséquences de la loi" 
              rows={3} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Contenu de la loi</Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Contenu détaillé de la loi..." 
              rows={10} 
              required 
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {loi ? 'Mettre à jour' : 'Proposer la loi'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
