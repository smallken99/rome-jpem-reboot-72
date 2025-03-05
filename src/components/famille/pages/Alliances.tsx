
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { MarriageAlliances } from '@/components/famille/MarriageAlliances';
import { characters } from '@/data/characters';

export const Alliances: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Alliances Matrimoniales"
        subtitle="Gérez les alliances avec d'autres familles"
      />
      <div className="roman-card">
        <MarriageAlliances characters={characters} />
      </div>
    </Layout>
  );
};
