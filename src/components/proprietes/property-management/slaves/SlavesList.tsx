
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: string;
  skills?: string[];
  origin?: string;
  status: string;
  health?: number;
  loyalty?: number;
  productivity?: number;
  acquired: Date | string;
  value: number;
}

interface SlavesListProps {
  slaves: Slave[];
  onDeleteSlave: (id: string) => void;
}

export const SlavesList: React.FC<SlavesListProps> = ({ slaves, onDeleteSlave }) => {
  if (!slaves || slaves.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Esclaves</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Aucun esclave disponible</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des esclaves</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {slaves.map(slave => (
            <div 
              key={slave.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{slave.name?.[0]?.toUpperCase() || 'S'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{slave.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {slave.age} ans • {slave.origin || 'Origine inconnue'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">{slave.value} as</p>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onDeleteSlave(slave.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
