
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Check, Plus, Trash2 } from 'lucide-react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { EvenementType, ImportanceType, Season } from '../types/maitreJeuTypes';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Définir le schéma de validation
const evenementSchema = z.object({
  titre: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  type: z.string(),
  importance: z.string(),
  date: z.object({
    year: z.number().int().positive(),
    season: z.string(),
    day: z.number().int().min(1).max(90).optional()
  }),
  options: z.array(
    z.object({
      id: z.string().optional(),
      texte: z.string().min(3, "Le texte doit contenir au moins 3 caractères"),
      effets: z.object({
        stabilité: z.number().or(z.string()).optional().transform(val => Number(val) || 0),
        trésorPublique: z.number().or(z.string()).optional().transform(val => Number(val) || 0),
        prestigeRome: z.number().or(z.string()).optional().transform(val => Number(val) || 0),
        religion: z.number().or(z.string()).optional().transform(val => Number(val) || 0),
        influence: z.number().or(z.string()).optional().transform(val => Number(val) || 0),
        finance: z.number().or(z.string()).optional().transform(val => Number(val) || 0),
        militaire: z.number().or(z.string()).optional().transform(val => Number(val) || 0),
        economie: z.number().or(z.string()).optional().transform(val => Number(val) || 0),
        autre: z.string().optional()
      })
    })
  ).min(2, "Un événement doit avoir au moins 2 options")
});

type EvenementFormValues = z.infer<typeof evenementSchema>;

const defaultOption = {
  texte: '',
  effets: {
    stabilité: 0,
    trésorPublique: 0,
    prestigeRome: 0,
    religion: 0,
    influence: 0,
    finance: 0,
    militaire: 0,
    economie: 0,
    autre: ''
  }
};

