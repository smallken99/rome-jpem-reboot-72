
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { PreceptorList } from '../PreceptorList';
import { useEducation } from '../context/EducationContext';

export const PreceptorsTab: React.FC = () => {
  const { preceptors, refreshPreceptors } = useEducation();
  
  return (
    <TabsContent value="preceptors">
      <PreceptorList />
    </TabsContent>
  );
};
