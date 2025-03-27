
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCharacters } from './hooks/useCharacters';
import { Character } from '@/types/character';

interface MarriageAlliancesProps {
  characters: Character[];
  onChildBirth?: (parentIds?: string[]) => void;
}

export const MarriageAlliances: React.FC<MarriageAlliancesProps> = ({
  characters,
  onChildBirth
}) => {
  return (
    <Layout>
      <PageHeader 
        title="Alliances Matrimoniales"
        subtitle="Établissez des alliances stratégiques pour renforcer votre influence"
      />
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Alliances Disponibles</CardTitle>
          <CardDescription>
            Explorez les possibilités d'alliances avec d'autres familles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Fonctionnalité en cours de développement</p>
        </CardContent>
      </Card>
    </Layout>
  );
};
