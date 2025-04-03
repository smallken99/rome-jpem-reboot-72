
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FamilyRelation } from '../types/relationTypes';

// Définition du schéma de validation
const formSchema = z.object({
  targetName: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  targetRole: z.string().min(2, {
    message: "Le rôle doit comporter au moins 2 caractères.",
  }),
  type: z.string(),
  description: z.string().min(10, {
    message: "La description doit comporter au moins 10 caractères.",
  }),
  tags: z.string(),
});

interface NewRelationFormProps {
  onAddRelation: (relation: Omit<FamilyRelation, 'id'>) => void;
}

export const NewRelationForm: React.FC<NewRelationFormProps> = ({ onAddRelation }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetName: "",
      targetRole: "",
      type: "neutral",
      description: "",
      tags: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const tags = values.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    onAddRelation({
      targetName: values.targetName,
      targetRole: values.targetRole,
      type: values.type,
      description: values.description,
      tags,
    });
    
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="targetName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de la personne ou famille" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="targetRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rôle / Position</FormLabel>
                <FormControl>
                  <Input placeholder="Fonction ou position sociale" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de relation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type de relation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="positive">Allié</SelectItem>
                  <SelectItem value="neutral">Neutre</SelectItem>
                  <SelectItem value="negative">Rival</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Décrivez la nature de cette relation..." 
                  {...field} 
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (séparés par des virgules)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="politique, commerce, militaire, etc." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit">Créer la Relation</Button>
        </div>
      </form>
    </Form>
  );
};
