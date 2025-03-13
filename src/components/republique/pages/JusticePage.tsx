
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { JudiciaryStats } from '@/components/republique/justice/JudiciaryStats';
import { ProcesTable } from '@/components/republique/justice/ProcesTable';
import { ProcesForm } from '@/components/republique/justice/ProcesForm';
import { ProcesDetailsDialog } from '@/components/republique/justice/ProcesDetailsDialog';
import { JugementDialog } from '@/components/republique/justice/JugementDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gavel, Search, FilePlus, Scroll } from 'lucide-react';
import { toast } from 'sonner';

// Interface pour les données de procès
interface ProcesData {
  id: string;
  titre: string;
  demandeur: string;
  accusé: string;
  type: string;
  statut: string;
  date: string;
  description?: string;
  verdict?: string;
  magistratResponsable?: string;
  notes?: string[];
  preuves?: string[];
}

export const JusticePage: React.FC = () => {
  // État pour les procès
  const [procesCourants, setProcesCourants] = useState<ProcesData[]>([
    {
      id: "1",
      titre: "Dispute territoriale",
      demandeur: "Marcus Livius",
      accusé: "Gaius Marius",
      type: "Civil",
      statut: "En cours",
      date: "15 Mai 45 av. J.-C.",
      description: "Différend concernant la propriété d'une parcelle de terre dans la région de Latium.",
      magistratResponsable: "Préteur Quintus Hortensius"
    },
    {
      id: "2",
      titre: "Accusation de corruption",
      demandeur: "Senat Romain",
      accusé: "Lucius Cornelius",
      type: "Criminel",
      statut: "En attente",
      date: "3 Juin 45 av. J.-C.",
      description: "Lucius Cornelius est accusé d'avoir accepté des pots-de-vin lors de son mandat d'édile."
    },
    {
      id: "3",
      titre: "Vol de bétail",
      demandeur: "Publius Scribonius",
      accusé: "Quintus Fabius",
      type: "Civil",
      statut: "Jugement rendu",
      date: "27 Avril 45 av. J.-C.",
      description: "Accusation de vol de trois têtes de bétail durant la nuit.",
      verdict: "Quintus Fabius est reconnu coupable et condamné à restituer six têtes de bétail à Publius Scribonius en compensation.",
      magistratResponsable: "Préteur Marcus Tullius"
    }
  ]);

  const [procesPassés, setProcessPassés] = useState<ProcesData[]>([
    {
      id: "4",
      titre: "Diffamation publique",
      demandeur: "Gnaeus Pompeius",
      accusé: "Marcus Crassus",
      type: "Civil",
      statut: "Condamnation",
      date: "10 Mars 45 av. J.-C.",
      verdict: "Marcus Crassus est reconnu coupable et condamné à une amende de 10,000 sesterces.",
      magistratResponsable: "Préteur Servius Sulpicius"
    },
    {
      id: "5",
      titre: "Trahison envers Rome",
      demandeur: "Consul Cicero",
      accusé: "Lucius Catilina",
      type: "Criminel",
      statut: "Exil",
      date: "5 Février 45 av. J.-C.",
      verdict: "Lucius Catilina est reconnu coupable de complot contre la République et condamné à l'exil perpétuel.",
      magistratResponsable: "Consul Marcus Tullius Cicero"
    }
  ]);
  
  // États pour les dialogues
  const [isNewProcesOpen, setIsNewProcesOpen] = useState(false);
  const [selectedProces, setSelectedProces] = useState<ProcesData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isJugementOpen, setIsJugementOpen] = useState(false);
  
  // Fonctions
  const handleViewDetails = (proces: ProcesData) => {
    setSelectedProces(proces);
    setIsDetailsOpen(true);
  };
  
  const handleJuger = (proces: ProcesData) => {
    setSelectedProces(proces);
    setIsDetailsOpen(false);
    setIsJugementOpen(true);
  };
  
  const handleJugementRendu = (proces: ProcesData, verdict: string, decision: string) => {
    // Mettre à jour le procès avec le verdict
    const updatedProces = {
      ...proces,
      statut: decision === 'ajournement' ? 'En attente' : (decision === 'condamnation' ? 'Condamnation' : 'Acquittement'),
      verdict: verdict,
      magistratResponsable: "Préteur Servius Sulpicius" // Dans un cas réel, ce serait le nom du magistrat connecté
    };
    
    // Mettre à jour les listes de procès
    if (decision === 'ajournement') {
      setProcesCourants(procesCourants.map(p => p.id === proces.id ? updatedProces : p));
    } else {
      // Retirer des procès courants et ajouter aux procès passés
      setProcesCourants(procesCourants.filter(p => p.id !== proces.id));
      setProcessPassés([updatedProces, ...procesPassés]);
    }
    
    toast.success(`Jugement rendu avec succès: ${decision}`);
  };
  
  const handleNewProces = (newProces: ProcesData) => {
    setProcesCourants([...procesCourants, newProces]);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Justice" 
          subtitle="Administration des lois et des tribunaux de Rome" 
        />
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1" onClick={() => setIsNewProcesOpen(true)}>
            <FilePlus className="h-4 w-4" />
            <span>Nouveau procès</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            <span>Recherche avancée</span>
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <JudiciaryStats />
      </div>
      
      <Tabs defaultValue="en-cours" className="space-y-6">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="en-cours">Procès en cours</TabsTrigger>
          <TabsTrigger value="juge">Procès jugés</TabsTrigger>
          <TabsTrigger value="archives">Archives judiciaires</TabsTrigger>
        </TabsList>
        
        <TabsContent value="en-cours">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h2 className="font-cinzel text-lg">Procès en Cours</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Gavel className="h-4 w-4" />
                  <span>Session du tribunal</span>
                </Button>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <ProcesTable proces={procesCourants} status="en-cours" onViewDetails={handleViewDetails} />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="juge">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h2 className="font-cinzel text-lg">Procès Passés</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Scroll className="h-4 w-4" />
                  <span>Exporter</span>
                </Button>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <ProcesTable proces={procesPassés} status="juge" onViewDetails={handleViewDetails} />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="archives">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Archives Judiciaires</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="text-center p-8">
                <Scroll className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-2">Archives historiques</h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Consultez les procès et verdicts des années passées. Cette section contient 
                  les archives juridiques de la République depuis sa fondation.
                </p>
                <Button className="mt-4">Accéder aux archives</Button>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
      
      {/* Dialogues */}
      <ProcesForm 
        open={isNewProcesOpen}
        onOpenChange={setIsNewProcesOpen}
        onSubmit={handleNewProces}
      />
      
      <ProcesDetailsDialog 
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        proces={selectedProces}
        onJuger={handleJuger}
      />
      
      <JugementDialog 
        open={isJugementOpen}
        onOpenChange={setIsJugementOpen}
        proces={selectedProces}
        onJugementRendu={handleJugementRendu}
      />
    </div>
  );
};
