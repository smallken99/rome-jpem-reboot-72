
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
        // Check if this is martial education stat and character is female
        const isDisabledMartialStat = isFemale && stat.icon === 'martialEducation';
        
        return (
          <StatBar 
            key={index} 
            stat={stat} 
            disabled={isDisabledMartialStat}
            pietyBonus={isFemale && stat.icon === 'piety' ? 15 : undefined}
          />
        );
      })}
    </div>
  );
};
