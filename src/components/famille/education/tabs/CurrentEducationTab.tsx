
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ChildEducationCard } from '../ChildEducationCard';
import { children } from '../EducationData';

export const CurrentEducationTab: React.FC = () => {
  return (
    <TabsContent value="current">
      <div className="children-education">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map(child => (
            <ChildEducationCard key={child.id} child={child} />
          ))}
        </div>
      </div>
    </TabsContent>
  );
};
