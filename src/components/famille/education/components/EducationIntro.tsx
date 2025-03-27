
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EducationIntro: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-amber-50 p-3 rounded-full">
            <BookOpen className="h-6 w-6 text-amber-500" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Éducation Familiale</h3>
            <p className="text-muted-foreground">
              L'éducation est cruciale pour l'avenir de votre famille. Elle détermine les carrières 
              accessibles à vos enfants et leurs compétences futures. Choisissez avec soin le type 
              d'éducation le plus approprié pour chacun d'eux, en fonction de son genre, son âge et 
              vos ambitions familiales.
            </p>
            
            <p className="text-muted-foreground mt-2">
              Un enseignement dispensé par les meilleurs précepteurs augmentera significativement 
              les chances de succès de votre descendance. N'oubliez pas que certaines voies, comme 
              l'éducation militaire, ne sont accessibles qu'aux garçons, tandis que d'autres, comme 
              l'éducation religieuse, offrent des opportunités spécifiques aux filles.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
