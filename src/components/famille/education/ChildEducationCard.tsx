
import React from 'react';
import { Check, GraduationCap, Ban } from 'lucide-react';
import { AnnualProgress } from './components/AnnualProgress';
import { SkillProgress } from './components/SkillProgress';
import { ChildHeader } from './components/ChildHeader';
import { PietyBonus } from './components/PietyBonus';
import { MentorInfo } from './components/MentorInfo';
import { CardActions } from './components/CardActions';
import { EducationWarning } from './components/EducationWarning';
import { StatBonusInfo } from './components/StatBonusInfo';
import { Child } from './types/educationTypes';

interface ChildEducationCardProps {
  child: Child;
  onChangeName?: (id: string, newName: string) => void;
}

const ChildEducationCard: React.FC<ChildEducationCardProps> = ({ child, onChangeName }) => {
  // Determine if the child has an ongoing education
  const hasEducation = child.currentEducation?.type && child.currentEducation.type !== 'none';
  
  // Check if female with military education (invalid in Roman times)
  const hasInvalidEducation = child.gender === 'female' && child.currentEducation?.type === 'military';
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <ChildHeader 
        child={child} 
        onNameChange={onChangeName}
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
                        child.currentEducation.type === 'political' ? 'Politique' : 'Religieuse'}
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
                  skills={child.currentEducation.skills}
                />
              </div>
              
              <div>
                <SkillProgress 
                  progress={child.currentEducation.progress}
                  pityBonus={child.currentEducation.pityBonus}
                  hasInvalidEducation={hasInvalidEducation}
                  gender={child.gender}
                />
                
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildEducationCard;
