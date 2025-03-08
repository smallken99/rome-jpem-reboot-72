
import React, { useState, useEffect } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { TabsNavigation } from './tabs/TabsNavigation';
import { CurrentEducationTab } from './tabs/CurrentEducationTab';
import { EducationPathsTab } from './tabs/EducationPathsTab';
import { PreceptorsTab } from './tabs/PreceptorsTab';
import { useLocation } from 'react-router-dom';
import { useEducation } from './context/EducationContext';

export const EducationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("current");
  const location = useLocation();
  const { 
    preceptors, 
    refreshPreceptors 
  } = useEducation();
  
  // Handle tab changes from route state
  useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsNavigation />
      
      <CurrentEducationTab />
      <EducationPathsTab />
      <PreceptorsTab preceptors={preceptors} refreshPreceptors={refreshPreceptors} />
    </Tabs>
  );
};
