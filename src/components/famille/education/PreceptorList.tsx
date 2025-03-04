
import React from 'react';
import { ShieldQuestion, TrendingUp, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { educationPaths } from './EducationData';
import { PreceptorsByType } from './types/educationTypes';
import { Badge } from '@/components/ui/badge';
import { getRelatedStatName } from './utils/educationUtils';

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
          // Get the related stat name
          const relatedStat = getRelatedStatName(type);
          
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
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-medium">{teacher.name}</h4>
                        {teacher.gender === 'female' ? (
                          <Badge variant="outline" className="bg-pink-50 text-pink-700 text-xs py-0 h-5 border-pink-200">
                            <User className="h-3 w-3 mr-1" /> F
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs py-0 h-5 border-blue-200">
                            <User className="h-3 w-3 mr-1" /> H
                          </Badge>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        teacher.reputation === 'Excellent' ? 'bg-green-100 text-green-800' :
                        teacher.reputation === 'Bon' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {teacher.reputation}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">Spécialité: {teacher.speciality}</p>
                    
                    {/* Display stat bonus information */}
                    <div className="mt-2 flex items-center gap-1 text-xs bg-green-50 p-2 rounded text-green-700">
                      <TrendingUp className="h-3 w-3" />
                      <span>Bonus à {relatedStat}: +{teacher.statBonus} points après validation</span>
                    </div>
                    
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
