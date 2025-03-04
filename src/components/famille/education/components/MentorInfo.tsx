
import React from 'react';

interface MentorInfoProps {
  mentor: string | null;
  skills?: string[];
  speciality?: string;
}

export const MentorInfo: React.FC<MentorInfoProps> = ({ mentor, speciality }) => {
  return (
    <div className="mt-2">
      <p className="text-xs text-muted-foreground">Précepteur:</p>
      <p className="text-sm font-medium">{mentor || 'Aucun'}</p>
      
      {speciality && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground">Spécialité:</p>
          <p className="text-sm font-medium">{speciality}</p>
        </div>
      )}
    </div>
  );
};
