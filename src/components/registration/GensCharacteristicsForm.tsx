
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRegistration } from '@/context/RegistrationContext';
import { GensOrigin, FamilyPhilosophy } from '@/types/registration';
import { Coins, Flag, Award } from 'lucide-react';

export const GensCharacteristicsForm: React.FC = () => {
  const { registrationData, updateRegistrationData } = useRegistration();
  
  const handleOriginChange = (value: GensOrigin) => {
    updateRegistrationData({
      gens: {
        ...registrationData.gens,
        origin: value,
      }
    });
  };
  
  const handlePhilosophyChange = (value: FamilyPhilosophy) => {
    updateRegistrationData({
      gens: {
        ...registrationData.gens,
        philosophy: value,
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-cinzel text-rome-navy">Caractéristiques de la Gens</h2>
        <p className="text-muted-foreground mt-1">
          Définissez l'origine et la philosophie de votre famille
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-rome-gold" />
            <Label className="text-lg font-cinzel text-rome-navy">Origine de la famille</Label>
          </div>
          
          <RadioGroup 
            value={registrationData.gens.origin} 
            onValueChange={(value) => handleOriginChange(value as GensOrigin)}
            className="grid gap-4 grid-cols-1 md:grid-cols-3"
          >
            <div className={`border rounded-md p-4 ${registrationData.gens.origin === 'aristocrate' ? 'border-rome-gold bg-rome-gold/5' : 'border-border'}`}>
              <RadioGroupItem value="aristocrate" id="aristocrate" className="sr-only" />
              <Label htmlFor="aristocrate" className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">Famille Aristocrate</span>
                <span className="text-sm text-muted-foreground">
                  Vieille famille patricienne avec des liens anciens au Sénat
                </span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-green-600">+75 000 as</div>
                  <div className="text-red-600">-5 en Popularité</div>
                </div>
              </Label>
            </div>
            
            <div className={`border rounded-md p-4 ${registrationData.gens.origin === 'agricole' ? 'border-rome-gold bg-rome-gold/5' : 'border-border'}`}>
              <RadioGroupItem value="agricole" id="agricole" className="sr-only" />
              <Label htmlFor="agricole" className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">Famille Agricole</span>
                <span className="text-sm text-muted-foreground">
                  Famille enrichie par l'exploitation de terres
                </span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-yellow-600">Domaine céréalier moyen</div>
                  <div className="text-red-600">-5 en Piété</div>
                </div>
              </Label>
            </div>
            
            <div className={`border rounded-md p-4 ${registrationData.gens.origin === 'populaire' ? 'border-rome-gold bg-rome-gold/5' : 'border-border'}`}>
              <RadioGroupItem value="populaire" id="populaire" className="sr-only" />
              <Label htmlFor="populaire" className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">Famille Populaire</span>
                <span className="text-sm text-muted-foreground">
                  Nouveaux riches proches du peuple et des commerçants
                </span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-green-600">+10 en Popularité</div>
                  <div className="text-red-600">-5 en Réputation de Gens</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-rome-terracotta" />
            <Label className="text-lg font-cinzel text-rome-navy">Philosophie de la famille</Label>
          </div>
          
          <RadioGroup 
            value={registrationData.gens.philosophy} 
            onValueChange={(value) => handlePhilosophyChange(value as FamilyPhilosophy)}
            className="grid gap-4 grid-cols-1 md:grid-cols-3"
          >
            <div className={`border rounded-md p-4 ${registrationData.gens.philosophy === 'traditionaliste' ? 'border-rome-gold bg-rome-gold/5' : 'border-border'}`}>
              <RadioGroupItem value="traditionaliste" id="traditionaliste" className="sr-only" />
              <Label htmlFor="traditionaliste" className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">Traditionaliste</span>
                <span className="text-sm text-muted-foreground">
                  Attachée aux valeurs anciennes et aux coutumes romaines
                </span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-green-600">+10 en Réputation de Gens</div>
                  <div className="text-red-600">-5 en Éloquence</div>
                </div>
              </Label>
            </div>
            
            <div className={`border rounded-md p-4 ${registrationData.gens.philosophy === 'pragmatique' ? 'border-rome-gold bg-rome-gold/5' : 'border-border'}`}>
              <RadioGroupItem value="pragmatique" id="pragmatique" className="sr-only" />
              <Label htmlFor="pragmatique" className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">Pragmatique</span>
                <span className="text-sm text-muted-foreground">
                  Adaptable et prête à accepter certaines modernités
                </span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-green-600">+10 en Éloquence</div>
                  <div className="text-red-600">-5 en Éducation Militaire</div>
                </div>
              </Label>
            </div>
            
            <div className={`border rounded-md p-4 ${registrationData.gens.philosophy === 'opportuniste' ? 'border-rome-gold bg-rome-gold/5' : 'border-border'}`}>
              <RadioGroupItem value="opportuniste" id="opportuniste" className="sr-only" />
              <Label htmlFor="opportuniste" className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">Opportuniste</span>
                <span className="text-sm text-muted-foreground">
                  Profite de chaque situation à son avantage
                </span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-green-600">+10 en Popularité</div>
                  <div className="text-red-600">-5 en Réputation de Gens</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
