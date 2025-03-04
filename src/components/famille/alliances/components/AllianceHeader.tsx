
import React from 'react';
import { Heart } from 'lucide-react';
import { Character } from '@/types/character';

interface AllianceHeaderProps {
  female: Character;
}

export const AllianceHeader: React.FC<AllianceHeaderProps> = ({ female }) => {
  return (
    <div className="bg-rome-parchment/50 p-4 rounded-md">
      <h2 className="font-cinzel text-xl mb-2 flex items-center gap-2">
        <Heart className="h-5 w-5 text-rome-terracotta" />
        Alliance Matrimoniale pour {female.name}
      </h2>
      <p className="text-muted-foreground text-sm">
        Âge: {female.age} ans • Statut: {female.role || "Fille de la famille"}
      </p>
      <div className="mt-4 text-sm">
        <p>
          Les alliances matrimoniales sont essentielles pour l'expansion de l'influence de votre Gens. 
          Une dot généreuse attirera des familles plus prestigieuses et renforcera votre position politique.
        </p>
      </div>
    </div>
  );
};
