
import React from 'react';
import { BookOpen } from 'lucide-react';

interface SkillProgressProps {
  progress: number;
  pityBonus?: number;
  hasInvalidEducation?: boolean;
}

export const SkillProgress: React.FC<SkillProgressProps> = ({ 
  progress, 
  pityBonus = 0, 
  hasInvalidEducation = false 
}) => {
  const totalProgress = Math.min(progress + pityBonus, 100); // Cap at 100%
  
  return (
    <div className="mt-3">
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <BookOpen className="h-3 w-3" />
        Progression des compétences:
      </p>
      <div className="mt-1 h-2 bg-muted rounded-full">
        <div 
          className={`h-full ${hasInvalidEducation ? 'bg-red-400' : 'bg-rome-terracotta'} rounded-full`}
          style={{ width: `${totalProgress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>Débutant</span>
        <span>{progress}%{pityBonus > 0 && <span className="text-green-600"> (+{pityBonus}% piété)</span>}</span>
        <span>Maître</span>
      </div>
      {pityBonus > 0 && (
        <p className="text-xs text-green-600 mt-1">
          Le bonus de piété accélère l'acquisition des compétences.
        </p>
      )}
    </div>
  );
};
