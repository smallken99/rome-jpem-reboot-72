
import React from 'react';
import { Character } from '@/types/character';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface FamilyMembersProps {
  characters: Character[];
  onEdit?: (character: Character) => void;
  onDelete?: (id: string) => void;
}

export const FamilyMembers: React.FC<FamilyMembersProps> = ({
  characters,
  onEdit,
  onDelete
}) => {
  const navigate = useNavigate();
  
  if (characters.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p>Aucun membre familial trouvé.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 p-4">
      {characters.map(character => (
        <div 
          key={character.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={character.portrait} alt={character.name} />
              <AvatarFallback>{character.name?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-medium">{character.name}</h3>
                {character.isHeadOfFamily && (
                  <Badge variant="outline" className="text-xs">Chef de famille</Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <span>{character.relation || 'Membre'} • </span>
                <span>{character.age} ans</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/famille/member/${character.id}`)}
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">Détails</span>
            </Button>
            
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(character)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
            )}
            
            {onDelete && !character.isHeadOfFamily && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(character.id)}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Supprimer</span>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
