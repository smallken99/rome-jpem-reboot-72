
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PreceptorActions } from './components/PreceptorActions';
import { PreceptorStats } from './components/PreceptorStats';
import { useEducation } from './context/EducationContext';
import { useEconomy } from '@/hooks/useEconomy';
import { toast } from 'sonner';
import { ArrowLeft, Scroll } from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const PreceptorDetail: React.FC = () => {
  const { preceptorId } = useParams<{ preceptorId: string }>();
  const navigate = useNavigate();
  const { getPreceptorById, hirePreceptor, firePreceptor } = useEducation();
  const { balance, deductCost, hasEnoughFunds } = useEconomy();
  const [isLoading, setIsLoading] = useState(false);
  
  const preceptor = preceptorId ? getPreceptorById(preceptorId) : null;
  
  if (!preceptor) {
    return (
      <div className="p-4 text-center">
        <p>Précepteur non trouvé.</p>
        <Button onClick={() => navigate('/famille/education/preceptors')} className="mt-4">
          Retour à la liste
        </Button>
      </div>
    );
  }
  
  const isHired = preceptor.status === 'hired' || preceptor.status === 'assigned';
  const isAssigned = preceptor.status === 'assigned';
  const cost = preceptor.cost || 2000;
  
  const handleHire = () => {
    if (!preceptorId) return;
    
    if (!hasEnoughFunds(cost)) {
      toast.error(`Fonds insuffisants pour engager ce précepteur (${cost} As)`);
      return;
    }
    
    setIsLoading(true);
    
    // Simuler un délai pour l'engagement
    setTimeout(() => {
      const success = hirePreceptor(preceptorId);
      
      if (success) {
        deductCost(cost, 'Recrutement d\'un précepteur');
        toast.success(`Vous avez engagé ${preceptor.name} comme précepteur`);
      } else {
        toast.error(`Impossible d'engager ce précepteur`);
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handleFire = () => {
    if (!preceptorId) return;
    
    if (isAssigned) {
      toast.error(`Ce précepteur est actuellement assigné à un enfant. Veuillez d'abord le désassigner.`);
      return;
    }
    
    setIsLoading(true);
    
    // Simuler un délai pour le licenciement
    setTimeout(() => {
      firePreceptor(preceptorId);
      toast.success(`Vous avez renvoyé ${preceptor.name}`);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Profil du Précepteur</h2>
        <Button variant="outline" onClick={() => navigate('/famille/education/preceptors')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{preceptor.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Spécialité</p>
                <p className="font-medium">{preceptor.specialty || preceptor.speciality}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Niveau</p>
                <p className="font-medium">{preceptor.level || "Débutant"}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Coût</p>
                <p className="font-medium">{cost} As par an</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Statut</p>
                <p className="font-medium">{
                  isAssigned ? 'Assigné' : 
                  isHired ? 'Engagé' : 
                  'Disponible'
                }</p>
              </div>
              
              <div className="pt-4 flex gap-2">
                <PreceptorActions
                  preceptorId={preceptorId}
                  isAssigned={isAssigned}
                  onAssign={() => {}}
                  onDismiss={() => {}}
                  onViewDetails={() => {}}
                  onPaySalary={() => {}}
                  canAssign={!isHired && hasEnoughFunds(cost)}
                  canDismiss={isHired && !isAssigned}
                  canPaySalary={isHired}
                />
                
                {!isHired && (
                  <Button 
                    onClick={handleHire} 
                    disabled={isLoading}
                    className="ml-auto"
                  >
                    Engager pour {cost} As
                  </Button>
                )}
                
                {isHired && !isAssigned && (
                  <Button 
                    onClick={handleFire} 
                    disabled={isLoading}
                    variant="destructive"
                    className="ml-auto"
                  >
                    Renvoyer
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex items-center">
                <Scroll className="h-5 w-5 mr-2" />
                <h3 className="font-cinzel">Compétences</h3>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <PreceptorStats preceptor={preceptor} />
            </RomanCard.Content>
          </RomanCard>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Philosophie d'enseignement</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{preceptor.description || `${preceptor.name} est un précepteur spécialisé en ${preceptor.specialty || preceptor.speciality}. Il possède une bonne connaissance de sa matière et sait transmettre son savoir aux enfants.`}</p>
        </CardContent>
      </Card>
    </div>
  );
};
