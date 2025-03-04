
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ChildEducationCard from '../ChildEducationCard';
import { children } from '../EducationData';

interface CurrentEducationTabProps {
  onNameChange?: (characterId: string, newName: string) => void;
}

export const CurrentEducationTab: React.FC<CurrentEducationTabProps> = ({ onNameChange }) => {
  return (
    <TabsContent value="current">
      <div className="children-education">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map(child => (
            <ChildEducationCard 
              key={child.id} 
              child={child} 
              onChangeName={onNameChange}
            />
          ))}
        </div>
      </div>
    </TabsContent>
  );
};
