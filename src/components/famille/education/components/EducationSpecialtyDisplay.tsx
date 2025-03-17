
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EducationSpecialtyDisplayProps {
  specialties: string[];
  educationType?: string;
  className?: string;
}

export const EducationSpecialtyDisplay: React.FC<EducationSpecialtyDisplayProps> = ({
  specialties,
  educationType,
  className = ''
}) => {
  if (!specialties || specialties.length === 0) {
    return (
      <div className={`text-sm text-muted-foreground italic ${className}`}>
        Aucune spécialisation choisie
      </div>
    );
  }

  // Map education type to badge colors
  const getBadgeColor = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'military':
      case 'militaire':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'religious':
      case 'religieuse':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'rhetoric':
      case 'rhetorique': 
      case 'rhétorique':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'political':
      case 'politique':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'arts':
        return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
      case 'philosophy':
      case 'philosophie':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className={className}>
      {specialties.length > 4 ? (
        <ScrollArea className="h-20 w-full">
          <div className="flex flex-wrap gap-1.5">
            {specialties.map((specialty, index) => (
              <Badge key={index} variant="outline" className={getBadgeColor(educationType)}>
                {specialty}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className={getBadgeColor(educationType)}>
              {specialty}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
