
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PreceptorHeader } from './components/PreceptorHeader';
import { PreceptorQualityStars } from './components/PreceptorQualityStars';
import { PreceptorSpeciality } from './components/PreceptorSpeciality';
import { PreceptorBiography } from './components/PreceptorBiography';
import { PreceptorCostInfo } from './components/PreceptorCostInfo';
import { PreceptorActions } from './components/PreceptorActions';
import { PreceptorNotFound } from './components/PreceptorNotFound';
import { PreceptorLoading } from './components/PreceptorLoading';
import { useEducation } from './context/EducationContext';
import { useNavigate } from 'react-router-dom';
import { Preceptor } from './types/educationTypes';

export const PreceptorDetail: React.FC = () => {
  const { preceptorId } = useParams<{ preceptorId: string }>();
  const [searchParams] = useSearchParams();
  const childId = searchParams.get('childId');
  const navigate = useNavigate();
  
  const { 
    preceptors, 
    hirePreceptor,
    hiredPreceptors,
    refreshPreceptors 
  } = useEducation();
  
  // État pour le précepteur sélectionné
  const [preceptor, setPreceptor] = useState<Preceptor | null>(null);
  const [loading, setLoading] = useState(true);
  const [hiring, setHiring] = useState(false);
  
  useEffect(() => {
    // Assurons-nous que les précepteurs sont chargés
    if (Object.keys(preceptors).length === 0) {
      refreshPreceptors();
    }
    
    // Simulons un chargement
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [preceptors, refreshPreceptors]);
  
  useEffect(() => {
    if (!loading && preceptorId) {
      // Cherchons d'abord parmi les précepteurs embauchés
      const hiredPreceptor = hiredPreceptors.find(p => p.id === preceptorId);
      if (hiredPreceptor) {
        setPreceptor(hiredPreceptor);
        return;
      }
      
      // Sinon, chercher dans tous les types de précepteurs disponibles
      let foundPreceptor: Preceptor | null = null;
      
      Object.values(preceptors).forEach(preceptorList => {
        const found = preceptorList.find(p => p.id === preceptorId);
        if (found) {
          foundPreceptor = found;
        }
      });
      
      setPreceptor(foundPreceptor);
    }
  }, [preceptorId, preceptors, hiredPreceptors, loading]);
  
  // Gérer l'embauche du précepteur
  const handleHire = () => {
    if (!preceptor) return;
    
    setHiring(true);
    
    const success = hirePreceptor(preceptor, childId || undefined);
    
    if (success) {
      // Rediriger après un court délai pour donner l'impression d'un processus
      setTimeout(() => {
        setHiring(false);
        
        // Rediriger vers la page de détail de l'enfant si un enfant était spécifié
        if (childId) {
          navigate(`/famille/education/child/${childId}`);
        } else {
          navigate('/famille/education');
        }
      }, 1500);
    } else {
      setHiring(false);
    }
  };
  
  // Afficher un chargement pendant la recherche du précepteur
  if (loading) {
    return <PreceptorLoading />;
  }
  
  // Si le précepteur n'a pas été trouvé
  if (!preceptor) {
    return <PreceptorNotFound />;
  }
  
  return (
    <div className="preceptor-detail space-y-6">
      {/* En-tête avec le nom du précepteur */}
      <PreceptorHeader 
        name={preceptor.name} 
        reputation={preceptor.reputation}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Qualité du précepteur (étoiles) */}
          <PreceptorQualityStars quality={preceptor.quality} />
          
          {/* Spécialité du précepteur */}
          <PreceptorSpeciality speciality={preceptor.speciality} />
          
          {/* Biographie du précepteur */}
          <PreceptorBiography background={preceptor.background} />
        </div>
        
        <div className="space-y-6">
          {/* Informations sur le coût */}
          <PreceptorCostInfo 
            cost={preceptor.cost} 
            available={preceptor.available}
          />
          
          {/* Actions (embaucher, retour) */}
          <PreceptorActions 
            cost={preceptor.cost}
            available={preceptor.available}
            onHire={handleHire}
            isHiring={hiring}
          />
        </div>
      </div>
    </div>
  );
};
