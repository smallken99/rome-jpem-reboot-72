
import React from 'react';
import { Award } from 'lucide-react';

interface PreceptorBiographyProps {
  background: string;
}

export const PreceptorBiography: React.FC<PreceptorBiographyProps> = ({ background }) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <Award className="h-5 w-5 text-rome-navy" />
        <span>Biographie & Expertise</span>
      </h3>
      
      <div className="bg-rome-parchment/20 p-3 rounded-md">
        <p className="text-sm leading-relaxed">{background}</p>
      </div>
    </div>
  );
};
