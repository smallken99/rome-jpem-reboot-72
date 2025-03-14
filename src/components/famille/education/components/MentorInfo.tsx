
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen, Star } from 'lucide-react';
import { MentorInfoProps } from '../types/educationTypes';

export const MentorInfo: React.FC<MentorInfoProps> = ({ preceptor }) => {
  if (!preceptor) {
    return (
      <div className="text-muted-foreground">
        Aucun précepteur assigné
      </div>
    );
  }

  return (
    <Card className="border border-primary/20 bg-primary/5">
      <CardContent className="pt-4 pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <h4 className="font-medium">{preceptor.name}</h4>
          </div>
          <Badge variant="outline">
            {preceptor.specialty}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Spécialité: {preceptor.speciality || preceptor.specialty}</span>
        </div>
        
        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: preceptor.quality || Math.ceil(preceptor.skill / 20) || 3 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          ))}
          {Array.from({ length: 5 - (preceptor.quality || Math.ceil(preceptor.skill / 20) || 3) }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-gray-300" />
          ))}
        </div>
        
        {preceptor.background && (
          <p className="text-xs text-muted-foreground">
            {preceptor.background}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
