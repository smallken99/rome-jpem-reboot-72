
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
  return (
    <div className={cn("space-y-1", className)}>
      {stats.map((stat, index) => {
        // For females: disable martial education and add piety bonus
        // For males: no changes
        const isDisabledStat = isFemale && stat.icon === 'martialEducation';
        const shouldAddPietyBonus = isFemale && stat.icon === 'piety';
        
        return (
          <StatBar 
            key={index} 
            stat={stat} 
            disabled={isDisabledStat}
            pietyBonus={shouldAddPietyBonus ? 15 : undefined}
          />
        );
      })}
    </div>
  );
};
