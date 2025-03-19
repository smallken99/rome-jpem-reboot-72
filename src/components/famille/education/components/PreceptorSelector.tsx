
import React from 'react';
import { Preceptor } from '../types/educationTypes';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { InfoIcon, Star } from 'lucide-react';

interface PreceptorSelectorProps {
  preceptors: Preceptor[];
  selectedPreceptorId: string | null;
  onSelectPreceptor: (preceptorId: string) => void;
  onHirePreceptor: (preceptorId: string) => void;
}

export const PreceptorSelector: React.FC<PreceptorSelectorProps> = ({
  preceptors,
  selectedPreceptorId,
  onSelectPreceptor,
  onHirePreceptor
}) => {
  if (!preceptors || preceptors.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border rounded-md">
        <div className="flex items-center gap-2 text-gray-600">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <p>Aucun précepteur disponible pour ce type d'éducation. Vous pouvez en recruter de nouveaux dans l'onglet Précepteurs.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Sélectionnez un précepteur</h3>
      
      <RadioGroup 
        value={selectedPreceptorId || ''} 
        onValueChange={onSelectPreceptor}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {preceptors.map((preceptor) => (
          <div key={preceptor.id} className="relative">
            <RadioGroupItem 
              value={preceptor.id} 
              id={`preceptor-${preceptor.id}`} 
              className="sr-only peer"
            />
            <Label 
              htmlFor={`preceptor-${preceptor.id}`} 
              className="cursor-pointer block h-full peer-checked:ring-2 peer-checked:ring-blue-500 rounded-lg overflow-hidden"
            >
              <Card className="h-full border-2 hover:border-blue-200 transition-colors">
                <CardHeader className="pb-2 pt-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{preceptor.name}</h4>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.floor(preceptor.quality / 20)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Spécialité:</span>
                      <span className="font-medium">{preceptor.specialty || preceptor.speciality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expérience:</span>
                      <span className="font-medium">{preceptor.experience} ans</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coût annuel:</span>
                      <span className="font-medium">{preceptor.price} as</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onHirePreceptor(preceptor.id);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Engager
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
