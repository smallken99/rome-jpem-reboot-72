
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Les données simulées pour le précepteur
const preceptorTypes = ['rhetoric', 'philosophy', 'military', 'religion', 'arts'];

export interface Preceptor {
  id: string;
  name: string;
  type: string;
  specialty: string;
  cost: number;
  quality: number;
  background: string;
  available: boolean;
}

export const usePreceptorDetail = () => {
  const { preceptorId } = useParams<{ preceptorId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const childId = searchParams.get('childId');
  const { toast } = useToast();
  
  // État pour stocker les données du précepteur
  const [preceptor, setPreceptor] = useState<Preceptor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHiring, setIsHiring] = useState(false);
  
  // Simuler le chargement des données du précepteur
  useEffect(() => {
    setLoading(true);
    
    // Simulation d'une recherche de précepteur par ID
    setTimeout(() => {
      // Si nous avons un ID de précepteur, nous simulons la recherche
      if (preceptorId) {
        // Simuler un précepteur trouvé
        const mockPreceptor: Preceptor = {
          id: preceptorId,
          name: "Marcus Tullius",
          type: preceptorTypes[Math.floor(Math.random() * preceptorTypes.length)],
          specialty: "Rhétorique Cicéronienne",
          cost: 5000 + Math.floor(Math.random() * 5000),
          quality: 3 + Math.floor(Math.random() * 3),
          background: "Ancien orateur au Sénat, a étudié à Athènes pendant dix ans. Spécialiste de l'éloquence et de la persuasion.",
          available: true
        };
        
        setPreceptor(mockPreceptor);
      }
      
      setLoading(false);
    }, 500);
  }, [preceptorId]);
  
  const handleHire = () => {
    if (!preceptor) return;
    
    setIsHiring(true);
    
    // Simuler le temps de traitement
    setTimeout(() => {
      // Afficher un message de succès
      toast({
        title: "Précepteur embauché",
        description: `${preceptor.name} a été embauché comme précepteur pour ${childId ? 'votre enfant' : 'votre famille'}.`,
      });
      
      setIsHiring(false);
      
      // Rediriger vers la page appropriée
      setTimeout(() => {
        if (childId) {
          navigate(`/famille/education/child/${childId}`);
        } else {
          navigate('/famille/education/preceptors');
        }
      }, 500);
    }, 1000);
  };

  return {
    preceptor,
    loading,
    childId,
    isHiring,
    handleHire
  };
};
