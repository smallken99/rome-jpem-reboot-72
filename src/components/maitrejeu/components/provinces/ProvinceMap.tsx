
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ProvinceMap: React.FC = () => {
  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>Carte des provinces</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Carte interactive des provinces à implémenter</p>
      </CardContent>
    </Card>
  );
};
