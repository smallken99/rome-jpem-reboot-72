
import React from 'react';
import { educationPaths } from '../data/educationPaths';
import { EducationTypeSelectorProps } from '../types/educationTypes';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, Sword, Heart } from 'lucide-react';

export const EducationTypeSelector: React.FC<EducationTypeSelectorProps> = ({
  value,
  onChange,
  childGender,
}) => {
  // Filtrer les chemins d'éducation par genre
  const filteredPaths = educationPaths.filter(path => {
    if (path.requirements?.gender === 'both') return true;
    return path.requirements?.gender === childGender;
  });

  // Helper function to get icon for education type
  const getIcon = (pathId: string) => {
    switch(pathId) {
      case 'military': return <Sword className="h-5 w-5" />;
      case 'religious': return <Heart className="h-5 w-5" />;
      case 'rhetoric': return <BookOpen className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  // Helper function to get the display name for education type
  const getDisplayName = (pathId: string) => {
    switch(pathId) {
      case 'military': return 'Militaire';
      case 'religious': return 'Piété';
      case 'rhetoric': return 'Éloquence';
      default: return pathId;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Type d'Éducation</h3>
        <p className="text-sm text-muted-foreground">
          Choisissez le type d'éducation qui définira la carrière future de votre enfant.
        </p>
      </div>

      <Tabs value={value} onValueChange={onChange} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="none">Aucune</TabsTrigger>
          
          {filteredPaths.map(path => (
            <TabsTrigger 
              key={path.id} 
              value={path.id}
              disabled={path.requirements?.age && path.requirements.age > 15} 
              className="flex items-center gap-2"
            >
              {getIcon(path.id)}
              {getDisplayName(path.id)}
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredPaths.map(path => (
          <TabsContent key={path.id} value={path.id} className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              {getIcon(path.id)}
              <h3 className="text-xl font-semibold">{path.name}</h3>
            </div>
            
            <p>{path.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Bénéfices</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {path.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Prérequis</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Âge minimum: {path.requirements?.age || 'N/A'} ans</li>
                  <li>Genre: {
                    path.requirements?.gender === 'male' ? 'Garçon uniquement' : 
                    path.requirements?.gender === 'female' ? 'Fille uniquement' : 
                    'Tous'
                  }</li>
                  {path.requirements?.cost && (
                    <li>Coût: {path.requirements.cost} As</li>
                  )}
                  <li>Durée typique: {path.requirements?.duration || `${path.duration} ans`}</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        ))}
        
        <TabsContent value="none" className="mt-4">
          <p className="text-muted-foreground italic">
            Aucune éducation sélectionnée. Votre enfant ne recevra pas d'instruction spécialisée.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
