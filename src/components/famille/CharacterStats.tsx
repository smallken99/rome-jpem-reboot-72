
import React from 'react';
import { CharacterStat as CharacterStatType } from '@/types/character';
import { cn } from '@/lib/utils';
import StatBar from './StatBar';

interface CharacterStatsProps {
  stats: CharacterStatType[];
  className?: string;
  isFemale?: boolean;
}

export const CharacterStats: React.FC<CharacterStatsProps> = ({ stats, className, isFemale = false }) => {
  // Add information about the education-related stat caps
  const getStatInfo = (statIcon: string) => {
    switch (statIcon) {
      case 'popularity':
        return { maxFromEducation: 'illimitée', capNote: false };
      case 'oratory':
      case 'piety':
      case 'martialEducation':
        return { maxFromEducation: '80', capNote: true };
      default:
        return { maxFromEducation: '80', capNote: false };
    }
  };

  return (
    <div className={cn("space-y-1", className)}>
      {stats.map((stat, index) => {
        // For females: disable martial education and add piety bonus
        // For males: no changes
        const isDisabledStat = isFemale && stat.icon === 'martialEducation';
        const shouldAddPietyBonus = isFemale && stat.icon === 'piety';
        const statInfo = getStatInfo(stat.icon);
        
        return (
          <div key={index}>
            <StatBar 
              key={index} 
              stat={stat} 
              disabled={isDisabledStat}
              pietyBonus={shouldAddPietyBonus ? 30 : undefined}
            />
            {statInfo.capNote && (
              <p className="text-xs text-muted-foreground mt-1 italic">
                Valeur maximale par éducation: {statInfo.maxFromEducation}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
