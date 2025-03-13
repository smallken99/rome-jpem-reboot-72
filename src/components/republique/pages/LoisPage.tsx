
import React, { useState } from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { LoisStats } from '@/components/republique/lois/LoisStats';
import { LoisTable } from '@/components/republique/lois/LoisTable';
import { LoiDetailsDialog } from '@/components/republique/lois/LoiDetailsDialog';
import { NouvelleLoiDialog } from '@/components/republique/lois/NouvelleLoiDialog';
import { LoiVoteDialog } from '@/components/republique/lois/LoiVoteDialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loi } from '@/components/republique/lois/hooks/useLois';
import { FilePlus, Scroll, FileCheck, ArrowUpDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const LoisPage: React.FC = () => {
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNewLoiOpen, setIsNewLoiOpen] = useState(false);
  const [isVoteOpen, setIsVoteOpen] = useState(false);
  
  const handleViewDetails = (loi: Loi) => {
    setSelectedLoi(loi);
    setIsDetailsOpen(true);
  };
  
  const handleVote = (loi: Loi) => {
    setSelectedLoi(loi);
    setIsVoteOpen(true);
  };
  
  const handlePromulguer = (loi: Loi) => {
    // Implementation simplifiée - normalement on appellerait la fonction promulguerLoi du hook
    console.log("Promulgation de la loi:", loi);
  };
  
  const handleNewLoiSuccess = () => {
    // On pourrait rafraîchir les données ici si nécessaire
  };
  
  const handleVoteSuccess = () => {
    // Fermer la modale de détails si elle est ouverte
    setIsDetailsOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Lois & Moralité" 
        />
        
        <Button onClick={() => setIsNewLoiOpen(true)} className="roman-btn">
          <FilePlus className="h-4 w-4 mr-2" />
          Nouvelle proposition
        </Button>
      </div>
      
      <LoisStats />
      
      <Tabs defaultValue="lois" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="lois">Lois actuelles</TabsTrigger>
          <TabsTrigger value="propositions">Propositions</TabsTrigger>
          <TabsTrigger value="archives">Archives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lois">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h2 className="font-cinzel text-lg">Lois en vigueur</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileCheck className="h-4 w-4" />
                  <span>Exporter</span>
                </Button>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <LoisTable 
                onViewDetails={handleViewDetails}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="propositions">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h2 className="font-cinzel text-lg">Propositions de lois</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Trier</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setIsNewLoiOpen(true)}>
                    <FilePlus className="h-4 w-4" />
                    <span>Nouvelle</span>
                  </Button>
                </div>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <LoisTable 
                onViewDetails={handleViewDetails}
                onVote={handleVote}
                onPromulguer={handlePromulguer}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="archives">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h2 className="font-cinzel text-lg">Archives législatives</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Scroll className="h-4 w-4" />
                  <span>Parcourir par année</span>
                </Button>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <LoisTable 
                onViewDetails={handleViewDetails}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Révision et Proposition des Lois</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              En tant que Censeur, vous avez la charge de surveiller la moralité des citoyens et 
              des magistrats. Vous pouvez proposer de nouvelles lois et réviser celles existantes.
            </p>
            <Separator className="my-4 border-rome-gold/30" />
            <p className="text-sm text-muted-foreground">
              La stabilité de la République dépend du respect de ses lois et traditions. 
              Assurez-vous que les citoyens et magistrats maintiennent les plus hauts standards.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
      
      {/* Dialogues */}
      <LoiDetailsDialog 
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        loi={selectedLoi}
        onVote={handleVote}
        onPromulguer={handlePromulguer}
      />
      
      <NouvelleLoiDialog 
        open={isNewLoiOpen}
        onOpenChange={setIsNewLoiOpen}
        onSubmit={handleNewLoiSuccess}
      />
      
      <LoiVoteDialog 
        open={isVoteOpen}
        onOpenChange={setIsVoteOpen}
        loi={selectedLoi}
        onSuccess={handleVoteSuccess}
      />
    </div>
  );
};
