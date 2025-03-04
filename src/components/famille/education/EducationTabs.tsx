
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { TabsNavigation } from './tabs/TabsNavigation';
import { CurrentEducationTab } from './tabs/CurrentEducationTab';
import { EducationPathsTab } from './tabs/EducationPathsTab';
import { PreceptorsTab } from './tabs/PreceptorsTab';
import { PreceptorsByType } from './types/educationTypes';

interface EducationTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  preceptors: PreceptorsByType;
  refreshPreceptors: () => void;
}

export const EducationTabs: React.FC<EducationTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  preceptors, 
  refreshPreceptors 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsNavigation />
      
      <CurrentEducationTab />
      <EducationPathsTab />
      <PreceptorsTab preceptors={preceptors} refreshPreceptors={refreshPreceptors} />
    </Tabs>
  );
};
