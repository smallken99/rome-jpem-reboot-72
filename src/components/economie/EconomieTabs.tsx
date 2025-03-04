
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApercuTab } from './tabs/ApercuTab';
import { RevenusTab } from './tabs/RevenusTab';
import { DepensesTab } from './tabs/DepensesTab';
import { ImpotsTab } from './tabs/ImpotsTab';

export const EconomieTabs: React.FC = () => {
  return (
    <Tabs defaultValue="apercu" className="mb-8">
      <TabsList className="border border-rome-gold/30 bg-rome-parchment">
        <TabsTrigger value="apercu" className="data-[state=active]:bg-white">Aperçu</TabsTrigger>
        <TabsTrigger value="revenus" className="data-[state=active]:bg-white">Revenus</TabsTrigger>
        <TabsTrigger value="depenses" className="data-[state=active]:bg-white">Dépenses</TabsTrigger>
        <TabsTrigger value="impots" className="data-[state=active]:bg-white">Impôts</TabsTrigger>
      </TabsList>
      
      <TabsContent value="apercu" className="pt-4">
        <ApercuTab />
      </TabsContent>
      
      <TabsContent value="revenus" className="pt-4">
        <RevenusTab />
      </TabsContent>
      
      <TabsContent value="depenses" className="pt-4">
        <DepensesTab />
      </TabsContent>
      
      <TabsContent value="impots" className="pt-4">
        <ImpotsTab />
      </TabsContent>
    </Tabs>
  );
};
