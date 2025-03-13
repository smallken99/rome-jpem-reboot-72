
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { PreceptorDetail } from '@/components/famille/education/PreceptorDetail';

export const PreceptorDetailPage: React.FC = () => {
  const { preceptorId } = useParams<{ preceptorId: string }>();
  
  return (
    <Layout>
      <PageHeader 
        title="Détail du Précepteur"
        subtitle="Gestion et affectation du précepteur"
      />
      <div className="roman-card">
        <PreceptorDetail preceptorId={preceptorId || ''} />
      </div>
    </Layout>
  );
};
