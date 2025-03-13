
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActiveLoans } from './ActiveLoans';
import { LoanHistory } from './LoanHistory';
import { NewLoanRequest } from './NewLoanRequest';
import { Button } from '@/components/ui/button';
import { Coins, History, PlusCircle } from 'lucide-react';

export const LoansManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          variant={activeTab === 'active' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('active')}
        >
          <Coins className="h-4 w-4" />
          <span>Prêts actifs</span>
        </Button>
        <Button 
          variant={activeTab === 'new' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('new')}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Nouveau prêt</span>
        </Button>
        <Button 
          variant={activeTab === 'history' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('history')}
        >
          <History className="h-4 w-4" />
          <span>Historique</span>
        </Button>
      </div>
      
      <RomanCard>
        <RomanCard.Content className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="active" className="p-6 m-0">
              <ActiveLoans />
            </TabsContent>
            
            <TabsContent value="new" className="p-6 m-0">
              <NewLoanRequest />
            </TabsContent>
            
            <TabsContent value="history" className="p-6 m-0">
              <LoanHistory />
            </TabsContent>
          </Tabs>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
