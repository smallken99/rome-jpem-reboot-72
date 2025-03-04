
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
        return { maxFromEducation: '40', capNote: true };
      default:
        return { maxFromEducation: '40', capNote: false };
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
              pietyBonus={shouldAddPietyBonus ? 15 : undefined}
            />
            {statInfo.capNote && (
              <p className="text-xs text-muted-foreground mt-1 italic">
                Valeur maximale par éducation: {statInfo.maxFromEducation}
              </p>
            )}
          </div>
        );
      })}
      
      <div className="mt-4 text-xs bg-muted p-2 rounded">
        <p className="font-medium mb-1">Hérédité des caractéristiques:</p>
        <p>À la naissance, un personnage hérite d'un tiers des caractéristiques combinées de ses parents (divisées par 2).</p>
        <p className="mt-1">L'éducation permet ensuite d'augmenter ces caractéristiques jusqu'à un maximum de 40 (sauf pour la popularité qui est illimitée).</p>
      </div>
    </div>
  );
};
