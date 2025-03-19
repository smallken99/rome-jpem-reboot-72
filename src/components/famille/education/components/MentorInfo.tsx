
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Medal, Star, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Preceptor } from '../types/educationTypes';

interface MentorInfoProps {
  mentor: Preceptor | null;
  educationType: string;
}

export const MentorInfo: React.FC<MentorInfoProps> = ({ mentor, educationType }) => {
  if (!mentor) {
    return (
      <Card>
        <CardContent className="p-4 flex items-center justify-center text-muted-foreground text-sm h-24">
          Aucun précepteur assigné
        </CardContent>
      </Card>
    );
  }

  // Format education type
  const formatEducationType = (type: string) => {
    switch (type) {
      case 'military': return 'Militaire';
      case 'rhetoric': return 'Rhétorique';
      case 'religious': return 'Religieuse';
      case 'academic': return 'Académique';
      default: return type;
    }
  };

  // Display quality stars
  const qualityStars = () => {
    const starCount = Math.round(mentor.quality);
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-3.5 w-3.5 ${i < starCount ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium">{mentor.name}</h4>
            <p className="text-xs text-muted-foreground">
              Précepteur en {formatEducationType(mentor.specialty || mentor.speciality)}
            </p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Compétence</span>
            <div className="flex items-center gap-1">
              <Medal className="h-3.5 w-3.5 text-primary" />
              <span>{mentor.expertise || mentor.skill}/100</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Qualité</span>
            {qualityStars()}
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Coût</span>
            <div className="flex items-center gap-1">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              <span>{mentor.cost || mentor.price} as/an</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Expérience</span>
            <span>{mentor.experience} ans</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
