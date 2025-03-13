
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SenateurJouable } from '../types/senateurs';
import { Edit, Trash2, UserCheck } from 'lucide-react';
import { SenateurInfluenceBar } from './republique/SenateurInfluenceBar';

interface SenateurCardProps {
  senateur: SenateurJouable;
  onEdit?: () => void;
  onDelete?: () => void;
  onAssign?: () => void;
  showAssignButton?: boolean;
}

const SenateurCard: React.FC<SenateurCardProps> = ({ 
  senateur, 
  onEdit, 
  onDelete, 
  onAssign,
  showAssignButton = false
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div>
          <h3 className="text-lg font-bold">{senateur.prenom} {senateur.nom}</h3>
          <p className="text-sm text-muted-foreground">
            {senateur.gens} • {senateur.age} ans
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="py-2 flex-grow">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Faction:</span>
            <span className="font-medium">{senateur.appartenance || "Neutre"}</span>
          </div>
          
          {senateur.fonction && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Fonction:</span>
              <span className="font-medium">{senateur.fonction}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Richesse:</span>
            <span className="font-medium">{senateur.richesse.toLocaleString()} as</span>
          </div>
          
          <div className="space-y-2">
            <SenateurInfluenceBar value={senateur.influence} label="Influence" />
            <SenateurInfluenceBar value={senateur.popularite || 0} label="Popularité" />
            <SenateurInfluenceBar value={senateur.militaire || 0} label="Militaire" />
            <SenateurInfluenceBar value={senateur.piete || 0} label="Piété" />
            <SenateurInfluenceBar value={senateur.eloquence || 0} label="Éloquence" />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
              <Edit className="h-4 w-4 mr-1" /> Modifier
            </Button>
          )}
          
          {onDelete && (
            <Button variant="outline" size="sm" onClick={onDelete} className="flex-1 text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-1" /> Supprimer
            </Button>
          )}
          
          {showAssignButton && onAssign && (
            <Button variant="default" size="sm" onClick={onAssign} className="flex-1">
              <UserCheck className="h-4 w-4 mr-1" /> Assigner
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export { SenateurCard };
