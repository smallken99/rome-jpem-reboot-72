
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Preceptor } from '../types/educationTypes';

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
      <Card className="p-4 text-center">
        <p className="text-muted-foreground">Aucun précepteur disponible pour ce type d'éducation.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {preceptors.map((preceptor) => (
        <Card 
          key={preceptor.id} 
          className={`p-4 border-2 ${
            selectedPreceptorId === preceptor.id ? 'border-rome-gold' : 'border-gray-200'
          } hover:border-rome-gold/60 transition-all cursor-pointer`}
          onClick={() => onSelectPreceptor(preceptor.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{preceptor.name}</h4>
              <p className="text-sm text-muted-foreground">
                Spécialité : {preceptor.specialty || preceptor.speciality}
              </p>
              
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div>
                  <span className="text-muted-foreground">Qualité :</span>{' '}
                  <span className="font-medium">{preceptor.quality}/100</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Expérience :</span>{' '}
                  <span className="font-medium">{preceptor.experience} ans</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Coût :</span>{' '}
                  <span className="font-medium">{preceptor.price} as/an</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="roman-btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onHirePreceptor(preceptor.id);
              }}
            >
              Engager
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
