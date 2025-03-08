
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { PreceptorHeader } from './components/PreceptorHeader';
import { PreceptorSpeciality } from './components/PreceptorSpeciality';
import { PreceptorCostInfo } from './components/PreceptorCostInfo';
import { PreceptorBiography } from './components/PreceptorBiography';
import { PreceptorActions } from './components/PreceptorActions';
import { PreceptorLoading } from './components/PreceptorLoading';
import { PreceptorNotFound } from './components/PreceptorNotFound';
import { useEducation } from './context/EducationContext';
import { Preceptor } from './types/educationTypes';
import { useNavigate } from 'react-router-dom';

export const PreceptorDetail: React.FC = () => {
  const { preceptorId } = useParams<{ preceptorId: string }>();
  const [searchParams] = useSearchParams();
  const childId = searchParams.get('childId');
  const educationType = searchParams.get('type');
  const navigate = useNavigate();
  
  const {
    preceptors,
    hirePreceptor,
    assignPreceptorToChild,
    hiringInProgress
  } = useEducation();
  
  const [preceptor, setPreceptor] = useState<Preceptor | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Find preceptor from all preceptors by id or from URL parameters
  useEffect(() => {
    setLoading(true);
    
    // Create a flat array of all preceptors
    const allPreceptors: Preceptor[] = [];
    
    // Look through all education types
    Object.entries(preceptors).forEach(([type, typePreceptors]) => {
      // Only include preceptors of the requested education type if specified
      if (!educationType || type === educationType) {
        allPreceptors.push(...typePreceptors);
      }
    });
    
    // Find the preceptor by ID
    const foundPreceptor = preceptorId 
      ? allPreceptors.find(p => p.id === preceptorId)
      : null;
    
    if (foundPreceptor) {
      // Create a more detailed preceptor object for display
      setPreceptor({
        ...foundPreceptor,
        // Add additional fields for the UI
        type: educationType || determineEducationType(foundPreceptor.speciality),
        cost: foundPreceptor.fee,
        available: true, // Assume available by default
        background: `Précepteur expérimenté spécialisé en ${foundPreceptor.speciality}. ${
          foundPreceptor.reputation === 'Excellent' 
            ? 'Reconnu comme l\'un des meilleurs dans son domaine.'
            : foundPreceptor.reputation === 'Bon'
            ? 'Jouissant d\'une bonne réputation parmi ses pairs.'
            : 'De réputation correcte dans sa discipline.'
        }`
      });
    }
    
    setLoading(false);
  }, [preceptorId, preceptors, educationType]);
  
  // Helper to determine education type from specialty
  const determineEducationType = (specialty: string): string => {
    const specialty_lower = specialty.toLowerCase();
    
    if (specialty_lower.includes('tactique') || specialty_lower.includes('militaire')) 
      return 'military';
    if (specialty_lower.includes('rhétorique') || specialty_lower.includes('politique')) 
      return 'political';
    if (specialty_lower.includes('rituel') || specialty_lower.includes('religieux')) 
      return 'religious';
    if (specialty_lower.includes('commerce') || specialty_lower.includes('économie')) 
      return 'commercial';
    
    return 'political'; // Default to political education
  };
  
  // Handle hiring the preceptor
  const handleHire = () => {
    if (!preceptor) return;
    
    const success = hirePreceptor(preceptor, childId || undefined);
    
    // If we have a child ID, also assign the preceptor to that child
    if (success && childId) {
      assignPreceptorToChild(preceptor.id, childId);
      
      // Navigate back to child education page
      setTimeout(() => {
        navigate(`/famille/education/child/${childId}`);
      }, 1500);
    } else if (success) {
      // Navigate back to preceptors list
      setTimeout(() => {
        navigate('/famille/education/preceptors');
      }, 1500);
    }
  };
  
  // Afficher un message de chargement pendant la recherche
  if (loading) {
    return <PreceptorLoading />;
  }
  
  // Si aucun précepteur n'est trouvé
  if (!preceptor) {
    return <PreceptorNotFound />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-cinzel font-medium">Détails du Précepteur</h2>
        <ActionButton 
          label="Retour aux précepteurs" 
          to="/famille/education/preceptors"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      
      <Card className="border-rome-gold/30">
        <PreceptorHeader preceptor={preceptor} />
        
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <PreceptorSpeciality 
              type={preceptor.type} 
              specialty={preceptor.speciality} 
            />
            
            <PreceptorCostInfo 
              cost={preceptor.cost} 
              available={preceptor.available} 
            />
          </div>
          
          <PreceptorBiography background={preceptor.background} />
          
          <PreceptorActions 
            cost={preceptor.cost} 
            available={preceptor.available && !hiringInProgress} 
            onHire={handleHire}
            isHiring={hiringInProgress}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PreceptorDetail;
