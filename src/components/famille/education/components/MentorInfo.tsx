
import React from 'react';
import { MentorInfoProps } from '../types/educationTypes';
import { User, Star, GraduationCap, Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const MentorInfo: React.FC<MentorInfoProps> = ({ preceptor }) => {
  if (!preceptor) {
    return (
      <div className="text-muted-foreground italic">
        Aucun précepteur assigné
      </div>
    );
  }
  
  // Helper to generate rating stars
  const getQualityStars = (quality: number) => {
    const stars = [];
    const maxStars = 5;
    const normalizedQuality = Math.floor(quality / 20); // Normalize to 0-5 stars
    
    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < normalizedQuality ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
        />
      );
    }
    
    return <div className="flex">{stars}</div>;
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          {preceptor.portrait ? (
            <AvatarImage src={preceptor.portrait} alt={preceptor.name} />
          ) : (
            <AvatarFallback>
              <User className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <div>
          <h4 className="font-medium">{preceptor.name}</h4>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>
              {typeof preceptor.specialty === 'string' ? (
                preceptor.specialty.charAt(0).toUpperCase() + preceptor.specialty.slice(1)
              ) : ''}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div>
          <span className="text-muted-foreground">Qualité:</span>
        </div>
        <div>{getQualityStars(preceptor.quality)}</div>
        
        <div>
          <span className="text-muted-foreground">Coût:</span>
        </div>
        <div>{preceptor.cost} As / an</div>
        
        <div>
          <span className="text-muted-foreground">Statut:</span>
        </div>
        <div>
          <Badge variant="outline" className="text-xs">
            {preceptor.status === 'assigned' ? 'Assigné' : 
             preceptor.status === 'hired' ? 'Embauché' : 'Disponible'}
          </Badge>
        </div>
      </div>
      
      {preceptor.background && (
        <div className="text-sm space-y-1">
          <div className="text-muted-foreground">Background:</div>
          <p className="italic">{preceptor.background}</p>
        </div>
      )}
      
      {preceptor.skills && preceptor.skills.length > 0 && (
        <div className="text-sm space-y-1">
          <div className="text-muted-foreground">Spécialités:</div>
          <div className="flex flex-wrap gap-1">
            {preceptor.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                <Book className="h-3 w-3 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
