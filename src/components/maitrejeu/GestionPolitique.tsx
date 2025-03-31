
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { ProcessusLegislatif } from './components/republique/processus-legislatif/ProcessusLegislatif';
import { PoliticalParties } from './components/republique/political-parties/PoliticalParties';
import { ElectionsManager } from './components/republique/elections/ElectionsManager';
import { MagistraturesManager } from './components/republique/magistratures/MagistraturesManager';

// Define a local type for the variant to fix the type errors
type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success";

export const GestionPolitique: React.FC = () => {
  const { lois, addLoi } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('lois');
  
  // Process laws by status for the overview
  const pendingLaws = lois.filter(loi => loi.état === 'en_débat' || loi.état === 'proposée');
  const votedLaws = lois.filter(loi => loi.état === 'votée' || loi.état === 'adoptée');
  const enactedLaws = lois.filter(loi => loi.état === 'promulguée');
  const rejectedLaws = lois.filter(loi => loi.état === 'rejetée');
  
  // Mock data for demonstration - replace with real data from your context
  const partiesStats = [
    { name: 'Optimates', seats: 65, leader: 'Quintus Lutatius Catulus', color: '#3b82f6' },
    { name: 'Populares', seats: 43, leader: 'Gaius Julius Caesar', color: '#ef4444' },
    { name: 'Modérés', seats: 22, leader: 'Marcus Tullius Cicero', color: '#84cc16' }
  ];
  
  const upcomingElections = [
    { 
      id: '1',
      position: 'Consul',
      date: '15 Juillet 705 AUC',
      candidates: ['Marcus Calpurnius Bibulus', 'Gaius Julius Caesar'],
      status: 'scheduled'
    },
    { 
      id: '2',
      position: 'Préteur',
      date: '1 Août 705 AUC',
      candidates: ['Marcus Porcius Cato', 'Publius Clodius Pulcher'],
      status: 'nominations'
    }
  ];
  
  const currentMagistrates = [
    {
      position: 'Consul',
      holders: ['Lucius Calpurnius Piso Caesoninus', 'Aulus Gabinius'],
      term: '704-705 AUC'
    },
    {
      position: 'Préteur',
      holders: ['Quintus Caecilius Metellus Nepos', 'Marcus Nonius Sufenas', 'Publius Cornelius Lentulus Spinther', 'Gaius Cosconius'],
      term: '704-705 AUC'
    },
    {
      position: 'Édile',
      holders: ['Marcus Aemilius Scaurus', 'Publius Plautius Hypsaeus'],
      term: '704-705 AUC'
    }
  ];
  
  // Get status badge variant based on law status
  const getLawStatusVariant = (status: string): BadgeVariant => {
    switch (status) {
      case 'promulguée':
      case 'adoptée':
      case 'votée':
        return 'success';
      case 'rejetée':
        return 'destructive';
      case 'en_débat':
        return 'outline';
      default:
        return 'default';
    }
  };
  
  // Get status badge text based on law status
  const getLawStatusText = (status: string): string => {
    switch (status) {
      case 'promulguée': return 'Promulguée';
      case 'adoptée': return 'Adoptée';
      case 'votée': return 'Votée';
      case 'rejetée': return 'Rejetée';
      case 'en_débat': return 'En débat';
      case 'proposée': return 'Proposée';
      default: return status;
    }
  };
  
  return (
    <div className="space-y-6 p-6">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Politique</h2>
        <p className="text-muted-foreground">
          Gérez les lois, les élections et l'équilibre politique de la République.
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Lois en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingLaws.length}</div>
            <div className="flex mt-2 space-x-2">
              {pendingLaws.slice(0, 2).map(law => (
                <Badge key={law.id} variant={getLawStatusVariant(law.état)}>
                  {getLawStatusText(law.état)}
                </Badge>
              ))}
              {pendingLaws.length > 2 && (
                <Badge variant="outline">+{pendingLaws.length - 2}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Lois votées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{votedLaws.length}</div>
            <div className="flex mt-2 space-x-2">
              {votedLaws.slice(0, 2).map(law => (
                <Badge key={law.id} variant={getLawStatusVariant(law.état)}>
                  {getLawStatusText(law.état)}
                </Badge>
              ))}
              {votedLaws.length > 2 && (
                <Badge variant="outline">+{votedLaws.length - 2}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Lois promulguées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{enactedLaws.length}</div>
            <div className="flex mt-2 space-x-2">
              {enactedLaws.slice(0, 2).map(law => (
                <Badge key={law.id} variant={getLawStatusVariant(law.état)}>
                  {getLawStatusText(law.état)}
                </Badge>
              ))}
              {enactedLaws.length > 2 && (
                <Badge variant="outline">+{enactedLaws.length - 2}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Lois rejetées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{rejectedLaws.length}</div>
            <div className="flex mt-2 space-x-2">
              {rejectedLaws.slice(0, 2).map(law => (
                <Badge key={law.id} variant={getLawStatusVariant(law.état)}>
                  {getLawStatusText(law.état)}
                </Badge>
              ))}
              {rejectedLaws.length > 2 && (
                <Badge variant="outline">+{rejectedLaws.length - 2}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lois">Lois</TabsTrigger>
          <TabsTrigger value="parties">Partis politiques</TabsTrigger>
          <TabsTrigger value="elections">Élections</TabsTrigger>
          <TabsTrigger value="magistratures">Magistratures</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lois">
          <ProcessusLegislatif />
        </TabsContent>
        
        <TabsContent value="parties">
          <PoliticalParties />
        </TabsContent>
        
        <TabsContent value="elections">
          <ElectionsManager />
        </TabsContent>
        
        <TabsContent value="magistratures">
          <MagistraturesManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
