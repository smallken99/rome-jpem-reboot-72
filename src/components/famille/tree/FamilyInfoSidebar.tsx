
import React from 'react';
import { Character } from '@/types/character';
import { 
  User,
  UsersRound,
  GraduationCap,
  Heart,
  Baby
} from 'lucide-react';
import { 
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateAge, getMaritalStatus } from './familyHelpers';
import { useGameTime } from '@/hooks/useGameTime';

interface FamilyInfoSidebarProps {
  characters: Character[];
}

export const FamilyInfoSidebar: React.FC<FamilyInfoSidebarProps> = ({ characters }) => {
  const { year } = useGameTime(); 
  
  // Helper function to display full name with fallbacks
  const displayFullName = (character: Character) => {
    if (character.firstName && character.lastName) {
      return `${character.firstName} ${character.lastName}`;
    }
    return character.name;
  };
  
  // Check if characters data is valid
  if (!characters || characters.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Aucune donnée</AlertTitle>
        <AlertDescription>
          Aucune information familiale disponible.
        </AlertDescription>
      </Alert>
    );
  }
  
  // Find the head of family
  const familyHead = characters.find(c => 
    (c.role?.includes('Chef') || c.role?.includes('pater familias')) && c.gender === 'male'
  );
  
  // Find the matriarch
  const familyMatriarch = characters.find(c => 
    (c.role?.includes('Épouse') || c.role?.includes('mater familias')) && c.gender === 'female'
  );
  
  // Count children
  const childrenCount = characters.filter(c => 
    c.role?.includes('Fils') || 
    c.role?.includes('Fille') || 
    c.role?.includes('fils') || 
    c.role?.includes('filia')
  ).length;
  
  // Get family name
  const familyName = familyHead?.lastName || characters[0]?.lastName || 'Famille'; 
  
  return (
    <div className="family-sidebar space-y-4">
      <Alert>
        <User className="h-4 w-4" />
        <AlertTitle>Famille {familyName}</AlertTitle>
        <AlertDescription>
          {childrenCount} membres dans la famille
        </AlertDescription>
      </Alert>
      
      {/* Chef de famille */}
      {familyHead && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-amber-600" />
              Chef de Famille
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {familyHead.portrait ? (
                <img 
                  src={familyHead.portrait} 
                  alt={displayFullName(familyHead)} 
                  className="w-10 h-10 rounded-full object-cover border border-amber-200"
                />
              ) : (
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-amber-800" />
                </div>
              )}
              <div>
                <p className="font-medium">{displayFullName(familyHead)}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{familyHead.age} ans</span>
                  <span className="mx-1">•</span>
                  <span>{familyHead.title || 'Citoyen'}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 text-xs">
              <div className="flex justify-between">
                <span>Statut Marital:</span>
                <Badge variant="secondary">{getMaritalStatus(familyHead)}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Statistiques Familiales */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-blue-600" />
            Statistiques Familiales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>Membres:</span>
            </div>
            <span className="text-right font-medium">{characters.length}</span>
            
            <div className="flex items-center gap-1">
              <Baby className="h-3 w-3" />
              <span>Enfants:</span>
            </div>
            <span className="text-right font-medium">{childrenCount}</span>
            
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>Mariages:</span>
            </div>
            <span className="text-right font-medium">
              {characters.filter(c => c.marriageStatus === 'married').length}
            </span>
            
            <div className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              <span>En éducation:</span>
            </div>
            <span className="text-right font-medium">
              {characters.filter(c => c.education && c.age < 16).length}
            </span>
          </div>
          
          <Separator />
          
          <div className="text-xs text-center text-muted-foreground">
            Année actuelle: {year} AUC
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
