
import React from 'react';
import { CharacterStat as CharacterStatType } from '@/types/character';
import { cn } from '@/lib/utils';
import StatBar from './StatBar';

interface CharacterStatsProps {
  stats: CharacterStatType[];
  className?: string;
}

export const CharacterStats: React.FC<CharacterStatsProps> = ({ stats, className }) => {
  return (
    <div className={cn("space-y-1", className)}>
      {stats.map((stat, index) => (
        <StatBar key={index} stat={stat} />
      ))}
    </div>
  );
};
