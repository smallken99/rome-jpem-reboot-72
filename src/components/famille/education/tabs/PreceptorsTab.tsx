
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { PreceptorList } from '../PreceptorList';
import { useEducation } from '../context/EducationContext';

interface PreceptorsTabProps {
  preceptors?: any;  // Make preceptors optional
  refreshPreceptors?: () => void;  // Make refreshPreceptors optional
}

export const PreceptorsTab: React.FC<PreceptorsTabProps> = () => {
  // Use the context instead of props
  const { preceptors, refreshPreceptors } = useEducation();
  
  return (
    <TabsContent value="preceptors">
      <PreceptorList />
    </TabsContent>
  );
};
