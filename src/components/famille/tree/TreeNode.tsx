
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Character } from '@/types/character';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, User2, BabyIcon, SquareUser } from 'lucide-react';

type NodeType = 'patriarch' | 'matriarch' | 'son' | 'daughter' | 'other';

interface TreeNodeProps {
  character: Character;
  nodeType: NodeType;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ character, nodeType }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('');
  };
  
  const getIcon = () => {
    switch (nodeType) {
      case 'patriarch':
        return <User className="h-5 w-5 text-primary" />;
      case 'matriarch':
        return <User2 className="h-5 w-5 text-primary" />;
      case 'son':
        return <SquareUser className="h-5 w-5 text-blue-500" />;
      case 'daughter':
        return <SquareUser className="h-5 w-5 text-pink-500" />;
      default:
        return <BabyIcon className="h-5 w-5" />;
    }
  };
  
  const getBorderColor = () => {
    switch (nodeType) {
      case 'patriarch':
        return 'border-primary';
      case 'matriarch':
        return 'border-primary';
      case 'son':
        return 'border-blue-500';
      case 'daughter':
        return 'border-pink-500';
      default:
        return 'border-gray-300';
    }
  };
  
  return (
    <Card className={`w-48 shadow-md hover:shadow-lg transition-shadow ${getBorderColor()} border-2`}>
      <CardContent className="p-4 flex flex-col items-center">
        <div className="mb-2 flex items-center justify-center w-full">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage src={character.portrait} alt={character.name} />
            <AvatarFallback>{getInitials(character.name)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="text-center mb-1">
          <p className="font-semibold">{character.name}</p>
          <p className="text-sm text-muted-foreground">{character.age} ans</p>
        </div>
        
        <div className="mt-2 flex gap-2 flex-wrap justify-center">
          <Badge variant="outline" className="flex gap-1 items-center text-xs">
            {getIcon()} {nodeType === 'patriarch' ? 'Pater Familias' : 
              nodeType === 'matriarch' ? 'Mater Familias' : character.relation}
          </Badge>
          
          {character.isPlayer && (
            <Badge className="bg-amber-500 text-xs">Joueur</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
