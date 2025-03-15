
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Building, 
  BuildingType, 
  BuildingStatus, 
  BuildingOwner, 
  PublicBuildingModalProps, 
  PublicBuildingData 
} from '../../types/batiments';

const buildingSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
  type: z.string() as z.ZodType<BuildingType>,
  location: z.string().min(2, { message: "La localisation doit être spécifiée" }),
  status: z.string() as z.ZodType<BuildingStatus | 'good' | 'poor' | 'average'>,
  constructionYear: z.number().int().positive(),
  description: z.string().optional(),
  cost: z.number().nonnegative(),
  maintenanceCost: z.number().nonnegative(),
  revenue: z.number().default(0),
  capacity: z.number().default(0),
  owner: z.string() as z.ZodType<BuildingOwner>
});

export const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  building
}) => {
  const form = useForm<z.infer<typeof buildingSchema>>({
    resolver: zodResolver(buildingSchema),
    defaultValues: {
      name: "",
      type: "temple",
      location: "",
      status: "good",
      constructionYear: new Date().getFullYear() - 50,
      description: "",
      cost: 0,
      maintenanceCost: 0,
      revenue: 0,
      capacity: 0,
      owner: "république"
    }
  });
  
  useEffect(() => {
    if (building) {
      // Adapter le statut du bâtiment au format attendu par le formulaire
      let status = building.status;
      if (status === 'excellent' || status === 'good') status = 'good';
      else if (status === 'damaged' || status === 'poor') status = 'poor';
      else if (status === 'ruined') status = 'poor';
      else if (status === 'under_construction') status = 'good';
      
      form.reset({
        name: building.name,
        type: building.type,
        location: building.location,
        status: status,
        constructionYear: building.constructionYear,
        description: building.description,
        cost: building.cost,
        maintenanceCost: building.maintenanceCost,
        revenue: building.revenue,
        capacity: building.capacity,
        owner: building.owner
      });
    } else {
      form.reset({
        name: "",
        type: "temple",
        location: "",
        status: "good",
        constructionYear: new Date().getFullYear() - 50,
        description: "",
        cost: 0,
        maintenanceCost: 0,
        revenue: 0,
        capacity: 0,
        owner: "république"
      });
    }
  }, [building, form]);
  
  const onSubmit = (data: z.infer<typeof buildingSchema>) => {
    // Convertir le statut "good" ou "poor" en statut BuildingStatus approprié
    let status: BuildingStatus;
    if (data.status === 'good') status = 'good';
    else if (data.status === 'poor') status = 'poor';
    else if (data.status === 'average') status = 'damaged';
    else status = data.status as BuildingStatus;
    
    const buildingData: PublicBuildingData = {
      ...data,
      status: data.status as 'good' | 'poor' | 'average'
    };
    
    onSave(buildingData);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {building ? "Modifier un bâtiment" : "Ajouter un nouveau bâtiment"}
          </DialogTitle>
          <DialogDescription>
            {building 
              ? "Modifiez les informations du bâtiment existant." 
              : "Remplissez les informations pour ajouter un nouveau bâtiment public."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Temple de Jupiter" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="temple">Temple</SelectItem>
                        <SelectItem value="basilica">Basilique</SelectItem>
                        <SelectItem value="forum">Forum</SelectItem>
                        <SelectItem value="market">Marché</SelectItem>
                        <SelectItem value="aqueduct">Aqueduc</SelectItem>
                        <SelectItem value="theater">Théâtre</SelectItem>
                        <SelectItem value="amphitheater">Amphithéâtre</SelectItem>
                        <SelectItem value="circus">Cirque</SelectItem>
                        <SelectItem value="bath">Thermes</SelectItem>
                        <SelectItem value="bridge">Pont</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="road">Route</SelectItem>
                        <SelectItem value="port">Port</SelectItem>
                        <SelectItem value="warehouse">Entrepôt</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emplacement</FormLabel>
                    <FormControl>
                      <Input placeholder="Forum Romanum" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>État</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un état" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="good">Bon état</SelectItem>
                        <SelectItem value="average">État moyen</SelectItem>
                        <SelectItem value="poor">Mauvais état</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="constructionYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Année de construction</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))} 
                      />
                    </FormControl>
                    <FormDescription>
                      AUC
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coût de construction</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))} 
                      />
                    </FormControl>
                    <FormDescription>
                      Deniers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Propriétaire</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un propriétaire" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="république">République</SelectItem>
                        <SelectItem value="sénat">Sénat</SelectItem>
                        <SelectItem value="censeur">Censeur</SelectItem>
                        <SelectItem value="édile">Édile</SelectItem>
                        <SelectItem value="private">Privé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="maintenanceCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coût d'entretien</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))} 
                      />
                    </FormControl>
                    <FormDescription>
                      Deniers par saison
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="revenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Revenus</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))} 
                      />
                    </FormControl>
                    <FormDescription>
                      Deniers par saison
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacité</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))} 
                      />
                    </FormControl>
                    <FormDescription>
                      Personnes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description du bâtiment et de son importance pour Rome"
                      className="resize-none h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">
                {building ? "Mettre à jour" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
