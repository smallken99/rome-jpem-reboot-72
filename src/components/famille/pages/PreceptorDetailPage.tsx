
import React from 'react';
import { useParams } from 'react-router-dom';
import { PreceptorDetail } from '../education/PreceptorDetail';
import { usePreceptors } from '../hooks/usePreceptors';
import { NotFound } from '@/components/ui-custom/NotFound';

export const PreceptorDetailPage: React.FC = () => {
  const { preceptorId } = useParams<{ preceptorId: string }>();
  const { getPreceptorById } = usePreceptors();
  
  if (!preceptorId) {
    return <NotFound title="Précepteur non trouvé" description="L'identifiant du précepteur n'est pas valide." />;
  }
  
  const preceptor = getPreceptorById(preceptorId);
  
  if (!preceptor) {
    return <NotFound title="Précepteur non trouvé" description="Le précepteur demandé n'existe pas ou a été supprimé." />;
  }
  
  return <PreceptorDetail preceptor={preceptor} onBack={() => window.history.back()} />;
};
