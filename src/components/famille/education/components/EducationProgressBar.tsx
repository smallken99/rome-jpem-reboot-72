
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Medal } from 'lucide-react';

interface EducationProgressBarProps {
  progress: number;
  preceptorQuality?: number;
  duration?: number;
  yearsCompleted?: number;
  cost?: number;
  className?: string;
}

export const EducationProgressBar: React.FC<EducationProgressBarProps> = ({
  progress,
  preceptorQuality,
  duration = 3,
  yearsCompleted = 0,
  cost,
  className
}) => {
  // Déterminer la couleur en fonction de la progression
  const getProgressColor = () => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-green-400';
    if (progress >= 50) return 'bg-yellow-400';
    if (progress >= 30) return 'bg-yellow-300';
    return 'bg-gray-300';
  };
  
  // Calculer l'impact du précepteur sur la vitesse d'apprentissage
  const getPreceptorBonus = () => {
    if (!preceptorQuality) return 0;
    return Math.floor(preceptorQuality / 20); // 0-5 bonus
  };
  
  // Calculer les années restantes estimées
  const getRemainingYears = () => {
    if (progress >= 100) return 0;
    
    const progressPerYear = 15 + getPreceptorBonus() * 3; // 15-30% par an selon le précepteur
    const remainingProgress = 100 - progress;
    const estimatedYears = Math.ceil(remainingProgress / progressPerYear);
    
    return estimatedYears;
  };
  
  const preceptorBonus = getPreceptorBonus();
  const remainingYears = getRemainingYears();
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Progression: {progress}%</div>
        {preceptorQuality && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 cursor-help">
                <Medal className="h-4 w-4 text-yellow-500" />
                <span className="text-xs text-muted-foreground">+{preceptorBonus} vitesse</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Le précepteur accélère l'éducation de {preceptorBonus * 3}% par an</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all", getProgressColor())} 
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
      
      <div className="flex flex-wrap justify-between text-xs mt-1">
        <div>
          <span className="text-muted-foreground">Années complétées:</span>
          <span className="ml-1 font-medium">{yearsCompleted}/{duration}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Temps restant estimé:</span>
          <span className="ml-1 font-medium">{remainingYears} an{remainingYears > 1 ? 's' : ''}</span>
        </div>
        {cost && (
          <div>
            <span className="text-muted-foreground">Coût total estimé:</span>
            <span className="ml-1 font-medium">{cost * (yearsCompleted + remainingYears)} as</span>
          </div>
        )}
      </div>
    </div>
  );
};
