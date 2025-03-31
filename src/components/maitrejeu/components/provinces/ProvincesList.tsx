
import React from 'react';
import { useMaitreJeu } from '../../context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ProvincesList: React.FC<{
  onSelectProvince: (provinceId: string) => void;
  onAddProvince: () => void;
}> = ({ onSelectProvince, onAddProvince }) => {
  const { provinces } = useMaitreJeu();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Liste des provinces</CardTitle>
        <Button onClick={onAddProvince} size="sm">Ajouter</Button>
      </CardHeader>
      <CardContent>
        {provinces.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Aucune province</p>
        ) : (
          <ul className="space-y-2">
            {provinces.map(province => (
              <li 
                key={province.id}
                className="p-2 border rounded cursor-pointer hover:bg-muted transition-colors"
                onClick={() => onSelectProvince(province.id)}
              >
                <div className="font-medium">{province.name}</div>
                <div className="text-sm text-muted-foreground">{province.governor || 'Sans gouverneur'}</div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
