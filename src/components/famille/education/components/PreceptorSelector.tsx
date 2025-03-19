
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Preceptor } from '../types/educationTypes';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { formatMoney } from '@/utils/formatUtils';

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
  if (preceptors.length === 0) {
    return (
      <div className="text-muted-foreground italic">
        Aucun précepteur disponible pour ce type d'éducation.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sélectionner un précepteur</h3>
      
      <RadioGroup 
        value={selectedPreceptorId || undefined} 
        onValueChange={onSelectPreceptor}
      >
        <div className="grid grid-cols-1 gap-4">
          {preceptors.map((preceptor) => (
            <Card key={preceptor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 flex items-start gap-4">
                  <RadioGroupItem value={preceptor.id} id={preceptor.id} />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <Label htmlFor={preceptor.id} className="font-medium cursor-pointer">
                        {preceptor.name}
                      </Label>
                      <div className="text-sm font-medium">
                        {formatMoney(preceptor.price || preceptor.cost || 0)}/an
                      </div>
                    </div>
                    
                    <div className="mt-1 text-sm">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-muted-foreground">Spécialité:</span> {preceptor.specialty}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Qualité:</span> {preceptor.quality}/5
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-muted-foreground">Expérience:</span> {preceptor.experience} ans
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t p-2 flex justify-end">
                  <Button 
                    size="sm" 
                    onClick={() => onHirePreceptor(preceptor.id)}
                    disabled={!selectedPreceptorId || selectedPreceptorId !== preceptor.id}
                  >
                    Engager ce précepteur
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
