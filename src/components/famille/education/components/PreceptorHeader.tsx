
import React from 'react';

export interface PreceptorHeaderProps {
  preceptor: {
    name: string;
    reputation: "Excellent" | "Bon" | "Moyen";
  };
}

export const PreceptorHeader: React.FC<PreceptorHeaderProps> = ({ preceptor }) => {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-2xl font-bold">{preceptor.name}</h2>
      <p className="text-muted-foreground">
        Réputation: <span className="font-semibold">{preceptor.reputation}</span>
      </p>
    </div>
  );
};
