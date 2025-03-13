
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { TaxationOverview } from './TaxationOverview';
import { TaxHistory } from './TaxHistory';
import { TaxCalculator } from './TaxCalculator';
import { Button } from '@/components/ui/button';
import { Calculator, History, Scroll } from 'lucide-react';

export const TaxationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          variant={activeTab === 'overview' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('overview')}
        >
          <Scroll className="h-4 w-4" />
          <span>Aperçu des impôts</span>
        </Button>
        <Button 
          variant={activeTab === 'calculator' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('calculator')}
        >
          <Calculator className="h-4 w-4" />
          <span>Calculateur d'impôts</span>
        </Button>
        <Button 
          variant={activeTab === 'history' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('history')}
        >
          <History className="h-4 w-4" />
          <span>Historique fiscal</span>
        </Button>
      </div>
      
      <RomanCard>
        <RomanCard.Content className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="overview" className="p-6 m-0">
              <TaxationOverview />
            </TabsContent>
            
            <TabsContent value="calculator" className="p-6 m-0">
              <TaxCalculator />
            </TabsContent>
            
            <TabsContent value="history" className="p-6 m-0">
              <TaxHistory />
            </TabsContent>
          </Tabs>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
