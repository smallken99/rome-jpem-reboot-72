
import React from 'react';

export interface PreceptorBiographyProps {
  bio: string;
}

export const PreceptorBiography: React.FC<PreceptorBiographyProps> = ({ bio }) => {
  return (
    <div className="text-muted-foreground">
      <p>{bio}</p>
    </div>
  );
};
