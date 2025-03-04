
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { PreceptorList } from '../PreceptorList';
import { PreceptorsByType } from '../types/educationTypes';

interface PreceptorsTabProps {
  preceptors: PreceptorsByType;
  refreshPreceptors: () => void;
}

export const PreceptorsTab: React.FC<PreceptorsTabProps> = ({ preceptors, refreshPreceptors }) => {
  return (
    <TabsContent value="preceptors">
      <PreceptorList preceptors={preceptors} refreshPreceptors={refreshPreceptors} />
    </TabsContent>
  );
};
