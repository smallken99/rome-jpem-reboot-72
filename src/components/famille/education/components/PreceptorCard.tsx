
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Preceptor } from '../types/educationTypes';
import { Info, Check, X, Medal } from 'lucide-react';

interface PreceptorCardProps {
  preceptor: Preceptor;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onHire?: (id: string) => void;
  onFire?: (id: string) => void;
  onAssign?: (id: string) => void;
  viewOnly?: boolean;
}

export const PreceptorCard: React.FC<PreceptorCardProps> = ({
  preceptor,
  isSelected = false,
  onSelect,
  onHire,
  onFire,
  onAssign,
  viewOnly = false
}) => {
  // Quality star display
  const qualityStars = () => {
    const quality = preceptor.quality || 3;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Medal 
            key={index}
            className={`h-4 w-4 ${index < quality ? 'text-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const handleClick = () => {
    if (onSelect && !viewOnly) {
      onSelect(preceptor.id);
    }
  };

  return (
    <Card 
      className={`transition-all hover:shadow-md ${isSelected ? 'border-primary ring-1 ring-primary' : ''}`}
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{preceptor.name}</CardTitle>
          <Badge variant={preceptor.available ? 'outline' : 'secondary'}>
            {preceptor.available ? 'Disponible' : 'Engagé'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Spécialité:</span>
            <p className="capitalize">{preceptor.specialty || preceptor.speciality}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Coût:</span>
            <p>{preceptor.cost || preceptor.price} as/an</p>
          </div>
          <div>
            <span className="text-muted-foreground">Qualité:</span>
            <div>{qualityStars()}</div>
          </div>
        </div>
        
        {preceptor.description && (
          <p className="text-sm text-muted-foreground italic">{preceptor.description}</p>
        )}
        
        {!viewOnly && (
          <div className="flex justify-end space-x-2 pt-2">
            {preceptor.available && onHire && (
              <Button size="sm" onClick={(e) => {
                e.stopPropagation();
                onHire(preceptor.id);
              }}>
                <Check className="mr-1 h-4 w-4" />
                Embaucher
              </Button>
            )}
            
            {!preceptor.available && onFire && (
              <Button size="sm" variant="outline" onClick={(e) => {
                e.stopPropagation();
                onFire(preceptor.id);
              }}>
                <X className="mr-1 h-4 w-4" />
                Licencier
              </Button>
            )}
            
            {!preceptor.available && onAssign && (
              <Button size="sm" variant="secondary" onClick={(e) => {
                e.stopPropagation();
                onAssign(preceptor.id);
              }}>
                <Info className="mr-1 h-4 w-4" />
                Assigner
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
