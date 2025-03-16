
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useEducation } from '../context/EducationContext';
import ChildEducationCard from '../ChildEducationCard';

export const ChildrenTab: React.FC = () => {
  const { children } = useEducation();
  const navigate = useNavigate();
  
  // Enfants avec et sans éducation
  const childrenWithEducation = children.filter(child => child.educationType !== 'none');
  const childrenWithoutEducation = children.filter(child => child.educationType === 'none');
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Éducation des Enfants</h2>
        <Button 
          onClick={() => navigate('/famille/education/add-child')}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter un enfant
        </Button>
      </div>
      
      {/* Enfants en cours d'éducation */}
      {childrenWithEducation.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-medium">
            En cours d'éducation ({childrenWithEducation.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {childrenWithEducation.map(child => (
              <ChildEducationCard key={child.id} child={child} />
            ))}
          </div>
        </div>
      )}
      
      {/* Enfants sans éducation */}
      {childrenWithoutEducation.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-medium">
            Sans éducation ({childrenWithoutEducation.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {childrenWithoutEducation.map(child => (
              <ChildEducationCard key={child.id} child={child} />
            ))}
          </div>
        </div>
      )}
      
      {/* Aucun enfant */}
      {children.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            Vous n'avez pas encore d'enfants enregistrés pour l'éducation.
          </p>
          <Button 
            onClick={() => navigate('/famille/education/add-child')}
          >
            Ajouter un enfant
          </Button>
        </div>
      )}
    </div>
  );
};
