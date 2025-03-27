
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EducationPathCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  isSelected?: boolean;
  onClick?: () => void;
  duration?: number;
  requiredAge?: number;
  gender?: 'male' | 'female' | 'both';
  className?: string;
  disabled?: boolean;
}

const EducationPathCard: React.FC<EducationPathCardProps> = ({
  title,
  description,
  icon: Icon,
  benefits,
  isSelected = false,
  onClick,
  duration = 4,
  requiredAge = 8,
  gender = 'both',
  className,
  disabled = false
}) => {
  return (
    <Card 
      className={cn(
        "border-2 cursor-pointer transition-all", 
        isSelected 
          ? "border-rome-gold bg-amber-50" 
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className={cn(
              "p-2 rounded-full",
              isSelected ? "bg-rome-gold text-white" : "bg-gray-100 text-gray-600"
            )}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-cinzel text-lg">{title}</h3>
              {isSelected && (
                <div className="flex-shrink-0 bg-green-100 p-1 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            
            <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-gray-600 mb-3">
              <div>
                <span className="font-medium">Durée:</span> {duration} ans
              </div>
              <div>
                <span className="font-medium">Âge requis:</span> {requiredAge}+ ans
              </div>
              <div>
                <span className="font-medium">Genre:</span> {
                  gender === 'male' 
                    ? 'Garçons uniquement' 
                    : gender === 'female' 
                      ? 'Filles uniquement' 
                      : 'Tous'
                }
              </div>
            </div>
            
            <div className="space-y-1 mt-4">
              <h4 className="text-sm font-medium mb-1">Bénéfices:</h4>
              <ul className="text-xs space-y-1">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-1.5">
                    <div className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isSelected ? "bg-rome-gold" : "bg-gray-400"
                    )} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationPathCard;
