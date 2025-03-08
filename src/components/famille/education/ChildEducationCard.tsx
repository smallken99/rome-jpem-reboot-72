
import React from 'react';
import { Check, GraduationCap, Ban, Clock } from 'lucide-react';
import { AnnualProgress } from './components/AnnualProgress';
import { MentorInfo } from './components/MentorInfo';
import { CardActions } from './components/CardActions';
import { ChildHeader } from './components/ChildHeader';
import { PietyBonus } from './components/PietyBonus';
import { EducationWarning } from './components/EducationWarning';
import { StatBonusInfo } from './components/StatBonusInfo';
import { Child } from './types/educationTypes';
import { Button } from '@/components/ui/button';
import { useEducation } from './context/EducationContext';

interface ChildEducationCardProps {
  child: Child;
}

const ChildEducationCard: React.FC<ChildEducationCardProps> = ({ child }) => {
  // Use our education context for functionality
  const { 
    educatingChildren, 
    advanceEducationYear, 
    completeEducation,
    updateChildName 
  } = useEducation();
  
  // Determine if the child has an ongoing education
  const hasEducation = child.currentEducation?.type && child.currentEducation.type !== 'none';
  
  // Check if female with military education (invalid in Roman times)
  const hasInvalidEducation = child.gender === 'female' && child.currentEducation?.type === 'military';
  
  // Check if education is in progress
  const isEducating = educatingChildren[child.id];
  
  // Handle advancing education by a year
  const handleAdvanceYear = () => {
    advanceEducationYear(child.id);
  };
  
  // Handle name change
  const handleNameChange = (id: string, newName: string) => {
    updateChildName(id, newName);
  };
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <ChildHeader 
        child={child} 
        onNameChange={handleNameChange}
        hasInvalidEducation={hasInvalidEducation}
      />
      
      <div className="p-4">
        {!hasEducation ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <GraduationCap className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium mb-1">Aucune éducation en cours</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Cet enfant n'a actuellement aucune éducation. Choisissez un parcours éducatif pour commencer sa formation.
            </p>
            
            {child.age < 8 && (
              <EducationWarning
                icon={<Ban className="h-4 w-4" />}
                text={`${child.name} est trop jeune pour la plupart des éducations. Il/Elle peut uniquement suivre une éducation religieuse pour le moment.`}
              />
            )}
            
            <CardActions 
              educationType="none" 
              childId={child.id} 
              childGender={child.gender} 
              childAge={child.age} 
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Éducation en cours
                </h3>
                <p className="text-sm text-muted-foreground">
                  Type: {child.currentEducation.type === 'military' ? 'Militaire' : 
                        child.currentEducation.type === 'political' ? 'Politique' : 
                        child.currentEducation.type === 'religious' ? 'Religieuse' :
                        child.currentEducation.type === 'commercial' ? 'Commerce' : 'Inconnue'}
                </p>
              </div>
              
              <CardActions 
                educationType={child.currentEducation.type} 
                childId={child.id} 
                childGender={child.gender} 
                childAge={child.age} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {child.currentEducation.yearsCompleted !== undefined && 
                 child.currentEducation.totalYears !== undefined && (
                  <AnnualProgress 
                    yearsCompleted={child.currentEducation.yearsCompleted} 
                    totalYears={child.currentEducation.totalYears} 
                  />
                )}
                
                <MentorInfo 
                  mentor={child.currentEducation.mentor} 
                  speciality={child.currentEducation.speciality}
                />
              </div>
              
              <div>
                {child.currentEducation.pityBonus !== undefined && 
                 child.currentEducation.pityBonus > 0 && 
                 child.gender === 'female' && (
                  <PietyBonus bonus={child.currentEducation.pityBonus} />
                )}
                
                <StatBonusInfo 
                  educationType={child.currentEducation.type}
                  statBonus={child.currentEducation.statBonus}
                />
              </div>
            </div>
            
            {/* Add education progression buttons */}
            <div className="mt-4 pt-4 border-t flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isEducating}
                onClick={handleAdvanceYear}
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4" />
                {isEducating ? 'En cours...' : 'Avancer d\'une année'}
              </Button>
              
              {child.currentEducation.progress >= 90 && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => completeEducation(child.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Compléter l'éducation
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildEducationCard;
