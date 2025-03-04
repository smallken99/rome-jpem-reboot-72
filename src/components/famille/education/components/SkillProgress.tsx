
import React from 'react';
import { BookOpen } from 'lucide-react';

interface SkillProgressProps {
  baseProgress: number;
  pityBonus: number;
  hasInvalidEducation: boolean;
}

export const SkillProgress: React.FC<SkillProgressProps> = ({ baseProgress, pityBonus, hasInvalidEducation }) => {
  const totalProgress = Math.min(baseProgress + pityBonus, 100); // Cap at 100%
  
  return (
    <div className="mt-3">
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <BookOpen className="h-3 w-3" />
        Maîtrise des compétences:
      </p>
      <div className="mt-1 h-2 bg-muted rounded-full">
        <div 
          className={`h-full ${hasInvalidEducation ? 'bg-red-400' : 'bg-rome-terracotta'} rounded-full`}
          style={{ width: `${totalProgress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>Débutant</span>
        <span>{baseProgress}%{pityBonus > 0 && <span className="text-green-600"> (+{pityBonus}% piété)</span>}</span>
        <span>Maître</span>
      </div>
    </div>
  );
};
