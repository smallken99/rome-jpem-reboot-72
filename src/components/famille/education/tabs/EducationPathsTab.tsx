
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { EducationPathCard } from '../EducationPathCard';
import { educationPaths } from '../data/educationPaths';
import { Sword, Heart, BookOpen } from 'lucide-react';

export const EducationPathsTab: React.FC = () => {
  return (
    <TabsContent value="paths">
      <div className="education-paths">
        <div className="bg-muted p-3 rounded-md mb-4">
          <h3 className="text-lg font-medium mb-2">Les Trois Voies de l'Éducation Romaine</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <Sword className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Éducation Martiale</h4>
                <p className="text-sm text-muted-foreground">Arts militaires et tactiques pour former les futurs commandants de Rome</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Piété</h4>
                <p className="text-sm text-muted-foreground">Étude des cultes et rituels pour servir les dieux de Rome</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BookOpen className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Éloquence</h4>
                <p className="text-sm text-muted-foreground">Maîtrise de l'art oratoire pour exceller dans la vie politique</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {educationPaths.map((path, idx) => (
            <EducationPathCard key={idx} path={path} />
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-muted rounded text-sm">
          <p className="font-medium mb-1">Limites d'éducation par caractéristique:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Éloquence: valeur maximale de 80 par éducation rhétorique</li>
            <li>Piété: valeur maximale de 80 par éducation religieuse</li>
            <li>Éducation Martiale: valeur maximale de 80 par éducation militaire</li>
          </ul>
          <p className="mt-2 text-xs italic">Les femmes romaines bénéficient d'un bonus de +30 en Piété mais n'ont pas accès à l'Éducation Martiale.</p>
        </div>
      </div>
    </TabsContent>
  );
};
