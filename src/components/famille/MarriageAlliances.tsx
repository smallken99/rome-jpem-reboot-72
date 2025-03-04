
import React from 'react';
import { AllianceItem } from '../features/AllianceItem';

// Sample marriage alliances data with consistent dates in AUC format 
// (Ab Urbe Condita - counting from the founding of Rome)
const alliances = [
  {
    id: '1',
    name: 'Gens Cornelia',
    member: 'Gaius Aurelius',
    spouse: 'Cornelia Minor',
    type: 'matrimoniale' as const,
    status: 'actif' as const,
    benefits: ['Influence au Sénat +2', 'Relations commerciales'],
    date: '709 AUC'
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
  },
  {
    id: '3',
    name: 'Gens Claudia',
    member: 'Marcus Aurelius (Oncle)',
    spouse: 'Claudia Major',
    type: 'matrimoniale' as const,
    status: 'actif' as const,
    benefits: ['Protection contre les rivalités', 'Accès aux marchés d\'Asie'],
    date: '702 AUC'
  },
  {
    id: '4',
    name: 'Gens Junia',
    member: 'Lucia Aurelia (Cousine)',
    spouse: 'Decimus Junius',
    type: 'matrimoniale' as const,
    status: 'rompu' as const,
    benefits: ['Ancien accès aux mines d\'argent'],
    date: '704 AUC'
  }
];

export const MarriageAlliances: React.FC = () => {
  return (
    <div className="marriage-alliances">
      <div className="p-4 mb-4 bg-rome-parchment/50 rounded-md">
        <p className="italic text-muted-foreground">
          Les alliances matrimoniales sont essentielles pour étendre l'influence de votre Gens.
          Elles sont gérées automatiquement par les familles nobles selon les traditions romaines.
        </p>
      </div>
      
      <div className="space-y-4">
        {alliances.map(alliance => (
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
    </div>
  );
};
