
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRegistration } from '@/context/RegistrationContext';
import { ScrollText } from 'lucide-react';

export const GensCreationForm: React.FC = () => {
  const { registrationData, updateRegistrationData } = useRegistration();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateRegistrationData({
      gens: {
        ...registrationData.gens,
        [name]: value,
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-cinzel text-rome-navy">Gens Romana</h2>
        <p className="text-muted-foreground mt-1">
          Choisissez le nom et la devise de votre famille noble romaine
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gens-name">Nom de la Gens</Label>
          <Input
            id="gens-name"
            name="name"
            value={registrationData.gens.name}
            onChange={handleInputChange}
            placeholder="Gens Aurelia, Gens Julia, Gens Cornelia..."
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gens-motto">Devise familiale</Label>
          <Textarea
            id="gens-motto"
            name="motto"
            value={registrationData.gens.motto || ''}
            onChange={handleInputChange}
            placeholder="Ex: Virtus et Honor (Vertu et Honneur)"
            className="resize-none"
          />
        </div>
      </div>
      
      <div className="flex items-start p-4 bg-rome-parchment/50 rounded-md border border-amber-200">
        <ScrollText className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm">
          <p className="text-amber-800 font-medium">La Gens romaine</p>
          <p className="text-amber-700 mt-1">
            Dans la Rome antique, la Gens est un groupe de familles partageant le même nom (nomen) et prétendant descendre d'un ancêtre commun. 
            C'est l'unité fondamentale de la société patricienne romaine, divisée en plusieurs branches familiales.
          </p>
        </div>
      </div>
    </div>
  );
};
