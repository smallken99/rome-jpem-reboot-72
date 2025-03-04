
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ChildEducationCard from '../ChildEducationCard';
import { Child } from '../types/educationTypes';
import { Character } from '@/types/character';

interface CurrentEducationTabProps {
  onNameChange?: (characterId: string, newName: string) => void;
  characters?: Character[];
}

export const CurrentEducationTab: React.FC<CurrentEducationTabProps> = ({ 
  onNameChange,
  characters = []
}) => {
  // Convert Character objects to Child objects for the education system
  const children: Child[] = characters
    .filter(char => char.age < 18)
    .map(char => ({
      id: char.id,
      name: char.name,
      age: char.age,
      gender: char.gender,
      currentEducation: {
        type: char.education?.type || 'none',
        mentor: char.education?.mentor || null,
        progress: 0,
        skills: char.education?.specialties || [],
        // Add additional education fields as needed
      }
    }));

  return (
    <TabsContent value="current">
      <div className="children-education">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.length > 0 ? (
            children.map(child => (
              <ChildEducationCard 
                key={child.id} 
                child={child} 
                onChangeName={onNameChange}
              />
            ))
          ) : (
            <div className="col-span-2 text-center p-8 bg-muted/30 rounded">
              <p className="text-muted-foreground">Aucun enfant dans votre famille n'est en âge de recevoir une éducation</p>
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};
