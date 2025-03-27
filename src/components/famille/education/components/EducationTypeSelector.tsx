
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EducationTypeSelectorProps, Gender } from '../types/educationTypes';

export const EducationTypeSelector: React.FC<EducationTypeSelectorProps> = ({ 
  selectedType, 
  onChange,
  childGender
}) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Type d'Éducation</Label>
      
      <RadioGroup value={selectedType} onValueChange={onChange} className="space-y-4">
        <Card className={`border-2 ${selectedType === 'none' ? 'border-primary' : 'border-transparent'}`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="none" id="education-none" />
              <div className="grid gap-1.5">
                <Label htmlFor="education-none" className="font-medium">
                  Aucune éducation formelle
                </Label>
                <p className="text-sm text-muted-foreground">
                  L'enfant apprendra par lui-même au sein de la maison familiale.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <ScrollArea className="h-96 rounded-md border">
          <div className="space-y-4 p-4">
            <Card className={`border-2 ${selectedType === 'rhetoric' ? 'border-primary' : 'border-transparent'}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="rhetoric" id="education-rhetoric" />
                  <div className="grid gap-1.5">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="education-rhetoric" className="font-medium">
                        Rhétorique et Éloquence
                      </Label>
                      <Badge variant="outline">Politique</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Formation à l'art oratoire, essentiel pour une carrière politique.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`border-2 ${selectedType === 'military' ? 'border-primary' : 'border-transparent'} ${childGender === 'female' ? 'opacity-50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem 
                    value="military" 
                    id="education-military" 
                    disabled={childGender === 'female'}
                  />
                  <div className="grid gap-1.5">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="education-military" className="font-medium">
                        Art Militaire
                      </Label>
                      <Badge variant="outline">Combat</Badge>
                      {childGender === 'female' && <Badge variant="destructive">Non disponible</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Formation aux tactiques militaires et à l'art de la guerre.
                      {childGender === 'female' && " (Réservé aux hommes dans la société romaine)"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`border-2 ${selectedType === 'religious' ? 'border-primary' : 'border-transparent'}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="religious" id="education-religious" />
                  <div className="grid gap-1.5">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="education-religious" className="font-medium">
                        Éducation Religieuse
                      </Label>
                      <Badge variant="outline">Spirituel</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Formation aux rites religieux et aux traditions divines de Rome.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`border-2 ${selectedType === 'academic' ? 'border-primary' : 'border-transparent'}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="academic" id="education-academic" />
                  <div className="grid gap-1.5">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="education-academic" className="font-medium">
                        Éducation Académique
                      </Label>
                      <Badge variant="outline">Savant</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Études de la philosophie, des mathématiques, de l'histoire et de la littérature.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`border-2 ${selectedType === 'political' ? 'border-primary' : 'border-transparent'}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="political" id="education-political" />
                  <div className="grid gap-1.5">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="education-political" className="font-medium">
                        Formation Politique
                      </Label>
                      <Badge variant="outline">Gouvernance</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Apprentissage des rouages du Sénat et du cursus honorum.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </RadioGroup>
    </div>
  );
};
