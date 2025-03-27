
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Preceptor } from '../types/educationTypes';

interface PreceptorCardProps {
  preceptor: Preceptor;
  hired?: boolean;
  onSelect: () => void;
  onDismiss?: () => void;
}

export const PreceptorCard: React.FC<PreceptorCardProps> = ({
  preceptor,
  hired = false,
  onSelect,
  onDismiss
}) => {
  // Fonction pour déterminer la couleur du badge selon la qualité
  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'bg-green-100 text-green-800';
    if (quality >= 6) return 'bg-blue-100 text-blue-800';
    if (quality >= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  // Fonction pour convertir la qualité en texte
  const getQualityText = (quality: number) => {
    if (quality >= 8) return 'Excellent';
    if (quality >= 6) return 'Bon';
    if (quality >= 4) return 'Moyen';
    return 'Basique';
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{preceptor.name}</h3>
            <p className="text-sm text-muted-foreground">
              Spécialiste en {preceptor.specialty}
            </p>
          </div>
          <Badge className={getQualityColor(preceptor.quality)}>
            {getQualityText(preceptor.quality)}
          </Badge>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Expérience:</span>
            <span>{preceptor.experience} ans</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Coût annuel:</span>
            <span>{preceptor.price} deniers</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4 flex justify-between">
        {hired ? (
          <>
            <Badge>Embauché</Badge>
            {onDismiss && (
              <Button variant="outline" size="sm" onClick={onDismiss}>
                Renvoyer
              </Button>
            )}
          </>
        ) : (
          <Button className="w-full" size="sm" onClick={onSelect}>
            Embaucher ce précepteur
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
