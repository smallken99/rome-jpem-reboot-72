
import React from 'react';
import { CharacterStat as CharacterStatType } from '@/types/character';
import { 
  Users, 
  MessageCircle, 
  Feather, 
  Sword,
  Heart,
  GraduationCap,
  Shield,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatBarProps {
  stat: CharacterStatType;
}

const StatBar: React.FC<StatBarProps> = ({ stat }) => {
  const getIcon = () => {
    switch (stat.icon) {
      case 'popularity': return <Users className="h-4 w-4" />;
      case 'oratory': return <MessageCircle className="h-4 w-4" />;
      case 'piety': return <Heart className="h-4 w-4" />;
      case 'martialEducation': return <Sword className="h-4 w-4" />;
      case 'intelligence': return <GraduationCap className="h-4 w-4" />;
      case 'influence': return <Award className="h-4 w-4" />;
      case 'leadership': return <Shield className="h-4 w-4" />;
      default: return <Feather className="h-4 w-4" />;
    }
  };

  const getColorClass = () => {
    switch (stat.color) {
      case 'red': return 'bg-red-500';
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      case 'terracotta': return 'bg-rome-terracotta';
      case 'navy': return 'bg-rome-navy';
      case 'gold': return 'bg-rome-gold';
      default: return 'bg-gray-500';
    }
  };

  const percentage = (stat.value / stat.maxValue) * 100;

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <div className={cn("p-1 rounded-full", `bg-${stat.color}-100`)}>
            <div className={cn("text-white", `text-${stat.color}-800`)}>
              {getIcon()}
            </div>
          </div>
          <span className="text-sm font-medium">{stat.name}</span>
        </div>
        <span className="text-sm font-medium">{stat.value}/{stat.maxValue}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full", getColorClass())} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
    </div>
  );
};

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
