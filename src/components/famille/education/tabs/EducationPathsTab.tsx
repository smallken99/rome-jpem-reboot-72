
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import EducationPathCard from '../EducationPathCard';
import { EducationPath, Gender } from '../types/educationTypes';

interface EducationPathsTabProps {
  onSelectPath?: (path: EducationPath) => void;
  selectedPathId?: string;
  gender?: Gender;
}

export const EducationPathsTab: React.FC<EducationPathsTabProps> = ({
  onSelectPath,
  selectedPathId,
  gender = 'male'
}) => {
  const allPaths = getAllEducationPaths();
  
  // Filter paths by gender suitability
  const filteredPaths = allPaths.filter(path => {
    if (Array.isArray(path.suitableFor)) {
      return path.suitableFor.includes(gender);
    }
    
    // Handle string case or default to allowing all
    const suitableForGender = typeof path.suitableFor === 'string' 
      ? path.suitableFor 
      : 'both';
    
    return suitableForGender === 'both' || suitableForGender === gender;
  });
  
  // Group paths by education type
  const pathsByType: Record<string, EducationPath[]> = {};
  filteredPaths.forEach(path => {
    const pathType = path.relatedStat || 'rhetoric';
    if (!pathsByType[pathType]) {
      pathsByType[pathType] = [];
    }
    pathsByType[pathType].push(path);
  });
  
  // Get all unique types
  const educationTypes = Object.keys(pathsByType);
  
  return (
    <Tabs defaultValue={educationTypes[0]} className="w-full">
      <TabsList className="mb-4 w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7">
        {educationTypes.map(type => (
          <TabsTrigger key={type} value={type} className="text-xs sm:text-sm">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {educationTypes.map(type => (
        <TabsContent key={type} value={type} className="border-none p-0">
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pathsByType[type].map(path => (
                <EducationPathCard
                  key={path.id}
                  path={path}
                  isSelected={selectedPathId === path.id}
                  onSelect={() => onSelectPath && onSelectPath(path)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default EducationPathsTab;

// Helper function to get education paths
function getAllEducationPaths(): EducationPath[] {
  return [
    {
      id: 'rhetoric-basic',
      name: 'Éducation Rhétorique Basique',
      description: 'Formation aux bases de l\'art oratoire',
      duration: 3,
      relatedStat: 'rhetoric',
      outcomes: { oratory: 3 },
      skills: ['Diction claire', 'Arguments simples'],
      minAge: 10,
      maxAge: 16,
      suitableFor: ['male', 'female'],
      specialties: ['Plaidoyer', 'Débat'],
      benefits: ['+3 en Éloquence', 'Réseautage politique']
    },
    {
      id: 'military-basic',
      name: 'Entraînement Militaire de Base',
      description: 'Formation aux techniques militaires fondamentales',
      duration: 4,
      relatedStat: 'military',
      outcomes: { martialEducation: 5 },
      skills: ['Maniement des armes', 'Tactiques de base'],
      minAge: 12,
      maxAge: 18,
      suitableFor: ['male'],
      specialties: ['Infanterie', 'Cavalerie'],
      benefits: ['+5 en Éducation Militaire', 'Respect des soldats']
    }
    // D'autres chemins seraient ajoutés ici dans une application réelle
  ];
}
