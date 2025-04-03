
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Preceptor } from './types/educationTypes';
import { Badge } from '@/components/ui/badge';
import { User, UserX, Gem } from 'lucide-react';
import { toast } from 'sonner';

interface PreceptorsListProps {
  preceptors: Preceptor[];
}

export const PreceptorsList: React.FC<PreceptorsListProps> = ({ 
  preceptors 
}) => {
  const handleFirePreceptor = (id: string) => {
    // Dans une implémentation réelle, ceci renverrait le précepteur
    toast.success("Précepteur renvoyé");
  };
  
  const handleHirePreceptor = () => {
    // Implémentation réelle: ouvrir une modal pour embaucher
    toast.info("Fonctionnalité à venir: embauche de précepteurs");
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Précepteurs disponibles</h2>
        <Button onClick={handleHirePreceptor} className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Embaucher</span>
        </Button>
      </div>
      
      {preceptors.length > 0 ? (
        preceptors.map(preceptor => (
          <Card key={preceptor.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold">{preceptor.name}</h3>
                    <Badge
                      variant={preceptor.status === 'assigned' ? 'default' : 'outline'}
                      className="ml-2 text-xs"
                    >
                      {preceptor.status === 'assigned' ? 'Assigné' : 'Disponible'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Spécialité: {preceptor.specialty || 'Aucune'}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <Gem className="h-4 w-4 text-blue-500 mr-2" />
                  <div>
                    <span className="text-sm font-medium">Qualité d'enseignement</span>
                    <p className="text-lg font-bold">{preceptor.quality}/100</p>
                  </div>
                </div>
                
                <div className="md:text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFirePreceptor(preceptor.id)}
                    className="flex items-center gap-1 text-destructive hover:text-destructive"
                  >
                    <UserX className="h-4 w-4" />
                    <span>Renvoyer</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center p-6 text-muted-foreground">
          <p>Aucun précepteur embauché</p>
          <p className="text-sm">Embauchez des précepteurs pour améliorer l'éducation de vos enfants</p>
        </div>
      )}
    </div>
  );
};
