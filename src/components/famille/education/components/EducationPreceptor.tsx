
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Star, UserX } from 'lucide-react';
import { Preceptor } from '../types/educationTypes';
import { Character } from '@/types/character';

interface EducationPreceptorProps {
  child: Character;
  preceptors: Preceptor[];
  onAssignPreceptor: (preceptorId: string) => void;
}

export const EducationPreceptor: React.FC<EducationPreceptorProps> = ({
  child,
  preceptors,
  onAssignPreceptor
}) => {
  const assignedPreceptorId = child.currentEducation?.mentor || child.preceptorId;
  const assignedPreceptor = assignedPreceptorId ? 
    preceptors.find(p => p.id === assignedPreceptorId) : 
    undefined;
  
  // Filter available preceptors by child's education type
  const availablePreceptors = preceptors.filter(p => 
    p.available && 
    (p.specialty === child.educationType || p.speciality === child.educationType)
  );

  const handleAssignPreceptor = (preceptorId: string) => {
    onAssignPreceptor(preceptorId);
  };

  // Render quality stars
  const renderQualityStars = (quality: number) => {
    return Array.from({ length: quality }).map((_, index) => (
      <Star key={index} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <GraduationCap className="h-5 w-5" />
          <span>Précepteur</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {assignedPreceptor ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                {assignedPreceptor.portrait ? (
                  <img
                    src={assignedPreceptor.portrait}
                    alt={assignedPreceptor.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <GraduationCap className="h-6 w-6 text-primary" />
                )}
              </div>
              <div>
                <h4 className="font-medium">{assignedPreceptor.name}</h4>
                <div className="flex items-center space-x-1 mt-1">
                  {renderQualityStars(assignedPreceptor.quality)}
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-1">Spécialité</div>
              <Badge variant="secondary" className="font-normal">
                {assignedPreceptor.specialty || assignedPreceptor.speciality}
              </Badge>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-1">Expérience</div>
              <div className="text-sm">{assignedPreceptor.experience} années</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-1">Compétence</div>
              <div className="w-full h-2 bg-secondary rounded-full">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${assignedPreceptor.expertise}%` }}
                ></div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              onClick={() => handleAssignPreceptor('')}
            >
              <UserX className="h-4 w-4 mr-2" />
              Retirer le précepteur
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center py-2 text-muted-foreground text-sm">
              {child.educationType === 'none' ? (
                "Sélectionnez d'abord un type d'éducation"
              ) : availablePreceptors.length > 0 ? (
                "Choisissez un précepteur pour l'enfant"
              ) : (
                "Aucun précepteur disponible pour ce type d'éducation"
              )}
            </div>
            
            {child.educationType !== 'none' && availablePreceptors.length > 0 && (
              <Select 
                onValueChange={handleAssignPreceptor} 
                disabled={child.educationType === 'none'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un précepteur" />
                </SelectTrigger>
                <SelectContent>
                  {availablePreceptors.map(preceptor => (
                    <SelectItem key={preceptor.id} value={preceptor.id}>
                      {preceptor.name} - {renderQualityStars(preceptor.quality)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {child.educationType !== 'none' && availablePreceptors.length === 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => window.location.href = '/famille/education/preceptors'}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Recruter des précepteurs
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
