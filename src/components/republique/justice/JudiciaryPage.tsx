
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JudiciaryStats } from './JudiciaryStats';
import { CurrentTrialsTable } from './CurrentTrialsTable';
import { JudgmentsArchive } from './JudgmentsArchive';
import { EditsTable } from './EditsTable';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const JudiciaryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trials');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Justice Romaine" 
          subtitle="Administration du système judiciaire de la République" 
        />
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-white border-rome-gold/40 text-rome-navy font-medium px-3 py-1">
            Marcus Aurelius Cotta (Préteur)
          </Badge>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Nouveau procès</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <FileText className="h-4 w-4" />
              <span>Rapports</span>
            </Button>
          </div>
        </div>
      </div>
      
      <JudiciaryStats />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="trials">Procès en Cours</TabsTrigger>
          <TabsTrigger value="edicts">Édits Prétoriens</TabsTrigger>
          <TabsTrigger value="archive">Jugements Rendus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trials">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h2 className="font-cinzel text-lg">Procès en Cours</h2>
                <Button size="sm" variant="ghost" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Actualiser</span>
                </Button>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <CurrentTrialsTable />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="edicts">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h2 className="font-cinzel text-lg">Édits Prétoriens</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Nouvel édit</span>
                </Button>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                En tant que Préteur, vous avez le pouvoir de promulguer des édits pour clarifier l'application des lois et établir des procédures judiciaires.
              </p>
              <EditsTable />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="archive">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Archives des Jugements</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <JudgmentsArchive />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
