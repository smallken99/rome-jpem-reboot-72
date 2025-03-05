
import React from 'react';

export const EducationInfoBox: React.FC = () => {
  return (
    <div className="mb-6 p-4 bg-muted rounded text-sm">
      <p className="font-medium mb-1">Hérédité des caractéristiques:</p>
      <p>À la naissance, un personnage hérite d'un tiers des caractéristiques combinées de ses parents (divisées par 2).</p>
      <p className="mt-1">L'éducation permet ensuite d'augmenter ces caractéristiques jusqu'à un maximum de 40 (sauf pour la popularité qui est illimitée).</p>
      <p className="mt-1 italic">Les enfants peuvent maintenant enchaîner plusieurs formations pour améliorer leurs compétences.</p>
    </div>
  );
};
