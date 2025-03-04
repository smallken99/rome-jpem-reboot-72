
import React from 'react';
import { ShieldQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { educationPaths } from './EducationData';

// Type for a preceptor (teacher)
type Preceptor = {
  id: string;
  name: string;
  speciality: string;
  reputation: 'Excellent' | 'Bon' | 'Moyen';
  fee: number;
};

type PreceptorsByType = {
  [key: string]: Preceptor[];
};

interface PreceptorListProps {
  preceptors: PreceptorsByType;
  refreshPreceptors: () => void;
}

export const PreceptorList: React.FC<PreceptorListProps> = ({ preceptors, refreshPreceptors }) => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          onClick={refreshPreceptors}
          className="border-rome-gold/30 hover:bg-rome-gold/10 hover:text-rome-navy"
        >
          Actualiser la Liste des Précepteurs
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {Object.entries(preceptors).map(([type, teacherList]) => {
          // Get the education path title
          const pathTitle = educationPaths.find(path => path.type === type)?.title || type;
          // Get the education path icon
          const pathIcon = educationPaths.find(path => path.type === type)?.icon || <ShieldQuestion className="h-5 w-5" />;
          
          return (
            <div key={type} className="roman-card p-4">
              <div className="flex items-center gap-2 mb-3">
                {pathIcon}
                <h3 className="font-cinzel">Précepteurs en {pathTitle.replace('Éducation ', '')}</h3>
              </div>
              
              <div className="space-y-4">
                {teacherList.map(teacher => (
                  <div key={teacher.id} className="border border-muted rounded p-3 hover:border-rome-gold/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{teacher.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        teacher.reputation === 'Excellent' ? 'bg-green-100 text-green-800' :
                        teacher.reputation === 'Bon' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {teacher.reputation}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">Spécialité: {teacher.speciality}</p>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm font-medium">{teacher.fee} denarii/an</span>
                      <button className="roman-btn-outline text-xs">Engager</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
