
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEducation } from './context/EducationContext';
import { PreceptorHeader } from './components/PreceptorHeader';
import { PreceptorQualityStars } from './components/PreceptorQualityStars';
import { PreceptorSpeciality } from './components/PreceptorSpeciality';
import { PreceptorBiography } from './components/PreceptorBiography';
import { PreceptorCostInfo } from './components/PreceptorCostInfo';
import { PreceptorActions } from './components/PreceptorActions';
import { PreceptorNotFound } from './components/PreceptorNotFound';
import { PreceptorLoading } from './components/PreceptorLoading';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Preceptor } from './types/educationTypes';

export const PreceptorDetail: React.FC = () => {
  const { preceptorId, speciality } = useParams<{ preceptorId: string, speciality: string }>();
  const navigate = useNavigate();
  const { 
    loadPreceptorsByType, 
    hirePreceptor, 
    isHiringPreceptor, 
    hiredPreceptors 
  } = useEducation();
  
  const [isLoading, setIsLoading] = useState(true);
  const [preceptor, setPreceptor] = useState<Preceptor | null>(null);
  
  // Charger le précepteur
  useEffect(() => {
    const loadPreceptor = async () => {
      setIsLoading(true);
      
      try {
        if (!preceptorId || !speciality) {
          throw new Error("Identifiant du précepteur manquant");
        }
        
        // Vérifier d'abord si ce précepteur est déjà embauché
        const existingPreceptor = hiredPreceptors.find(p => p.id === preceptorId);
        
        if (existingPreceptor) {
          setPreceptor(existingPreceptor);
        } else {
          // Sinon charger tous les précepteurs du type spécifié
          if (loadPreceptorsByType) {
            const preceptors = loadPreceptorsByType(speciality);
            const foundPreceptor = preceptors.find(p => p.id === preceptorId);
            
            if (!foundPreceptor) {
              throw new Error("Précepteur non trouvé");
            }
            
            setPreceptor(foundPreceptor);
          } else {
            throw new Error("Fonction de chargement des précepteurs non disponible");
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du précepteur:', error);
        toast.error("Impossible de charger les informations du précepteur");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPreceptor();
  }, [preceptorId, speciality, loadPreceptorsByType, hiredPreceptors]);
  
  // Gérer l'embauche du précepteur
  const handleHire = () => {
    if (!preceptor) return;
    
    hirePreceptor(preceptor.id);
    toast.success(`${preceptor.name} a été embauché avec succès!`);
    navigate('/famille/education/preceptors');
  };
  
  // Affichage pendant le chargement
  if (isLoading) {
    return <PreceptorLoading />;
  }
  
  // Si le précepteur n'a pas été trouvé
  if (!preceptor) {
    return <PreceptorNotFound />;
  }
  
  // Détermine si le précepteur est déjà engagé
  const isAlreadyHired = hiredPreceptors.some(p => p.id === preceptor.id);
  
  // Pour assurer la compatibilité
  const reputation = preceptor.reputation || (preceptor.skill >= 80 ? "Excellent" : preceptor.skill >= 60 ? "Bon" : "Moyen");
  const quality = preceptor.quality || Math.ceil(preceptor.skill / 20);
  const cost = preceptor.cost || preceptor.price;
  const specialty = preceptor.specialty || preceptor.speciality || "";
  const available = preceptor.available !== undefined ? preceptor.available : preceptor.status === 'available';
  
  return (
    <div className="space-y-6">
      {/* En-tête avec les informations du précepteur */}
      <PreceptorHeader 
        preceptor={{
          name: preceptor.name,
          reputation: reputation as "Excellent" | "Bon" | "Moyen"
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Qualité du précepteur */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Qualité</h3>
            <PreceptorQualityStars quality={quality} />
          </div>
          
          {/* Spécialité */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Spécialité</h3>
            <PreceptorSpeciality 
              type={specialty.split(' ')[0]} 
              specialty={specialty} 
            />
          </div>
          
          <Separator />
          
          {/* Biographie */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Biographie</h3>
            <PreceptorBiography bio={preceptor.background || "Un précepteur expérimenté"} />
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Informations de coût */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Informations de recrutement</h3>
            
            {isAlreadyHired ? (
              <PreceptorCostInfo 
                cost={cost} 
                available={false} 
              />
            ) : (
              <PreceptorCostInfo 
                cost={cost} 
                available={available} 
              />
            )}
            
            {/* Actions: Embaucher ou retourner */}
            <div className="mt-6">
              <PreceptorActions 
                onHire={handleHire}
                isAvailable={!isAlreadyHired && available}
                isLoading={isHiringPreceptor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
