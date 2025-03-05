
import React from 'react';
import { GraduationCap } from 'lucide-react';

interface PreceptorSpecialityProps {
  type: string;
  specialty: string;
}

export const PreceptorSpeciality: React.FC<PreceptorSpecialityProps> = ({ type, specialty }) => {
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-rome-navy" />
        <span>Spécialité</span>
      </h3>
      
      <div className="space-y-3">
        <div className="bg-rome-parchment/50 p-3 rounded-md">
          <div className="font-medium mb-1">Type d'enseignement</div>
          <div className="text-sm capitalize">{type}</div>
        </div>
        
        <div className="bg-rome-parchment/50 p-3 rounded-md">
          <div className="font-medium mb-1">Domaine de spécialité</div>
          <div className="text-sm">{specialty}</div>
        </div>
      </div>
    </div>
  );
};
