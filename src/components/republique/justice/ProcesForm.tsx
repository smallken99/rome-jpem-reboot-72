
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from "date-fns";
import { fr } from 'date-fns/locale';

interface ProcesFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export const ProcesForm: React.FC<ProcesFormProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    titre: '',
    demandeur: '',
    accuse: '',
    type: 'civil',
    description: '',
    date: new Date(),
  });
  
  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = () => {
    // Validation simple
    if (!formData.titre || !formData.demandeur || !formData.accuse || !formData.type) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Format the date for ancient Rome
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = formData.date.toLocaleDateString('fr-FR', options).replace(/ ([0-9]{4})$/, ' $1 av. J.-C.');
    
    const newProces = {
      ...formData,
      id: Math.random().toString(36).substring(2, 9),
      statut: 'En attente',
      date: formattedDate
    };
    
    onSubmit(newProces);
    toast.success("Procès enregistré avec succès");
    
    // Reset form
    setFormData({
      titre: '',
      demandeur: '',
      accuse: '',
      type: 'civil',
      description: '',
      date: new Date(),
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">Enregistrer un nouveau procès</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour ouvrir une nouvelle procédure judiciaire.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="titre">Titre du procès</Label>
            <Input
              id="titre"
              placeholder="Ex: Dispute sur les terres de Campanie"
              value={formData.titre}
              onChange={(e) => handleChange('titre', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="demandeur">Demandeur</Label>
              <Input
                id="demandeur"
                placeholder="Nom du plaignant"
                value={formData.demandeur}
                onChange={(e) => handleChange('demandeur', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="accuse">Accusé</Label>
              <Input
                id="accuse"
                placeholder="Nom de l'accusé"
                value={formData.accuse}
                onChange={(e) => handleChange('accuse', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type de procès</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Civil</SelectItem>
                  <SelectItem value="criminel">Criminel</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="politique">Politique</SelectItem>
                  <SelectItem value="religieux">Religieux</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Date d'audience</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-left font-normal justify-start"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? (
                      format(formData.date, "d MMMM yyyy", { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleChange('date', date || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="description">Description du litige</Label>
            <Textarea
              id="description"
              placeholder="Détails du litige, nature de l'accusation..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            Enregistrer le procès
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