export const CreateEvenementForm: React.FC = () => {
  const { gameState, addEvenement } = useMaitreJeu();
  const { year, season } = gameState;
  const [showForm, setShowForm] = useState(false);
  
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<EvenementFormValues>({
    resolver: zodResolver(evenementSchema),
    defaultValues: {
      titre: '',
      description: '',
      type: 'POLITIQUE',
      importance: 'normale',
      date: {
        year: year,
        season: season,
        day: 1
      },
      options: [{ ...defaultOption }, { ...defaultOption }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  });
  
  const onSubmit = (data: EvenementFormValues) => {
    const transformedOptions = data.options.map(option => ({
      ...option,
      id: `option-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      effets: {
        ...option.effets,
        stabilité: Number(option.effets.stabilité) || 0,
        trésorPublique: Number(option.effets.trésorPublique) || 0,
        prestigeRome: Number(option.effets.prestigeRome) || 0,
        religion: Number(option.effets.religion) || 0,
        influence: Number(option.effets.influence) || 0,
        finance: Number(option.effets.finance) || 0,
        militaire: Number(option.effets.militaire) || 0,
        economie: Number(option.effets.economie) || 0
      }
    }));
    
    addEvenement({
      ...data,
      type: data.type as EvenementType,
      importance: data.importance as ImportanceType,
      date: {
        ...data.date,
        season: data.date.season as Season
      },
      options: transformedOptions,
      resolved: false
    });
    
    reset();
    setShowForm(false);
  };
  
  const addOption = () => {
    append({ ...defaultOption });
  };
  
  return (
    <div className="mt-4">
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Créer un nouvel événement
        </Button>
      )}
      
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer un nouvel événement</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="titre">Titre</Label>
                  <Input 
                    id="titre" 
                    {...register('titre')} 
                    className={errors.titre ? "border-red-500" : ""}
                  />
                  {errors.titre && <p className="text-sm text-red-500 mt-1">{errors.titre.message}</p>}
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    {...register('description')} 
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="POLITIQUE">Politique</SelectItem>
                            <SelectItem value="GUERRE">Guerre</SelectItem>
                            <SelectItem value="CRISE">Crise</SelectItem>
                            <SelectItem value="ECONOMIQUE">Économique</SelectItem>
                            <SelectItem value="RELIGION">Religion</SelectItem>
                            <SelectItem value="DIPLOMATIQUE">Diplomatie</SelectItem>
                            <SelectItem value="SOCIAL">Social</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="importance">Importance</Label>
                    <Controller
                      control={control}
                      name="importance"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner l'importance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mineure">Mineure</SelectItem>
                            <SelectItem value="normale">Normale</SelectItem>
                            <SelectItem value="majeure">Majeure</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date.year">Année</Label>
                    <Input 
                      id="date.year" 
                      type="number" 
                      {...register('date.year', { valueAsNumber: true })} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date.season">Saison</Label>
                    <Controller
                      control={control}
                      name="date.season"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
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
                      )}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date.day">Jour (optionnel)</Label>
                    <Input 
                      id="date.day" 
                      type="number" 
                      min={1}
                      max={90}
                      {...register('date.day', { valueAsNumber: true })} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Options</h3>
                  <Button type="button" onClick={addOption} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter option
                  </Button>
                </div>
                
                {errors.options && errors.options.message && (
                  <p className="text-sm text-red-500">{errors.options.message}</p>
                )}
                
                {fields.map((field, index) => (
                  <Card key={field.id} className="border-gray-200">
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-md font-medium">Option {index + 1}</h4>
                        {index > 1 && (
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="py-3 px-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`options.${index}.texte`}>Texte de l'option</Label>
                          <Textarea 
                            id={`options.${index}.texte`} 
                            {...register(`options.${index}.texte`)}
                            className={errors.options?.[index]?.texte ? "border-red-500" : ""}
                          />
                          {errors.options?.[index]?.texte && (
                            <p className="text-sm text-red-500 mt-1">{errors.options?.[index]?.texte?.message}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`options.${index}.effets.stabilité`}>Effet sur la stabilité</Label>
                            <Input 
                              id={`options.${index}.effets.stabilité`} 
                              type="number" 
                              {...register(`options.${index}.effets.stabilité`)} 
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`options.${index}.effets.trésorPublique`}>Effet sur le trésor</Label>
                            <Input 
                              id={`options.${index}.effets.trésorPublique`} 
                              type="number" 
                              {...register(`options.${index}.effets.trésorPublique`)} 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`options.${index}.effets.prestigeRome`}>Effet sur le prestige</Label>
                            <Input 
                              id={`options.${index}.effets.prestigeRome`} 
                              type="number" 
                              {...register(`options.${index}.effets.prestigeRome`)} 
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`options.${index}.effets.religion`}>Effet sur la religion</Label>
                            <Input 
                              id={`options.${index}.effets.religion`} 
                              type="number" 
                              {...register(`options.${index}.effets.religion`)} 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`options.${index}.effets.influence`}>Effet sur l'influence</Label>
                            <Input 
                              id={`options.${index}.effets.influence`} 
                              type="number" 
                              {...register(`options.${index}.effets.influence`)} 
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`options.${index}.effets.finance`}>Effet sur les finances</Label>
                            <Input 
                              id={`options.${index}.effets.finance`} 
                              type="number" 
                              {...register(`options.${index}.effets.finance`)} 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`options.${index}.effets.militaire`}>Effet militaire</Label>
                            <Input 
                              id={`options.${index}.effets.militaire`} 
                              type="number" 
                              {...register(`options.${index}.effets.militaire`)} 
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`options.${index}.effets.economie`}>Effet économique</Label>
                            <Input 
                              id={`options.${index}.effets.economie`} 
                              type="number" 
                              {...register(`options.${index}.effets.economie`)} 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor={`options.${index}.effets.autre`}>Autres effets (texte)</Label>
                          <Input 
                            id={`options.${index}.effets.autre`} 
                            {...register(`options.${index}.effets.autre`)} 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" />
                Créer l'événement
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};
