
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { preceptorDatabase } from './data/preceptorDatabase';
import { EducationType, Preceptor } from './types/educationTypes';
import { useEducation } from './context/EducationContext';
import { PreceptorDetailHeader } from './components/PreceptorDetailHeader';
import { PreceptorStats } from './components/PreceptorStats';
import { PreceptorActions } from './components/PreceptorActions';
import { PreceptorAssignmentPanel } from './components/PreceptorAssignmentPanel';
import { toast } from 'sonner';

interface PreceptorDetailProps {
  preceptorId: string;
}

export const PreceptorDetail: React.FC<PreceptorDetailProps> = ({ preceptorId }) => {
  const navigate = useNavigate();
  const { children, hirePreceptor, firePreceptor, assignPreceptorToChild, getPreceptorById } = useEducation();
  
  const [preceptor, setPreceptor] = useState<Preceptor | null>(null);
  const [isHiring, setIsHiring] = useState(false);
  const [isFiring, setIsFiring] = useState(false);
  const [showAssignPanel, setShowAssignPanel] = useState(false);
  
  useEffect(() => {
    // Recherche du précepteur par ID
    const foundPreceptor = getPreceptorById ? 
      getPreceptorById(preceptorId) : 
      preceptorDatabase.getPreceptors().find(p => p.id === preceptorId);
    
    if (foundPreceptor) {
      setPreceptor(foundPreceptor);
    } else {
      toast.error("Précepteur non trouvé");
      navigate('/famille/education/preceptors');
    }
  }, [preceptorId, navigate, getPreceptorById]);
  
  if (!preceptor) {
    return <div className="p-6 text-center">Chargement des détails du précepteur...</div>;
  }
  
  const handleHire = () => {
    setIsHiring(true);
    setTimeout(() => {
      const success = hirePreceptor(preceptorId);
      if (success) {
        toast.success(`${preceptor.name} a été engagé avec succès!`);
        setShowAssignPanel(true);
      } else {
        toast.error("Impossible d'engager ce précepteur pour le moment.");
      }
      setIsHiring(false);
    }, 1000);
  };
  
  const handleFire = () => {
    setIsFiring(true);
    setTimeout(() => {
      firePreceptor(preceptorId);
      toast.success(`${preceptor.name} a été renvoyé.`);
      setIsFiring(false);
      navigate('/famille/education/preceptors');
    }, 1000);
  };
  
  const handleAssign = (childId: string) => {
    assignPreceptorToChild(childId, preceptorId);
    toast.success(`${preceptor.name} a été assigné à l'éducation de l'enfant.`);
    navigate(`/famille/education/child/${childId}`);
  };
  
  // Filtrer les enfants éligibles pour ce précepteur
  const eligibleChildren = children.filter(child => 
    child.educationType && 
    (child.educationType as EducationType) === preceptor.specialty && 
    !child.preceptorId
  );
  
  const isAssigned = preceptor.assigned || false;
  const assignedChild = children.find(child => child.preceptorId === preceptorId);
  
  return (
    <div className="space-y-6">
      <PreceptorDetailHeader 
        preceptor={preceptor} 
        isAssigned={isAssigned}
        assignedTo={assignedChild?.name}
      />
      
      <Card>
        <CardContent className="p-6 space-y-6">
          <PreceptorStats preceptor={preceptor} />
          
          {showAssignPanel && !isAssigned && eligibleChildren.length > 0 && (
            <PreceptorAssignmentPanel 
              children={eligibleChildren}
              onAssign={handleAssign}
              specialty={preceptor.specialty as EducationType}
            />
          )}
          
          <PreceptorActions
            onHire={handleHire}
            isAvailable={!isAssigned}
            isLoading={isHiring || isFiring}
            onCancel={() => navigate('/famille/education/preceptors')}
            onFire={handleFire}
            isHired={isAssigned}
            cost={preceptor.price || preceptor.cost}
          />
        </CardContent>
      </Card>
      
      {isAssigned && assignedChild && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Assigné à</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{assignedChild.name}</p>
                <p className="text-sm text-muted-foreground">
                  {assignedChild.educationType === 'military' && 'Éducation Militaire'}
                  {assignedChild.educationType === 'rhetoric' && 'Éducation Rhétorique'}
                  {assignedChild.educationType === 'religious' && 'Éducation Religieuse'}
                  {assignedChild.educationType === 'academic' && 'Éducation Académique'}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/famille/education/child/${assignedChild.id}`)}
              >
                Voir détails
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
