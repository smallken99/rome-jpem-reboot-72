
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChildrenTab } from './tabs/ChildrenTab';
import PreceptorsTab from './tabs/PreceptorsTab';
import { HistoryTab } from './tabs/HistoryTab';
import { useEducation } from './context/EducationContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const EducationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('children');
  const { children, preceptors } = useEducation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Effet pour gérer l'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['children', 'preceptors', 'history'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);
  
  // Changer l'onglet
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/famille/education?tab=${value}`);
  };
  
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="children" className="data-[state=active]:bg-rome-navy/10">
          Enfants {children.length > 0 && `(${children.length})`}
        </TabsTrigger>
        <TabsTrigger value="preceptors" className="data-[state=active]:bg-rome-navy/10">
          Précepteurs {preceptors.filter(p => !p.available).length > 0 && 
            `(${preceptors.filter(p => !p.available).length})`}
        </TabsTrigger>
        <TabsTrigger value="history" className="data-[state=active]:bg-rome-navy/10">
          Historique
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="children">
        <ChildrenTab />
      </TabsContent>
      
      <TabsContent value="preceptors">
        <PreceptorsTab />
      </TabsContent>
      
      <TabsContent value="history">
        <HistoryTab />
      </TabsContent>
    </Tabs>
  );
};
