
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { EducationPathCard } from '../EducationPathCard';
import { educationPaths } from '../EducationData';

export const EducationPathsTab: React.FC = () => {
  return (
    <TabsContent value="paths">
      <div className="education-paths">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {educationPaths.map((path, idx) => (
            <EducationPathCard key={idx} path={path} />
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-muted rounded text-sm">
          <p className="font-medium mb-1">Limites d'éducation par caractéristique:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Popularité: valeur maximale illimitée</li>
            <li>Éloquence: valeur maximale de 80 par éducation</li>
            <li>Piété: valeur maximale de 80 par éducation</li>
            <li>Éducation Martiale: valeur maximale de 80 par éducation</li>
          </ul>
          <p className="mt-2 text-xs italic">Les femmes romaines bénéficient d'un bonus de +30 en Piété mais n'ont pas accès à l'Éducation Martiale.</p>
        </div>
      </div>
    </TabsContent>
  );
};
