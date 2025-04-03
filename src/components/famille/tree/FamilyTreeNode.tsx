
import React from 'react';
import { Character } from '@/types/character';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  GraduationCap, 
  HeartHandshake, 
  UserRound, 
  Scroll 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FamilyTreeNodeProps {
  character: Character;
  relationLabel: string;
}

export const FamilyTreeNode: React.FC<FamilyTreeNodeProps> = ({ character, relationLabel }) => {
  const navigate = useNavigate();
  
  // Extraire le prénom et le nom de famille
  const nameParts = character.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  
  // Raccourcir la description si elle est trop longue
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };
  
  const handleEducation = () => {
    if (character.age < 18) {
      navigate('/famille/education');
    }
  };
  
  const handleAlliance = () => {
    if (character.gender === 'female' && !character.spouseId) {
      navigate(`/famille/alliance/${character.id}`);
    }
  };
  
  return (
    <Card className="w-56 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <div className="mb-2 relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={character.portrait} alt={character.name} />
              <AvatarFallback>{getInitials(character.name)}</AvatarFallback>
            </Avatar>
            
            <div className="absolute -top-2 -right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-6 w-6 rounded-full bg-white shadow flex items-center justify-center">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/personnage/${character.id}`)}>
                    <UserRound className="h-4 w-4 mr-2" />
                    Voir le profil
                  </DropdownMenuItem>
                  
                  {character.age < 18 && (
                    <DropdownMenuItem onClick={handleEducation}>
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Éducation
                    </DropdownMenuItem>
                  )}
                  
                  {character.gender === 'female' && !character.spouseId && (
                    <DropdownMenuItem onClick={handleAlliance}>
                      <HeartHandshake className="h-4 w-4 mr-2" />
                      Alliance matrimoniale
                    </DropdownMenuItem>
                  )}
                  
                  {character.age >= 18 && (
                    <DropdownMenuItem onClick={() => navigate('/famille/inheritance')}>
                      <Scroll className="h-4 w-4 mr-2" />
                      Testament
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="text-center mt-1">
            <p className="font-bold">{firstName}</p>
            <p className="text-sm">{lastName}</p>
            <div className="mt-1 mb-2">
              <Badge variant="outline" className="text-xs">
                {relationLabel}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{character.age} ans</p>
              {character.education?.type && (
                <p className="italic">
                  {character.education.type === 'military' ? 'Militaire' : 
                   character.education.type === 'rhetoric' ? 'Rhétorique' :
                   character.education.type === 'political' ? 'Politique' :
                   character.education.type === 'religious' ? 'Religieuse' :
                   character.education.type === 'philosophical' ? 'Philosophique' : 
                   character.education.type}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
