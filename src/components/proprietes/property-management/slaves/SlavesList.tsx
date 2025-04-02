
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, User, Map, Heart, Shield } from 'lucide-react';
import { Slave } from '@/components/proprietes/types/slave';

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
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <User className="h-3 w-3" /> {slave.age} ans, {slave.gender === 'male' ? 'H' : 'F'}
                    <span className="mx-1">•</span>
                    <Map className="h-3 w-3" /> {slave.origin}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Heart className="h-3 w-3" /> Santé: {slave.health}
                    <span className="mx-1">•</span>
                    <Shield className="h-3 w-3" /> Loyauté: {slave.loyalty}
                  </div>
                  {slave.assigned && (
                    <div className="text-xs text-blue-600 mt-1">
                      Assigné à: {slave.assignedTo || "Bâtiment"}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">{slave.value || slave.price} as</p>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onDeleteSlave(slave.id)}
                  disabled={slave.assigned}
                  title={slave.assigned ? "Impossible de vendre un esclave assigné" : "Vendre l'esclave"}
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
