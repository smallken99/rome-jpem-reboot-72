
import React from 'react';
import { BookOpen, Users } from 'lucide-react';
import { useEducation } from '../context/EducationContext';

export const EducationHeader: React.FC = () => {
  const { children, hiredPreceptors } = useEducation();
  
  const childrenInEducation = children.filter(
    child => child.currentEducation?.type && child.currentEducation.type !== 'none'
  );
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold font-cinzel">Éducation des Enfants</h2>
        <p className="text-muted-foreground">
          Formez la prochaine génération pour perpétuer l'héritage familial
        </p>
      </div>
      
      <div className="flex gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm">{childrenInEducation.length} enfants en formation</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded">
          <Users className="h-4 w-4" />
          <span className="text-sm">{hiredPreceptors.length} précepteurs employés</span>
        </div>
      </div>
    </div>
  );
};
