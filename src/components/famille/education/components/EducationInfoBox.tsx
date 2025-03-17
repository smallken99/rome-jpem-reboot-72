
import React from 'react';
import { AlertCircle, BookOpen, Users } from 'lucide-react';
import { useEducation } from '../context/EducationContext';

export const EducationInfoBox: React.FC = () => {
  const { children, preceptors, isLoading } = useEducation();
  
  // Count children in education
  const childrenInEducation = children.filter(child => 
    child.currentEducation && 
    child.currentEducation.type && 
    child.currentEducation.type !== 'none'
  ).length;
  
  // Count available preceptors
  const availablePreceptors = preceptors.filter(p => p.available).length;
  
  if (isLoading) {
    return (
      <div className="border rounded-md p-4 bg-muted/20 animate-pulse">
        <div className="h-4 w-1/2 bg-muted rounded mb-2"></div>
        <div className="h-3 w-full bg-muted rounded"></div>
      </div>
    );
  }
  
  if (!children.length) {
    return (
      <div className="border rounded-md p-4 bg-amber-50 text-amber-800 flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-amber-500" />
        <p>Aucun enfant n'est disponible pour l'éducation dans votre famille.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-md p-4 flex items-start gap-3">
        <BookOpen className="h-6 w-6 text-blue-500" />
        <div>
          <h3 className="font-medium">Éducation en cours</h3>
          <p className="text-sm text-muted-foreground">
            {childrenInEducation 
              ? `${childrenInEducation} enfant${childrenInEducation > 1 ? 's' : ''} en éducation` 
              : "Aucun enfant en éducation actuellement"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {children.length} enfant{children.length > 1 ? 's' : ''} au total dans la famille
          </p>
        </div>
      </div>
      
      <div className="border rounded-md p-4 flex items-start gap-3">
        <Users className="h-6 w-6 text-purple-500" />
        <div>
          <h3 className="font-medium">Précepteurs</h3>
          <p className="text-sm text-muted-foreground">
            {availablePreceptors 
              ? `${availablePreceptors} précepteur${availablePreceptors > 1 ? 's' : ''} disponible${availablePreceptors > 1 ? 's' : ''}` 
              : "Aucun précepteur disponible actuellement"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {preceptors.length - availablePreceptors} précepteur{preceptors.length - availablePreceptors !== 1 ? 's' : ''} déjà embauché{preceptors.length - availablePreceptors !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
