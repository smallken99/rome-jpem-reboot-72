
import React, { useState } from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcesTable } from '@/components/republique/justice/ProcesTable';
import { mockJudicialCases } from '@/data/republic/justiceData';
import { CaseType, JudicialCase } from '@/data/republic/justiceData';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Gavel, FileText, ArrowUpDown, Scale, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { ActionButton } from '@/components/ui-custom/ActionButton';

export const PreteurFunctions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cas');
  const [cases, setCases] = useState(mockJudicialCases);
  
  // Filtrer les procès selon leur statut
  const pendingCases = cases.filter(c => c.status === 'pending');
  const inProgressCases = cases.filter(c => c.status === 'in_progress');
  const resolvedCases = cases.filter(c => ['decided', 'closed'].includes(c.status));
  
  // Convertir les cas pour l'affichage dans le tableau
  const mapCasesToProcesData = (judicialCases: JudicialCase[]) => {
    return judicialCases.map(c => ({
      id: c.id,
      titre: c.title,
      demandeur: c.plaintiff,
      accusé: c.defendant,
      type: mapCaseTypeToFrench(c.type),
      statut: mapStatusToFrench(c.status),
      date: c.startDate,
    }));
  };
  
  // Mapper les types de cas en français
  const mapCaseTypeToFrench = (type: CaseType): string => {
    const typeMap: Record<CaseType, string> = {
      civil: 'Civil',
      criminal: 'Criminel',
      political: 'Politique',
      religious: 'Religieux',
      administrative: 'Administratif'
    };
    return typeMap[type] || type;
  };
  
  // Mapper les statuts en français
  const mapStatusToFrench = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'En attente',
      'in_progress': 'En cours',
      'decided': 'Jugement rendu',
      'appealed': 'En appel',
      'closed': 'Clos'
    };
    return statusMap[status] || status;
  };
  
  // Prendre en charge un nouveau cas
  const handleAssignCase = (caseId: string) => {
    setCases(prevCases => prevCases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'in_progress',
          presidingMagistrate: 'Marcus Aurelius Cotta',
          lastUpdate: 'Aprilis 705'
        };
      }
      return c;
    }));
    toast.success("Vous avez pris en charge cette affaire. Le procès peut maintenant commencer.");
  };
  
  // Créer un nouvel édit
  const handleCreateEdict = () => {
    toast.success("L'édit a été publié et sera appliqué dans toute la République", {
      description: "Les citoyens ont été informés des nouvelles mesures juridiques."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBox 
          title="Procès en attente"
          value={pendingCases.length}
          description="Affaires à assigner"
          icon={<FileText className="h-6 w-6" />}
          className="border-amber-200"
        />
        <StatBox 
          title="Procès en cours"
          value={inProgressCases.length}
          description="Affaires sous votre juridiction"
          icon={<Gavel className="h-6 w-6" />}
          className="border-blue-200"
        />
        <StatBox 
          title="Jugements rendus"
          value={resolvedCases.length}
          description="Ce trimestre"
          icon={<Scale className="h-6 w-6" />}
          className="border-green-200"
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full bg-white border border-rome-gold/30">
          <TabsTrigger value="cas">Procès</TabsTrigger>
          <TabsTrigger value="edits">Édits</TabsTrigger>
          <TabsTrigger value="tribunaux">Tribunaux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cas" className="space-y-4">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h3 className="font-cinzel text-lg">Gestion des Procès</h3>
                <ActionButton 
                  icon={<FileText className="h-4 w-4" />}
                  label="Nouveau procès"
                  variant="outline"
                />
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="space-y-6">
                <ProcesTable 
                  proces={mapCasesToProcesData(pendingCases)} 
                  status="en-cours" 
                  onAssign={handleAssignCase}
                />
                
                <ProcesTable 
                  proces={mapCasesToProcesData(inProgressCases)} 
                  status="en-cours" 
                />
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="edits" className="space-y-4">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h3 className="font-cinzel text-lg">Édits du Préteur</h3>
                <Button 
                  variant="outline" 
                  className="roman-btn-outline"
                  onClick={handleCreateEdict}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Publier un nouvel édit
                </Button>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                En tant que Préteur, vous pouvez publier des édits qui établissent de nouvelles règles juridiques 
                pour l'année de votre magistrature.
              </p>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="grid grid-cols-3 gap-4 font-medium text-sm bg-muted p-2 rounded-md">
                  <div>Titre</div>
                  <div>Date de publication</div>
                  <div>Statut</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm border-b pb-2">
                  <div>Edictum de mercatura</div>
                  <div>Januarius 705</div>
                  <div className="text-green-600">Actif</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm border-b pb-2">
                  <div>Edictum de societatibus</div>
                  <div>Februarius 705</div>
                  <div className="text-green-600">Actif</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>Edictum de usufructu</div>
                  <div>Martius 705</div>
                  <div className="text-green-600">Actif</div>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="tribunaux" className="space-y-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg">Tribunaux Romains</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Assignez les juges et organisez les sessions des tribunaux pour assurer le bon fonctionnement 
                de la justice à Rome.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Tribunal du Forum</h4>
                  <p className="text-sm text-muted-foreground mb-2">Affaires civiles et commerciales</p>
                  <div className="flex justify-between">
                    <span className="text-sm">5 cas en attente</span>
                    <Button size="sm" variant="outline">Assigner</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Tribunal de la Basilique Julia</h4>
                  <p className="text-sm text-muted-foreground mb-2">Affaires criminelles</p>
                  <div className="flex justify-between">
                    <span className="text-sm">3 cas en attente</span>
                    <Button size="sm" variant="outline">Assigner</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Tribunal des Affaires Étrangères</h4>
                  <p className="text-sm text-muted-foreground mb-2">Litiges avec les non-citoyens</p>
                  <div className="flex justify-between">
                    <span className="text-sm">2 cas en attente</span>
                    <Button size="sm" variant="outline">Assigner</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Tribunal des Centumvirs</h4>
                  <p className="text-sm text-muted-foreground mb-2">Affaires d'héritage</p>
                  <div className="flex justify-between">
                    <span className="text-sm">4 cas en attente</span>
                    <Button size="sm" variant="outline">Assigner</Button>
                  </div>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
