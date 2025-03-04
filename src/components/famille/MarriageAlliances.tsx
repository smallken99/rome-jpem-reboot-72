
import React from 'react';
import { AllianceItem } from '../features/AllianceItem';

// Marriage alliances data that matches the characters data
const alliances = [
  {
    id: '1',
    name: 'Gens Cornelia',
    member: 'Marcus Aurelius Cotta',
    spouse: 'Livia Aurelia',
    type: 'matrimoniale' as const,
    status: 'actif' as const,
    benefits: ['Stabilité familiale', 'Gestion du patrimoine'],
    date: '705 AUC'
  },
  {
    id: '2',
    name: 'Gens Fabia',
    member: 'Julia Aurelia',
    spouse: 'Quintus Fabius',
    type: 'matrimoniale' as const,
    status: 'en négociation' as const,
    benefits: ['Soutien militaire', 'Accès aux ports'],
    date: '710 AUC (prévu)'
  }
];

export const MarriageAlliances: React.FC = () => {
  // Filter alliances to only show active ones
  const activeAlliances = alliances.filter(alliance => alliance.status === 'actif');
  
  return (
    <div className="marriage-alliances">
      <div className="p-4 mb-4 bg-rome-parchment/50 rounded-md">
        <p className="italic text-muted-foreground">
          Les alliances matrimoniales sont essentielles pour étendre l'influence de votre Gens.
          Elles sont gérées automatiquement par les familles nobles selon les traditions romaines.
        </p>
      </div>
      
      <div className="space-y-4">
        {activeAlliances.map(alliance => (
          <div key={alliance.id} className="border rounded-md overflow-hidden">
            <div className="p-3 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel">{alliance.member}</h3>
                <span className="text-rome-terracotta">♥</span>
                <h3 className="font-cinzel">{alliance.spouse}</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {alliance.date}
              </div>
            </div>
            
            <AllianceItem
              name={alliance.name}
              type={alliance.type}
              status={alliance.status}
              benefits={alliance.benefits}
            />
          </div>
        ))}
      </div>
      
      {activeAlliances.length === 0 && (
        <div className="text-center p-4 text-muted-foreground italic">
          Aucune alliance active pour le moment.
        </div>
      )}
    </div>
  );
};
