
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoiFormData } from "./hooks/useLoiForm";
import { LoiType } from '../../types/lois';

export interface LoiFormProps {
  newLoi: LoiFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof LoiFormData) => void;
  handleSelectChange: (value: string, field: keyof LoiFormData) => void;
  handleAddLoi: () => void;
  onCancel: () => void;
}

export const LoiForm: React.FC<LoiFormProps> = ({
  newLoi,
  handleInputChange,
  handleSelectChange,
  handleAddLoi,
  onCancel
}) => {
  // Helper pour traiter les effets selon leur type
  const renderEffetsInputs = () => {
    // Si les effets sont un objet
    if (newLoi.effets && typeof newLoi.effets === 'object' && !Array.isArray(newLoi.effets)) {
      return (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="stabilite">Stabilité politique</Label>
            <Input
              id="stabilite"
              type="number"
              value={(newLoi.effets as Record<string, any>).stabilité || 0}
              onChange={(e) => {
                const newEffets = { ...newLoi.effets as Record<string, any>, stabilité: parseInt(e.target.value) };
                handleInputChange({ target: { value: newEffets } } as any, 'effets');
              }}
            />
          </div>
          <div>
            <Label htmlFor="popularite">Popularité</Label>
            <Input
              id="popularite"
              type="number"
              value={(newLoi.effets as Record<string, any>).popularité || 0}
              onChange={(e) => {
                const newEffets = { ...newLoi.effets as Record<string, any>, popularité: parseInt(e.target.value) };
                handleInputChange({ target: { value: newEffets } } as any, 'effets');
              }}
            />
          </div>
          <div>
            <Label htmlFor="corruption">Corruption</Label>
            <Input
              id="corruption"
              type="number"
              value={(newLoi.effets as Record<string, any>).corruption || 0}
              onChange={(e) => {
                const newEffets = { ...newLoi.effets as Record<string, any>, corruption: parseInt(e.target.value) };
                handleInputChange({ target: { value: newEffets } } as any, 'effets');
              }}
            />
          </div>
          <div>
            <Label htmlFor="efficacite">Efficacité gouvernementale</Label>
            <Input
              id="efficacite"
              type="number"
              value={(newLoi.effets as Record<string, any>).efficacité || 0}
              onChange={(e) => {
                const newEffets = { ...newLoi.effets as Record<string, any>, efficacité: parseInt(e.target.value) };
                handleInputChange({ target: { value: newEffets } } as any, 'effets');
              }}
            />
          </div>
        </div>
      );
    }
    
    // Par défaut, utiliser un champ texte simple
    return (
      <Textarea
        placeholder="Décrivez les effets de cette loi"
        value={typeof newLoi.effets === 'string' ? newLoi.effets : JSON.stringify(newLoi.effets)}
        onChange={(e) => handleInputChange(e, 'effets')}
      />
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Proposer une nouvelle loi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre</Label>
            <Input
              id="titre"
              placeholder="Titre de la loi"
              value={newLoi.titre}
              onChange={(e) => handleInputChange(e, 'titre')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nom">Nom (Lex ...)</Label>
            <Input
              id="nom"
              placeholder="Ex: Lex Iulia"
              value={newLoi.nom}
              onChange={(e) => handleInputChange(e, 'nom')}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Description détaillée de la loi"
            value={newLoi.description}
            onChange={(e) => handleInputChange(e, 'description')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select 
              value={newLoi.type} 
              onValueChange={(value) => handleSelectChange(value, 'type')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="politique">Politique</SelectItem>
                <SelectItem value="économique">Économique</SelectItem>
                <SelectItem value="sociale">Sociale</SelectItem>
                <SelectItem value="judiciaire">Judiciaire</SelectItem>
                <SelectItem value="militaire">Militaire</SelectItem>
                <SelectItem value="religieuse">Religieuse</SelectItem>
                <SelectItem value="civile">Civile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="importance">Importance</Label>
            <Select 
              value={newLoi.importance} 
              onValueChange={(value) => handleSelectChange(value as any, 'importance')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez l'importance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mineure">Mineure</SelectItem>
                <SelectItem value="normale">Normale</SelectItem>
                <SelectItem value="majeure">Majeure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="proposeur">Proposeur</Label>
          <Input
            id="proposeur"
            placeholder="Nom du sénateur proposant la loi"
            value={newLoi.proposeur}
            onChange={(e) => handleInputChange(e, 'proposeur')}
          />
        </div>

        <div className="space-y-2">
          <Label>Effets</Label>
          {renderEffetsInputs()}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={onCancel}>Annuler</Button>
        <Button onClick={handleAddLoi}>Proposer</Button>
      </CardFooter>
    </Card>
  );
};
