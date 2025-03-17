
import React from 'react';
import { Preceptor } from '../types/educationTypes';
import { Card, CardContent } from '@/components/ui/card';
import { User, Medal, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MentorInfoProps {
  mentor?: Preceptor | null;
  educationType?: string;
  onChangeMentor?: () => void;
}

export const MentorInfo: React.FC<MentorInfoProps> = ({
  mentor,
  educationType,
  onChangeMentor
}) => {
  if (!mentor) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-muted-foreground">
          <User className="h-10 w-10 mx-auto mb-2 opacity-40" />
          <p>Aucun précepteur assigné</p>
          {onChangeMentor && (
            <Button variant="outline" size="sm" className="mt-3" onClick={onChangeMentor}>
              Assigner un précepteur
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  // Display mentor quality as stars
  const renderQualityStars = () => {
    const quality = mentor.quality || 3;
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Medal 
            key={i} 
            className={`h-4 w-4 ${i < quality ? 'text-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{mentor.name}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Spécialité: {mentor.specialty || mentor.speciality}</span>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div className="text-sm">
                Qualité: {renderQualityStars()}
              </div>
              {onChangeMentor && (
                <Button variant="outline" size="sm" onClick={onChangeMentor}>
                  Changer
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
