
import React from 'react';
import { Preceptor } from '../types/educationTypes';
import { Card, CardContent } from '@/components/ui/card';
import { User, Medal, BookOpen, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MentorInfoProps {
  mentor: Preceptor | null;
  educationType: string;
}

export const MentorInfo: React.FC<MentorInfoProps> = ({ mentor, educationType }) => {
  const formatEducationType = (type: string) => {
    switch (type) {
      case 'military': return 'Militaire';
      case 'rhetoric': return 'Rhétorique';
      case 'academic': return 'Académique';
      case 'religious': return 'Religieuse';
      default: return type;
    }
  };
  
  const mentorQualityStars = (quality: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-3.5 w-3.5 ${i < quality ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };
  
  if (!mentor) {
    return (
      <Card className="border border-dashed">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Aucun précepteur assigné
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 p-1.5 rounded-full">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{mentor.name}</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="outline" className="px-1.5 py-0 text-xs">
                  {mentor.specialty || mentor.speciality}
                </Badge>
                {mentorQualityStars(mentor.quality)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Expérience:</span>
            <p>{mentor.experience} ans</p>
          </div>
          <div>
            <span className="text-muted-foreground">Coût annuel:</span>
            <p>{mentor.price || mentor.cost} as</p>
          </div>
        </div>
        
        {mentor.description && (
          <p className="text-xs text-muted-foreground italic">
            {mentor.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
