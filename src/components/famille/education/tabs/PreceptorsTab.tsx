
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { PreceptorList } from '../PreceptorList';

export const PreceptorsTab: React.FC = () => {
  return (
    <TabsContent value="preceptors">
      <PreceptorList />
    </TabsContent>
  );
};
