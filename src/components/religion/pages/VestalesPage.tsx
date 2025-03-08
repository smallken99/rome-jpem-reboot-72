
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const VestalesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Les Vestales" subtitle="Gardiennes de la flamme sacrée" />
      <RomanCard>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              Les Vestales sont des prêtresses consacrées à Vesta, déesse du foyer et du feu sacré. Elles sont choisies parmi les jeunes filles des meilleures familles patriciennes de Rome.
            </p>
            <p>
              Leur principal devoir est d'entretenir le feu sacré dans le temple de Vesta, qui ne doit jamais s'éteindre. Elles préparent également la mola salsa, farine sacrée utilisée lors des sacrifices, et gardent des objets sacrés comme le Palladium.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
