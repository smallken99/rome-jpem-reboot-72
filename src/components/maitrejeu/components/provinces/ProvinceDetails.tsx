
import React from 'react';
import { useMaitreJeu } from '../../context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ProvinceDetails: React.FC<{
  provinceId: string | null;
  onClose: () => void;
}> = ({ provinceId, onClose }) => {
  const { provinces } = useMaitreJeu();
  
  const province = provinceId ? provinces.find(p => p.id === provinceId) : null;
  
  if (!province) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{province.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Gouverneur</h3>
            <p>{province.governor || 'Sans gouverneur'}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Statut</h3>
            <p>{province.status}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Population</h3>
            <p>{province.population?.toLocaleString() || 'Inconnue'}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Ressources</h3>
            <p>{province.resources?.join(', ') || 'Aucune'}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Description</h3>
            <p>{province.description || 'Aucune description'}</p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            Fermer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
