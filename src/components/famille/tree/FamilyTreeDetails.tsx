
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Character } from '@/types/character';
import { findHeir, getFamilyLineage } from './familyHelpers';
import { Badge } from '@/components/ui/badge';
import { ScrollText, Users, Crown, GraduationCap } from 'lucide-react';

interface FamilyTreeDetailsProps {
  characters: Character[];
}

export const FamilyTreeDetails: React.FC<FamilyTreeDetailsProps> = ({ characters }) => {
  const heir = findHeir(characters);
  const familyName = getFamilyLineage(characters);
  
  const headOfFamily = characters.find(c => c.isHeadOfFamily);
  const totalMembers = characters.length;
  const livingMembers = characters.filter(c => c.status !== 'deceased').length;
  
  // Éducation familiale
  const educatedMembers = characters.filter(c => c.education?.completed).length;
  const inEducation = characters.filter(c => c.currentEducation && !c.education?.completed).length;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Détails de la Famille</span>
          <Badge className="text-xs">{familyName}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Membres</p>
              <p className="text-xl font-bold">{livingMembers} <span className="text-sm text-muted-foreground">/ {totalMembers}</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm font-medium">Chef de famille</p>
              <p className="text-base font-semibold">{headOfFamily?.name || 'Non défini'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Héritier</p>
              <p className="text-base font-semibold">{heir?.name || 'Non défini'}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Éducation</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Éduqués</p>
              <p className="text-lg font-semibold">{educatedMembers}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">En formation</p>
              <p className="text-lg font-semibold">{inEducation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
