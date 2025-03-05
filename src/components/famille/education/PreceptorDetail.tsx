
import React from 'react';
import { usePreceptorDetail } from './hooks/usePreceptorDetail';
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

export const PreceptorDetail: React.FC = () => {
  const { preceptor, loading, handleHire } = usePreceptorDetail();
  
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
              specialty={preceptor.specialty} 
            />
            
            <PreceptorCostInfo 
              cost={preceptor.cost} 
              available={preceptor.available} 
            />
          </div>
          
          <PreceptorBiography background={preceptor.background} />
          
          <PreceptorActions 
            cost={preceptor.cost} 
            available={preceptor.available} 
            onHire={handleHire} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PreceptorDetail;
