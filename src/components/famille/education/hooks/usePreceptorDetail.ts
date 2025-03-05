
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

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
  
  // État pour stocker les données du précepteur
  const [preceptor, setPreceptor] = useState<Preceptor | null>(null);
  const [loading, setLoading] = useState(true);
  
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
    
    // Afficher un message de succès
    toast.success(`${preceptor.name} a été embauché comme précepteur`);
    
    // Rediriger vers la page appropriée
    if (childId) {
      navigate(`/famille/education/child/${childId}`);
    } else {
      navigate('/famille/education/preceptors');
    }
  };

  return {
    preceptor,
    loading,
    childId,
    handleHire
  };
};
