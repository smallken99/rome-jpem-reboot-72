
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HistoireEntry } from '../../types/histoire';
import { Season } from '../../types/common';

// Define ImportanceType
type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'historique';

interface HistoireEntryFormProps {
  year: number;
  season: Season;
  onSubmit: (entry: Omit<HistoireEntry, "id">) => void;
}

export const HistoireEntryForm: React.FC<HistoireEntryFormProps> = ({ year, season, onSubmit }) => {
  const [formData, setFormData] = useState<Omit<HistoireEntry, "id">>({
    titre: '',
    contenu: '',
    date: { year, season },
    type: 'politique', // Using correct type format
    catégorie: 'POLITIQUE',
    importance: 'normale',
    auteur: 'Système',
    visible: true,
    personnesImpliquées: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'personnesImpliquées') {
      setFormData(prev => ({
        ...prev,
        personnesImpliquées: [...(prev.personnesImpliquées || []), value]
      }));
    } else if (name === 'catégorie') {
      setFormData(prev => ({
        ...prev,
        type: value.toLowerCase() as 'politique' | 'militaire' | 'économique' | 'religieux' | 'social', // Convert to lowercase for type
        catégorie: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePersonnajeRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      personnesImpliquées: prev.personnesImpliquées?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      titre: '',
      contenu: '',
      date: { year, season },
      type: 'politique', // Using correct type format
      catégorie: 'POLITIQUE',
      importance: 'normale',
      auteur: 'Système',
      visible: true,
      personnesImpliquées: []
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une entrée historique</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre</label>
            <Input
              name="titre"
              value={formData.titre}
              onChange={handleInputChange}
              placeholder="Titre de l'événement"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Contenu</label>
            <Textarea
              name="contenu"
              value={formData.contenu}
              onChange={handleInputChange}
              placeholder="Description détaillée de l'événement"
              rows={4}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <Select 
              value={formData.catégorie} 
              onValueChange={(value) => handleSelectChange('catégorie', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="POLITIQUE">Politique</SelectItem>
                <SelectItem value="GUERRE">Guerre</SelectItem>
                <SelectItem value="ECONOMIQUE">Économique</SelectItem>
                <SelectItem value="RELIGION">Religion</SelectItem>
                <SelectItem value="DIPLOMATIQUE">Diplomatique</SelectItem>
                <SelectItem value="SOCIAL">Social</SelectItem>
                <SelectItem value="CRISE">Crise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Importance</label>
            <Select 
              value={formData.importance} 
              onValueChange={(value) => handleSelectChange('importance', value as ImportanceType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner l'importance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mineure">Mineure</SelectItem>
                <SelectItem value="normale">Normale</SelectItem>
                <SelectItem value="majeure">Majeure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Personnages impliqués</label>
            <div className="flex space-x-2">
              <Input
                placeholder="Ajouter un personnage"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      handleSelectChange('personnesImpliquées', input.value.trim());
                      input.value = '';
                    }
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input && input.value.trim()) {
                    handleSelectChange('personnesImpliquées', input.value.trim());
                    input.value = '';
                  }
                }}
              >
                Ajouter
              </Button>
            </div>
            
            {formData.personnesImpliquées && formData.personnesImpliquées.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.personnesImpliquées.map((personnage, index) => (
                  <div key={index} className="bg-muted px-2 py-1 rounded-md text-sm flex items-center">
                    {personnage}
                    <button
                      type="button"
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => handlePersonnajeRemove(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full">
              Ajouter à l'histoire
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
