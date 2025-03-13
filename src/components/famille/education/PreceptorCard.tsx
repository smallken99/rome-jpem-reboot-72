
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, BookOpen, Award, UserPlus, UserMinus } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Preceptor } from './types/educationTypes';

interface PreceptorCardProps {
  preceptor: Preceptor;
  isHired?: boolean;
  onHire?: () => void;
  onFire?: () => void;
  onAssign?: () => void;
}

export const PreceptorCard: React.FC<PreceptorCardProps> = ({ 
  preceptor, 
  isHired = false,
  onHire,
  onFire,
  onAssign
}) => {
  // Helper to format specialty
  const formatSpecialty = (specialty: string) => {
    switch (specialty) {
      case 'rhetoric': return { name: 'Rhétorique', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'politics': return { name: 'Politique', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'military': return { name: 'Militaire', color: 'bg-red-100 text-red-800 border-red-200' };
      case 'religious': return { name: 'Religieuse', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      default: return { name: specialty, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };
  
  const { name, color } = formatSpecialty(preceptor.specialty);
  
  // Helper for skill level
  const getSkillLevel = (skill: number) => {
    if (skill >= 85) return 'Exceptionnel';
    if (skill >= 70) return 'Excellent';
    if (skill >= 50) return 'Compétent';
    return 'Passable';
  };
  
  return (
    <Card className="overflow-hidden border">
      <CardHeader className="bg-muted/30 pb-2 flex-row justify-between items-center">
        <div>
          <h3 className="font-bold font-cinzel">{preceptor.name}</h3>
          <p className="text-sm text-muted-foreground">Précepteur</p>
        </div>
        <Badge className={color}>{name}</Badge>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Spécialité:</span>
            </div>
            <span className="font-medium">{name}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Award className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Compétence:</span>
            </div>
            <span className="font-medium">{preceptor.skill} ({getSkillLevel(preceptor.skill)})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Coins className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Salaire:</span>
            </div>
            <span className="font-medium">{preceptor.price} As / an</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 justify-end">
        {isHired ? (
          <div className="flex gap-2">
            {onAssign && (
              <ActionButton
                variant="outline"
                label="Assigner"
                onClick={onAssign}
              />
            )}
            {onFire && (
              <ActionButton
                variant="destructive"
                label="Renvoyer"
                onClick={onFire}
                icon={<UserMinus className="h-4 w-4 mr-2" />}
              />
            )}
          </div>
        ) : (
          onHire && (
            <ActionButton
              label="Embaucher"
              onClick={onHire}
              icon={<UserPlus className="h-4 w-4 mr-2" />}
            />
          )
        )}
      </CardFooter>
    </Card>
  );
};
