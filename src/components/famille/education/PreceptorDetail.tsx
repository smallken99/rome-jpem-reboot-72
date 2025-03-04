
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, GraduationCap, Coins, Award, Star } from 'lucide-react';
import { toast } from 'sonner';

// Les données simulées pour le précepteur
const preceptorTypes = ['rhetoric', 'philosophy', 'military', 'religion', 'arts'];

interface Preceptor {
  id: string;
  name: string;
  type: string;
  specialty: string;
  cost: number;
  quality: number;
  background: string;
  available: boolean;
}

export const PreceptorDetail: React.FC = () => {
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
  
  // Afficher un message de chargement pendant la recherche
  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Chargement des informations du précepteur...</p>
      </div>
    );
  }
  
  // Si aucun précepteur n'est trouvé
  if (!preceptor) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-medium mb-4">Précepteur non trouvé</h2>
        <ActionButton 
          label="Retour aux précepteurs" 
          to="/famille/education/preceptors"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
    );
  }
  
  // Fonction pour afficher les étoiles de qualité
  const renderQualityStars = (quality: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < quality ? 'text-rome-gold fill-rome-gold' : 'text-gray-300'}`}
      />
    ));
  };
  
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
        <CardHeader className="pb-2 border-b border-rome-gold/20">
          <div className="flex justify-between items-center">
            <div className="font-cinzel text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-rome-navy" />
              <span>{preceptor.name}</span>
            </div>
            <div className="flex items-center gap-1">
              {renderQualityStars(preceptor.quality)}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-rome-navy" />
                <span>Spécialité</span>
              </h3>
              
              <div className="space-y-3">
                <div className="bg-rome-parchment/50 p-3 rounded-md">
                  <div className="font-medium mb-1">Type d'enseignement</div>
                  <div className="text-sm capitalize">{preceptor.type}</div>
                </div>
                
                <div className="bg-rome-parchment/50 p-3 rounded-md">
                  <div className="font-medium mb-1">Domaine de spécialité</div>
                  <div className="text-sm">{preceptor.specialty}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Coins className="h-5 w-5 text-rome-gold" />
                <span>Coût & Disponibilité</span>
              </h3>
              
              <div className="space-y-3">
                <div className="bg-rome-parchment/50 p-3 rounded-md">
                  <div className="font-medium mb-1">Coût annuel</div>
                  <div className="text-sm">{preceptor.cost.toLocaleString()} As par an</div>
                </div>
                
                <div className={`p-3 rounded-md ${preceptor.available ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="font-medium mb-1">Statut</div>
                  <div className={`text-sm ${preceptor.available ? 'text-green-700' : 'text-red-700'}`}>
                    {preceptor.available ? 'Disponible immédiatement' : 'Non disponible actuellement'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-rome-navy" />
              <span>Biographie & Expertise</span>
            </h3>
            
            <div className="bg-rome-parchment/20 p-3 rounded-md">
              <p className="text-sm leading-relaxed">{preceptor.background}</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <ActionButton 
              variant="outline"
              label="Retour"
              to="/famille/education/preceptors"
            />
            <ActionButton 
              label={`Embaucher (${preceptor.cost.toLocaleString()} As/an)`}
              onClick={handleHire}
              disabled={!preceptor.available}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreceptorDetail;
