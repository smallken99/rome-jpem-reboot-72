
import React from 'react';
import { MembreFamille } from '../../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface FamilleMembresTabContentProps {
  membres: MembreFamille[];
  onEditMembre: (membre: MembreFamille) => void;
  onDeleteMembre: (id: string) => void;
}

export const FamilleMembresTabContent: React.FC<FamilleMembresTabContentProps> = ({
  membres,
  onEditMembre,
  onDeleteMembre
}) => {
  return (
    <div className="space-y-4">
      {membres.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Cette famille n'a pas encore de membres</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {membres.map(membre => (
            <Card key={membre.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={membre.portrait} alt={`${membre.prenom} ${membre.nom}`} />
                      <AvatarFallback>
                        {membre.prenom[0]}{membre.nom[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{membre.prenom} {membre.nom}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{membre.age} ans</span>
                        <span>•</span>
                        <span>{membre.genre === 'male' ? 'Homme' : 'Femme'}</span>
                      </div>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge variant="outline">{membre.role}</Badge>
                        <Badge variant="secondary">{membre.statutMatrimonial}</Badge>
                        {membre.joueur && <Badge className="bg-green-500">Joueur</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost" onClick={() => onEditMembre(membre)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" className="text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce membre ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action est irréversible. Le membre sera définitivement supprimé de la famille.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => onDeleteMembre(membre.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Éducation</div>
                      <div className="text-sm">{membre.education}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Statut</div>
                      <div className="text-sm">{membre.statut}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Popularité</div>
                      <div className="text-sm">{membre.popularite}/100</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Piété</div>
                      <div className="text-sm">{membre.piete}/100</div>
                    </div>
                  </div>
                </div>
                
                {membre.description && (
                  <div className="mt-3 pt-3 border-t text-sm">
                    <div className="text-muted-foreground mb-1">Description</div>
                    <p className="text-sm line-clamp-2">{membre.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
