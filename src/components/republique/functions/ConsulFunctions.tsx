
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, FileText, GraduationCap, MessageCircle, ShieldAlert, Users } from 'lucide-react';

export const ConsulFunctions: React.FC = () => {
  return (
    <Tabs defaultValue="senat">
      <TabsList className="bg-white border border-rome-gold/30">
        <TabsTrigger value="senat">Sénat</TabsTrigger>
        <TabsTrigger value="diplomatie">Diplomatie</TabsTrigger>
        <TabsTrigger value="legions">Légions</TabsTrigger>
        <TabsTrigger value="elections">Élections</TabsTrigger>
      </TabsList>
      
      <TabsContent value="senat" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Convocations du Sénat</h3>
              <Button size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Convoquer le Sénat
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sujet</TableHead>
                  <TableHead>Propositions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Idus Mai 705</TableCell>
                  <TableCell>Crise d'approvisionnement en grain</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Voir détails</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Kalendes Juin 705</TableCell>
                  <TableCell>Élection des magistrats</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Voir détails</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Propositions de loi consulaires</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="flex justify-center py-8">
              <Button className="mr-4">
                <FileText className="h-4 w-4 mr-2" />
                Nouvelle proposition
              </Button>
              <Button variant="outline">
                Consulter archives
              </Button>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="diplomatie" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Relations diplomatiques</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-4">En tant que Consul, vous pouvez représenter Rome auprès des nations étrangères.</p>
              <div className="flex justify-center">
                <Button className="mr-4">Recevoir ambassadeurs</Button>
                <Button variant="outline">Envoyer légation</Button>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="legions" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Commandement militaire</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <ShieldAlert className="h-5 w-5 mr-2 text-rome-navy" />
                  <h4 className="font-medium">Légions prêtes</h4>
                </div>
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">78% en pleine capacité</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 mr-2 text-rome-navy" />
                  <h4 className="font-medium">Effectifs totaux</h4>
                </div>
                <p className="text-3xl font-bold">68,400</p>
                <p className="text-sm text-muted-foreground">11,400 cavaliers</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button className="mr-4">Détails des légions</Button>
              <Button variant="outline">Campagnes militaires</Button>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="elections" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Organisation des élections</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start">
                <Calendar className="h-8 w-8 mr-3 text-rome-navy" />
                <div>
                  <h4 className="font-medium">Prochaines élections</h4>
                  <p className="text-muted-foreground">12 Kalendes de Juillet 705</p>
                  <p className="text-sm mt-1">Tous les postes de magistrats à pourvoir</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <GraduationCap className="h-8 w-8 mr-3 text-rome-navy" />
                <div>
                  <h4 className="font-medium">Candidats enregistrés</h4>
                  <p className="text-muted-foreground">34 candidats pour 16 postes</p>
                  <p className="text-sm mt-1">Date limite: 5 Kalendes de Juin 705</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button className="mr-4">Administrer élections</Button>
              <Button variant="outline">Voir candidats</Button>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
    </Tabs>
  );
};
