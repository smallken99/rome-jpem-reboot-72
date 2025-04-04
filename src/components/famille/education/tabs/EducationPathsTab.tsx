
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import EducationPathCard from '../EducationPathCard';
import { EducationPath, EducationType, Gender } from '../types/educationTypes';
import { getAllEducationPaths } from '../data/educationPaths';

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
    } else if (path.suitableFor && typeof path.suitableFor === 'object') {
      return path.suitableFor.gender === 'both' || path.suitableFor.gender === gender;
    }
    return true; // Default to showing if suitability is not specified
  });
  
  // Group paths by education type
  const pathsByType: Record<string, EducationPath[]> = {};
  filteredPaths.forEach(path => {
    const type = path.type || 'rhetoric';
    if (!pathsByType[type]) {
      pathsByType[type] = [];
    }
    pathsByType[type].push(path);
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
