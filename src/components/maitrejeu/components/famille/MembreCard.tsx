
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Scroll, Shield, User, Heart, Edit, Trash } from 'lucide-react';
import { MembreFamille } from '../../types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MembreCardProps {
  membre: MembreFamille;
  isChef?: boolean;
  isMatrone?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MembreCard: React.FC<MembreCardProps> = ({
  membre,
  isChef = false,
  isMatrone = false,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={membre.portrait} alt={membre.prenom} />
              <AvatarFallback>{membre.prenom.charAt(0)}{membre.nom.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-lg font-bold">{membre.prenom} {membre.nom}</h3>
              <p className="text-sm text-muted-foreground">{membre.role || 'Membre de la famille'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isChef && (
              <Badge variant="default" className="bg-blue-500">
                Chef
              </Badge>
            )}
            {isMatrone && (
              <Badge variant="default" className="bg-purple-500">
                Matrone
              </Badge>
            )}
            <Badge variant={membre.statut === 'Patricien' ? 'default' : 'secondary'}>
              {membre.statut}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Âge</span>
            <span>{membre.age} ans</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Genre</span>
            <span>{membre.genre === 'male' ? 'Homme' : 'Femme'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Éducation</span>
            <span>{membre.education || 'Non spécifiée'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Statut matrimonial</span>
            <span>{membre.statutMatrimonial}</span>
          </div>
        </div>
        
        {(membre.popularite !== undefined || membre.piete !== undefined) && (
          <div className="mt-4 space-y-2">
            {membre.popularite !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Popularité
                  </span>
                  <span className="text-xs">{membre.popularite}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-yellow-500 rounded-full h-1.5" 
                    style={{ width: `${membre.popularite}%` }}
                  />
                </div>
              </div>
            )}
            
            {membre.piete !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center text-xs">
                    <Scroll className="h-3 w-3 mr-1" />
                    Piété
                  </span>
                  <span className="text-xs">{membre.piete}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 rounded-full h-1.5" 
                    style={{ width: `${membre.piete}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 bg-gray-50 flex justify-between">
        <div className="flex items-center gap-2">
          {membre.senateurId && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Sénateur</span>
            </Badge>
          )}
          {membre.joueur && (
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
              <User className="h-3 w-3" />
              <span>Joueur</span>
            </Badge>
          )}
        </div>
        
        <div className="flex space-x-2">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          )}
          
          {onDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700"
              onClick={onDelete}
            >
              <Trash className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
