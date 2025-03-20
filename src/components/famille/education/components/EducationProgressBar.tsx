
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Medal, Calendar, Coins, GraduationCap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
        <div className="text-sm font-medium flex items-center">
          <GraduationCap className="h-4 w-4 mr-1 text-blue-500" />
          Progression: {progress}%
        </div>
        {preceptorQuality && (
          <TooltipProvider>
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
          </TooltipProvider>
        )}
      </div>
      
      <Progress value={progress} className="h-3" indicatorClassName={getProgressColor()} />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        <div className="flex items-center text-xs">
          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
          <span className="text-muted-foreground mr-1">Années:</span>
          <span className="font-medium">{yearsCompleted}/{duration}</span>
        </div>
        <div className="flex items-center text-xs">
          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
          <span className="text-muted-foreground mr-1">Restant:</span>
          <span className="font-medium">{remainingYears} an{remainingYears > 1 ? 's' : ''}</span>
        </div>
        {cost && (
          <div className="flex items-center text-xs col-span-2 md:col-span-1">
            <Coins className="h-3 w-3 mr-1 text-amber-500" />
            <span className="text-muted-foreground mr-1">Coût total:</span>
            <span className="font-medium">{cost * (yearsCompleted + remainingYears)} as</span>
          </div>
        )}
      </div>
    </div>
  );
};
