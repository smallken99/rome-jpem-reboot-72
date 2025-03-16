
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, User, Coins, Star, Award, Check, X
} from 'lucide-react';
import { Preceptor } from './types/educationTypes';
import { formatCurrency } from '@/utils/currencyUtils';
import { useNavigate } from 'react-router-dom';
import { useEducation } from './context/EducationContext';

interface PreceptorCardProps {
  preceptor: Preceptor;
  isHired?: boolean;
  childId?: string;
  onHire?: (preceptorId: string) => void;
  onFire?: (preceptorId: string) => void;
  onAssign?: (preceptorId: string, childId: string) => void;
}

export const PreceptorCard: React.FC<PreceptorCardProps> = ({
  preceptor,
  isHired = false,
  childId,
  onHire,
  onFire,
  onAssign
}) => {
  const navigate = useNavigate();
  const { hirePreceptor, firePreceptor } = useEducation();
  
  // Obtenir les valeurs appropriées 
  const specialties = preceptor.specialties;
  const primarySpecialty = preceptor.specialty || preceptor.specialties[0];
  const expertise = preceptor.expertise || 70;
  const cost = preceptor.cost || 5000;
  
  // Gérer l'engagement d'un précepteur
  const handleHire = () => {
    if (onHire) {
      onHire(preceptor.id);
    } else {
      hirePreceptor(preceptor.id, childId || '');
      navigate('/famille/education');
    }
  };
  
  // Gérer le licenciement d'un précepteur
  const handleFire = () => {
    if (onFire) {
      onFire(preceptor.id);
    } else {
      firePreceptor(preceptor.id);
    }
  };
  
  // Gérer l'assignation d'un précepteur à un enfant
  const handleAssign = () => {
    if (childId && onAssign) {
      onAssign(preceptor.id, childId);
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{preceptor.name}</CardTitle>
          <Badge variant="outline" className="capitalize bg-green-50 text-green-700 border-green-200">
            {primarySpecialty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-3 text-sm">
          <div className="flex gap-2 items-center">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>Expertise: {expertise}/100</span>
          </div>
          
          <div className="flex gap-2 items-center">
            <Coins className="h-4 w-4 text-muted-foreground" />
            <span>Coût: {formatCurrency(cost)} par an</span>
          </div>
          
          <div className="flex gap-2 items-center">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span>Spécialités: {specialties.join(', ')}</span>
          </div>
          
          <div className="mt-2 text-muted-foreground text-xs">
            {preceptor.description}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        {!isHired ? (
          childId ? (
            <Button 
              onClick={handleAssign} 
              className="w-full"
              variant="default"
            >
              <User className="h-4 w-4 mr-2" />
              Assigner à cet enfant
            </Button>
          ) : (
            <Button 
              onClick={handleHire} 
              className="w-full"
              variant="default"
            >
              <Award className="h-4 w-4 mr-2" />
              Recruter
            </Button>
          )
        ) : (
          <div className="flex w-full justify-between gap-2">
            <Button 
              onClick={handleFire} 
              variant="destructive"
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Renvoyer
            </Button>
            
            {childId && (
              <Button 
                onClick={handleAssign} 
                variant="default"
                className="flex-1"
              >
                <Check className="h-4 w-4 mr-2" />
                Assigner
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
