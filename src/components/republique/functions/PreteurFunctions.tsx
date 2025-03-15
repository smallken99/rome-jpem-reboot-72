
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, FileText, Plus, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const PreteurFunctions: React.FC = () => {
  return (
    <Tabs defaultValue="proces">
      <TabsList className="bg-white border border-rome-gold/30">
        <TabsTrigger value="proces">Procès</TabsTrigger>
        <TabsTrigger value="edits">Édits Prétoriens</TabsTrigger>
        <TabsTrigger value="jurisprudence">Jurisprudence</TabsTrigger>
      </TabsList>
      
      <TabsContent value="proces" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Procès en attente</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau procès
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Parties</TableHead>
                  <TableHead>Nature</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Idus Mai 705</TableCell>
                  <TableCell>Cassius c. Marcius</TableCell>
                  <TableCell>Litige commercial</TableCell>
                  <TableCell>
                    <Badge className="bg-amber-100 text-amber-800">En attente</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Présider</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10 Kalendes Juin 705</TableCell>
                  <TableCell>République c. Sempronius</TableCell>
                  <TableCell>Corruption</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">Témoins à convoquer</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Présider</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="edits" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Édits Prétoriens</h3>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Nouvel édit
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <p className="text-muted-foreground mb-4">
              En tant que Préteur, vous pouvez émettre des édits pour clarifier l'application des lois et préciser les procédures judiciaires.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Domaine</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>3 Nones Mai 705</TableCell>
                  <TableCell>De negotiis gestis</TableCell>
                  <TableCell>Contrats commerciaux</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Consulter</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Kalendes Mai 705</TableCell>
                  <TableCell>De vi et metu</TableCell>
                  <TableCell>Intimidation et violence</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Consulter</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="jurisprudence" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Jurisprudence et archives judiciaires</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="flex items-center justify-center gap-6 py-8">
              <div className="text-center">
                <div className="rounded-full bg-blue-100 p-3 inline-block mb-2">
                  <Scale className="h-6 w-6 text-blue-700" />
                </div>
                <h4 className="font-medium mb-1">Jugements précédents</h4>
                <p className="text-sm text-muted-foreground">86 cas</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-purple-100 p-3 inline-block mb-2">
                  <BookOpen className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="font-medium mb-1">Interprétations légales</h4>
                <p className="text-sm text-muted-foreground">42 documents</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button className="mr-4">Consulter archives</Button>
              <Button variant="outline">Recherche par sujet</Button>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
    </Tabs>
  );
};
