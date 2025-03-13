
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { LoiModalProps } from './types';
import { Loi } from '@/components/republique/lois/hooks/useLois';

export const LoiModal: React.FC<LoiModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  loi,
  categories = []
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<Loi>({
    id: '',
    titre: '',
    description: '',
    auteur: '',
    dateProposition: '',
    statut: 'proposée',
    categorieId: '',
    tags: []
  });
  
  const [newTag, setNewTag] = useState('');
  
  useEffect(() => {
    if (loi) {
      setFormData(loi);
    } else {
      // Initialiser avec des valeurs par défaut pour une nouvelle loi
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('fr-FR', options).replace(/ ([0-9]{4})$/, ' $1 av. J.-C.');
      
      setFormData({
        id: `loi_${Date.now()}`,
        titre: '',
        description: '',
        auteur: '',
        dateProposition: formattedDate,
        statut: 'proposée',
        categorieId: categories.length > 0 ? categories[0].id : '',
        tags: []
      });
    }
  }, [loi, categories]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };
  
  const getCategorieName = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.nom : '';
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {loi ? `Modifier: ${loi.titre}` : 'Proposer une nouvelle loi'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">Informations Générales</TabsTrigger>
            <TabsTrigger value="details">Détails et Effets</TabsTrigger>
            <TabsTrigger value="votes">Votes et Statut</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre de la Loi</Label>
                <Input
                  id="titre"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  placeholder="Ex: Lex Manlia de vicesima"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="auteur">Auteur</Label>
                <Input
                  id="auteur"
                  name="auteur"
                  value={formData.auteur}
                  onChange={handleChange}
                  placeholder="Ex: Marcus Manlius"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categorieId">Catégorie</Label>
                <Select
                  value={formData.categorieId}
                  onValueChange={(value) => handleSelectChange('categorieId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez le contenu et l'objectif de la loi"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Ajouter un tag"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddTag}>Ajouter</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 h-4 w-4 rounded-full hover:bg-muted flex items-center justify-center"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="effets">Effets de la loi</Label>
                <Textarea
                  id="effets"
                  name="effets"
                  value={formData.effets || ''}
                  onChange={handleChange}
                  placeholder="Décrivez les effets et conséquences de cette loi"
                  rows={6}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="conditions">Conditions d'application</Label>
                <Textarea
                  id="conditions"
                  name="conditions"
                  value={formData.conditions || ''}
                  onChange={handleChange}
                  placeholder="Précisez les conditions d'application de cette loi"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="penalites">Pénalités en cas de non-respect</Label>
                <Textarea
                  id="penalites"
                  name="penalites"
                  value={formData.penalites || ''}
                  onChange={handleChange}
                  placeholder="Définissez les pénalités applicables"
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="votes" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select
                  value={formData.statut}
                  onValueChange={(value) => handleSelectChange('statut', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Statut de la loi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proposée">Proposée</SelectItem>
                    <SelectItem value="en_débat">En débat</SelectItem>
                    <SelectItem value="votée">Votée</SelectItem>
                    <SelectItem value="promulguée">Promulguée</SelectItem>
                    <SelectItem value="rejetée">Rejetée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(formData.statut === 'votée' || formData.statut === 'promulguée' || formData.statut === 'rejetée') && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="dateVote">Date du Vote</Label>
                    <Input
                      id="dateVote"
                      name="dateVote"
                      value={formData.dateVote || ''}
                      onChange={handleChange}
                      placeholder="Ex: 21 Mai 45 av. J.-C."
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="votesPour">Votes Pour</Label>
                      <Input
                        id="votesPour"
                        name="votesPour"
                        type="number"
                        min="0"
                        value={formData.votes?.pour || 0}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          votes: { ...(prev.votes || { pour: 0, contre: 0, abstention: 0 }), pour: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="votesContre">Votes Contre</Label>
                      <Input
                        id="votesContre"
                        name="votesContre"
                        type="number"
                        min="0"
                        value={formData.votes?.contre || 0}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          votes: { ...(prev.votes || { pour: 0, contre: 0, abstention: 0 }), contre: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="votesAbstention">Abstention</Label>
                      <Input
                        id="votesAbstention"
                        name="votesAbstention"
                        type="number"
                        min="0"
                        value={formData.votes?.abstention || 0}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          votes: { ...(prev.votes || { pour: 0, contre: 0, abstention: 0 }), abstention: Number(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>
            {loi ? 'Mettre à jour' : 'Créer la loi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
