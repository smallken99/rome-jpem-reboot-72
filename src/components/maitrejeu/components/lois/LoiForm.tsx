
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useMaitreJeu } from '../../context';
import { Loi, LoiType } from '../../types/lois';

export interface LoiFormProps {
  initialData?: Loi;
  onSubmit: (data: Omit<Loi, "id">) => void;
}

export const LoiForm: React.FC<LoiFormProps> = ({
  initialData,
  onSubmit
}) => {
  const { senateurs, currentYear, currentSeason } = useMaitreJeu();
  
  const [loiData, setLoiData] = useState<Omit<Loi, "id">>({
    titre: initialData?.titre || '',
    description: initialData?.description || '',
    proposeur: initialData?.proposeur || '',
    dateProposition: initialData?.dateProposition || { year: currentYear, season: currentSeason },
    date: initialData?.date || { year: currentYear, season: currentSeason },
    type: initialData?.type || 'politique',
    état: initialData?.état || 'proposée',
    effets: initialData?.effets || [],
    votesPositifs: initialData?.votesPositifs || 0,
    votesNégatifs: initialData?.votesNégatifs || 0,
    votesAbstention: initialData?.votesAbstention || 0,
    votes: initialData?.votes || { pour: 0, contre: 0, abstention: 0 },
    commentaires: initialData?.commentaires || ''
  });
  
  const [newEffet, setNewEffet] = useState('');
  
  const handleChange = (field: keyof Omit<Loi, "id">, value: any) => {
    setLoiData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAddEffet = () => {
    if (newEffet.trim()) {
      setLoiData(prev => ({
        ...prev,
        effets: [...prev.effets, newEffet]
      }));
      setNewEffet('');
    }
  };
  
  const handleRemoveEffet = (index: number) => {
    setLoiData(prev => ({
      ...prev,
      effets: prev.effets.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(loiData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="titre">Titre de la loi</Label>
        <Input
          id="titre"
          value={loiData.titre}
          onChange={(e) => handleChange('titre', e.target.value)}
          placeholder="Ex: Lex Agraria"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={loiData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Décrivez le contenu et l'objectif de cette loi..."
          rows={4}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="proposeur">Proposeur</Label>
          <Select
            value={loiData.proposeur}
            onValueChange={(value) => handleChange('proposeur', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un sénateur" />
            </SelectTrigger>
            <SelectContent>
              {senateurs.map((senateur) => (
                <SelectItem key={senateur.id} value={senateur.nom}>
                  {senateur.prenom} {senateur.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Type de loi</Label>
          <Select
            value={loiData.type}
            onValueChange={(value) => handleChange('type', value as LoiType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="politique">Politique</SelectItem>
              <SelectItem value="sociale">Sociale</SelectItem>
              <SelectItem value="économique">Économique</SelectItem>
              <SelectItem value="judiciaire">Judiciaire</SelectItem>
              <SelectItem value="militaire">Militaire</SelectItem>
              <SelectItem value="religieuse">Religieuse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Effets de la loi</Label>
        <div className="space-y-2">
          {loiData.effets && loiData.effets.map((effet, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input value={effet} readOnly />
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => handleRemoveEffet(index)}
              >
                Supprimer
              </Button>
            </div>
          ))}
          
          <div className="flex items-center gap-2">
            <Input
              value={newEffet}
              onChange={(e) => setNewEffet(e.target.value)}
              placeholder="Ajouter un effet de la loi..."
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddEffet}
            >
              Ajouter
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="commentaires">Commentaires additionnels</Label>
        <Textarea
          id="commentaires"
          value={loiData.commentaires || ''}
          onChange={(e) => handleChange('commentaires', e.target.value)}
          placeholder="Commentaires ou notes supplémentaires..."
          rows={3}
        />
      </div>
      
      <Button type="submit" className="w-full">
        {initialData ? 'Mettre à jour' : 'Créer la loi'}
      </Button>
    </form>
  );
};
