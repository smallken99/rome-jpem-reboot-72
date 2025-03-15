
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ChildEducationCard from '../ChildEducationCard';
import { useEducation } from '../context/EducationContext';

export const CurrentEducationTab: React.FC = () => {
  // Use education context to get children
  const { children } = useEducation();

  return (
    <TabsContent value="current">
      <div className="children-education">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children && children.length > 0 ? (
            children.map(child => (
              <ChildEducationCard 
                key={child.id} 
                child={child} 
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
