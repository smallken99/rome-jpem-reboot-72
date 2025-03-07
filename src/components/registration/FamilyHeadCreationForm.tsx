
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useRegistration } from '@/context/RegistrationContext';
import { FamilyHeadEducation } from '@/context/RegistrationContext';
import { User, GraduationCap, BookOpen, ShieldCheck } from 'lucide-react';

export const FamilyHeadCreationForm: React.FC = () => {
  const { registrationData, updateRegistrationData } = useRegistration();
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRegistrationData({
      familyHead: {
        ...registrationData.familyHead,
        name: e.target.value,
      }
    });
  };
  
  const handleAgeChange = (value: number[]) => {
    updateRegistrationData({
      familyHead: {
        ...registrationData.familyHead,
        age: value[0],
      }
    });
  };
  
  const handleEducationChange = (value: FamilyHeadEducation) => {
    updateRegistrationData({
      headEducation: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-cinzel text-rome-navy">Chef de Famille</h2>
        <p className="text-muted-foreground mt-1">
          Créez votre pater familias, le chef de votre Gens
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-rome-navy" />
            <Label className="text-lg font-cinzel text-rome-navy">Identité</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="character-name">Nom complet</Label>
            <Input
              id="character-name"
              value={registrationData.familyHead.name || ''}
              onChange={handleNameChange}
              placeholder="Marcus Aurelius Rufus"
              required
            />
            <p className="text-xs text-muted-foreground">
              Format romain : Praenomen (prénom) + Nomen (nom de Gens) + Cognomen (surnom)
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="character-age">Âge</Label>
              <span className="text-sm text-muted-foreground">{registrationData.familyHead.age} ans</span>
            </div>
            <Slider
              id="character-age"
              value={[registrationData.familyHead.age || 35]}
              min={30}
              max={50}
              step={1}
              onValueChange={handleAgeChange}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-rome-navy" />
            <Label className="text-lg font-cinzel text-rome-navy">Éducation</Label>
          </div>
          
          <RadioGroup 
            value={registrationData.headEducation} 
            onValueChange={(value) => handleEducationChange(value as FamilyHeadEducation)}
            className="grid gap-4 grid-cols-1 md:grid-cols-3"
          >
            <div className={`border rounded-md p-4 ${registrationData.headEducation === 'rome' ? 'border-rome-gold bg-rome-gold/5' : 'border-border'}`}>
              <RadioGroupItem value="rome" id="rome" className="sr-only" />
              <Label htmlFor="rome" className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">Éduqué à Rome</span>
                <span className="text-sm text-muted-foreground">
                  Formation par les meilleurs rhéteurs de Rome
                </span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-green-600">+10 en Éloquence</div>
                  <div className="text-red-600">-20 000 as</div>
                </div>
              </Label>
            </div>
            
            <div className={`border rounded-md p-4 ${registrationData.headEducation === 'armee' ? 'border-rome-gold bg-rome-gold/5' : 'border-border'}`}>
              <RadioGroupItem value="armee" id="armee" className="sr-only" />
              <Label htmlFor="armee" className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">Éduqué à l'armée</span>
                <span className="text-sm text-muted-foreground">
                  Formation militaire auprès des légions
                </span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-green-600">+10 en Éducation Militaire</div>
                  <div className="text-red-600">-5 en Éloquence</div>
                </div>
              </Label>
            </div>
            
            <div className={`border rounded-md p-4 ${registrationData.headEducation === 'religieux' ? 'border-rome-gold bg-rome-gold/5' : 'border-border'}`}>
              <RadioGroupItem value="religieux" id="religieux" className="sr-only" />
              <Label htmlFor="religieux" className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">Éduqué par des religieux</span>
                <span className="text-sm text-muted-foreground">
                  Formation par les prêtres et augures
                </span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-green-600">+10 en Piété</div>
                  <div className="text-red-600">-5 en Popularité</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-rome-navy" />
            <Label className="text-lg font-cinzel text-rome-navy">Caractéristiques</Label>
          </div>
          
          <div className="space-y-4 p-4 bg-white border border-muted rounded-md">
            {registrationData.familyHead.stats && Object.entries(registrationData.familyHead.stats).map(([key, stat]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">{stat.name}</Label>
                  <span className="text-sm text-muted-foreground">{stat.value}/{stat.maxValue}</span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stat.color}`} 
                    style={{ width: `${(stat.value / stat.maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            
            <p className="text-xs text-muted-foreground mt-2">
              Ces valeurs sont ajustées automatiquement en fonction de vos choix précédents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
