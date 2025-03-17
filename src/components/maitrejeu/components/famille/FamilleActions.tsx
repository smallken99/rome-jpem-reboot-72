
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserPlus, Users, Handshake, Network } from 'lucide-react';

interface FamilleActionsProps {
  onCreateFamille: () => void;
  onCreateMembre: () => void;
  onCreateAlliance: () => void;
  onManageRelations: () => void;
}

export const FamilleActions: React.FC<FamilleActionsProps> = ({
  onCreateFamille,
  onCreateMembre,
  onCreateAlliance,
  onManageRelations
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Actions</CardTitle>
          <CardDescription>
            Gérer les familles et leurs relations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full flex items-center justify-start" 
            onClick={onCreateFamille}
          >
            <Users className="mr-2 h-4 w-4" />
            Créer une famille
          </Button>
          
          <Button 
            className="w-full flex items-center justify-start" 
            onClick={onCreateMembre}
            variant="outline"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un membre
          </Button>
          
          <Button 
            className="w-full flex items-center justify-start" 
            onClick={onCreateAlliance}
            variant="outline"
          >
            <Handshake className="mr-2 h-4 w-4" />
            Créer une alliance
          </Button>
          
          <Button 
            className="w-full flex items-center justify-start" 
            onClick={onManageRelations}
            variant="outline"
          >
            <Network className="mr-2 h-4 w-4" />
            Voir les relations
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Rappels</CardTitle>
          <CardDescription>
            Points importants sur les familles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[180px]">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Familles Patriciennes</h4>
                <p className="text-sm text-muted-foreground">
                  Les familles patriciennes sont les plus anciennes et les plus prestigieuses de Rome. 
                  Elles ont accès exclusif à certaines magistratures.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Familles Plébéiennes</h4>
                <p className="text-sm text-muted-foreground">
                  Issues de la plèbe, ces familles ont gagné en influence au fil des siècles. 
                  Elles peuvent accéder à la plupart des magistratures, mais avec certaines limitations.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Alliances</h4>
                <p className="text-sm text-muted-foreground">
                  Les alliances entre familles sont essentielles pour renforcer votre position 
                  politique et votre influence dans la République.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Mariages</h4>
                <p className="text-sm text-muted-foreground">
                  Les mariages sont un moyen privilégié de créer des alliances durables 
                  entre familles et d'assurer la continuité des lignées.
                </p>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
