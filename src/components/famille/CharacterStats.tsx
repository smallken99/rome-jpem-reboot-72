
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
  // Define consistent information about stat caps
  const getStatInfo = (statIcon: string) => {
    switch (statIcon) {
      case 'popularity':
        return { 
          maxFromEducation: 'illimitée', 
          capNote: true,
          description: 'La popularité peut dépasser 200 selon vos actions politiques'
        };
      case 'oratory':
        return { 
          maxFromEducation: '80', 
          capNote: true,
          description: 'L\'éducation rhétorique peut augmenter l\'éloquence jusqu\'à 80 points'
        };
      case 'piety':
        return { 
          maxFromEducation: '80', 
          capNote: true,
          description: 'La formation religieuse peut augmenter la piété jusqu\'à 80 points'
        };
      case 'martialEducation':
        return { 
          maxFromEducation: '80', 
          capNote: true,
          description: 'L\'entraînement militaire peut augmenter l\'éducation martiale jusqu\'à 80 points'
        };
      default:
        return { 
          maxFromEducation: '80', 
          capNote: false,
          description: ''
        };
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {stats.map((stat, index) => {
        // For females: disable martial education and add piety bonus
        // For males: no changes
        const isDisabledStat = isFemale && stat.icon === 'martialEducation';
        const shouldAddPietyBonus = isFemale && stat.icon === 'piety';
        const statInfo = getStatInfo(stat.icon);
        
        return (
          <div key={index} className="mb-2">
            <StatBar 
              key={index} 
              stat={stat} 
              disabled={isDisabledStat}
              pietyBonus={shouldAddPietyBonus ? 30 : undefined}
            />
            {statInfo.capNote && (
              <p className="text-xs text-muted-foreground mt-1 italic">
                {statInfo.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
