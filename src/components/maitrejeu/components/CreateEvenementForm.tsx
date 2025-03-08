import React, { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from "react-hook-form"
import { Evenement, EvenementType, ImportanceType, Season } from '../types/maitreJeuTypes';

interface CreateEvenementFormProps {
  onCreateEvenement: (evenement: Omit<Evenement, 'id'>) => void;
}

export const CreateEvenementForm: React.FC<CreateEvenementFormProps> = ({ onCreateEvenement }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type: 'POLITIQUE' as EvenementType,
    year: 275,
    season: 'SPRING' as Season,
    day: 1,
    importance: 'normale' as ImportanceType,
    options: [{ texte: '', effets: {}, résultat: '' }]
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const form = useForm();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  const handleOptionChange = (index: number, field: string, value: any) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setFormData(prev => ({ ...prev, options: updatedOptions }));
    setValidationErrors(prev => ({ ...prev, [`option-${index}`]: '' }));
  };
  
  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { texte: '', effets: {}, résultat: '' }]
    }));
  };
  
  const removeOption = (index: number) => {
    const updatedOptions = [...formData.options];
    updatedOptions.splice(index, 1);
    setFormData(prev => ({ ...prev, options: updatedOptions }));
  };
  
  const resetForm = () => {
    setFormData({
      titre: '',
      description: '',
      type: 'POLITIQUE',
      year: 275,
      season: 'SPRING',
      day: 1,
      importance: 'normale',
      options: [{ texte: '', effets: {}, résultat: '' }]
    });
    setValidationErrors({});
  };

  // Remplacer uniquement les parties problématiques
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  // Validation des champs
  let isValid = true;
  const errors: Record<string, string> = {};
  
  if (!formData.titre.trim()) {
    errors.titre = "Le titre est requis";
    isValid = false;
  }
  
  if (!formData.description.trim()) {
    errors.description = "La description est requise";
    isValid = false;
  }
  
  // Convertir en nombre pour la comparaison
  const dayNumber = Number(formData.day);
  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 90) {
    errors.day = "Le jour doit être entre 1 et 90";
    isValid = false;
  }
  
  // Vérifier chaque option
  if (formData.options.length > 0) {
    formData.options.forEach((option, index) => {
      if (!option.texte.trim()) {
        errors[`option-${index}`] = "Le texte de l'option est requis";
        isValid = false;
      }
    });
  }
  
  // Si formulaire non valide, afficher les erreurs
  if (!isValid) {
    setValidationErrors(errors);
    return;
  }
  
  // Créer l'événement
  const nouvelEvenement: Omit<Evenement, 'id'> = {
    titre: formData.titre,
    description: formData.description,
    type: formData.type,
    date: {
      year: parseInt(formData.year.toString()),
      season: formData.season,
      day: parseInt(formData.day.toString())
    },
    importance: formData.importance,
    options: formData.options.map(option => ({
      id: '', // Sera généré par le système
      texte: option.texte,
      effets: option.effets,
      résultat: option.résultat || ''
    })),
    resolved: false
  };
  
  // Ajouter l'événement
  onCreateEvenement(nouvelEvenement);
  
  // Réinitialiser le formulaire
  resetForm();
  
  toast.success('Événement créé avec succès');
};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-cinzel">Créer un nouvel événement</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input 
                    name="titre"
                    value={formData.titre}
                    onChange={handleInputChange}
                    placeholder="Titre de l'événement"
                  />
                </FormControl>
                {validationErrors.titre && (
                  <p className="text-sm text-red-500">{validationErrors.titre}</p>
                )}
              </FormItem>
            </div>
            
            <div>
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description de l'événement"
                  />
                </FormControl>
                {validationErrors.description && (
                  <p className="text-sm text-red-500">{validationErrors.description}</p>
                )}
              </FormItem>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as EvenementType }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type d'événement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="POLITIQUE">Politique</SelectItem>
                      <SelectItem value="GUERRE">Guerre</SelectItem>
                      <SelectItem value="CRISE">Crise</SelectItem>
                      <SelectItem value="ECONOMIQUE">Économique</SelectItem>
                      <SelectItem value="RELIGION">Religion</SelectItem>
                      <SelectItem value="DIPLOMATIQUE">Diplomatique</SelectItem>
                      <SelectItem value="SOCIAL">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
              
              <div>
                <FormItem>
                  <FormLabel>Importance</FormLabel>
                  <Select
                    name="importance"
                    value={formData.importance}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, importance: value as ImportanceType }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Importance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="majeure">Majeure</SelectItem>
                      <SelectItem value="mineure">Mineure</SelectItem>
                      <SelectItem value="normale">Normale</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <FormItem>
                  <FormLabel>Année</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="Année"
                    />
                  </FormControl>
                </FormItem>
              </div>
              
              <div>
                <FormItem>
                  <FormLabel>Saison</FormLabel>
                  <Select
                    name="season"
                    value={formData.season}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, season: value as Season }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Saison" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SPRING">Printemps</SelectItem>
                      <SelectItem value="SUMMER">Été</SelectItem>
                      <SelectItem value="AUTUMN">Automne</SelectItem>
                      <SelectItem value="WINTER">Hiver</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
              
              <div>
                <FormItem>
                  <FormLabel>Jour</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      placeholder="Jour"
                    />
                  </FormControl>
                  {validationErrors.day && (
                    <p className="text-sm text-red-500">{validationErrors.day}</p>
                  )}
                </FormItem>
              </div>
            </div>
            
            <div>
              <FormLabel>Options</FormLabel>
              {formData.options.map((option, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <div className="flex-grow">
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={`Option ${index + 1}`}
                          value={option.texte}
                          onChange={(e) => handleOptionChange(index, 'texte', e.target.value)}
                        />
                      </FormControl>
                      {validationErrors[`option-${index}`] && (
                        <p className="text-sm text-red-500">{validationErrors[`option-${index}`]}</p>
                      )}
                    </FormItem>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => removeOption(index)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={addOption}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une option
              </Button>
            </div>
            
            <Button type="submit">Créer l'événement</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
