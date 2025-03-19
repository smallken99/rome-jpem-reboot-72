
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChildrenTab } from './tabs/ChildrenTab';
import { EducationPathsTab } from './tabs/EducationPathsTab';
import { HistoryTab } from './tabs/HistoryTab';
import PreceptorsTab from './tabs/PreceptorsTab';

export const EducationTabs: React.FC = () => {
  return (
    <Tabs defaultValue="children">
      <TabsList className="w-full border-b border-muted bg-white rounded-b-none rounded-t-md">
        <TabsTrigger value="children">Enfants</TabsTrigger>
        <TabsTrigger value="paths">Parcours d'éducation</TabsTrigger>
        <TabsTrigger value="preceptors">Précepteurs</TabsTrigger>
        <TabsTrigger value="history">Historique</TabsTrigger>
      </TabsList>
      
      <TabsContent value="children" className="bg-white border border-t-0 rounded-b-md p-4">
        <ChildrenTab />
      </TabsContent>
      
      <TabsContent value="paths" className="bg-white border border-t-0 rounded-b-md p-4">
        <EducationPathsTab />
      </TabsContent>
      
      <TabsContent value="preceptors" className="bg-white border border-t-0 rounded-b-md p-4">
        <PreceptorsTab />
      </TabsContent>
      
      <TabsContent value="history" className="bg-white border border-t-0 rounded-b-md p-4">
        <HistoryTab />
      </TabsContent>
    </Tabs>
  );
};
