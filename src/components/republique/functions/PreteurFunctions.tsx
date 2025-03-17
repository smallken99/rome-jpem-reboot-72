
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Gavel, Scale, ScrollText, History, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const PreteurFunctions: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string, functionName: string) => {
    toast.info(`Accès à la fonction: ${functionName}`);
    navigate(path);
  };

  return (
    <Tabs defaultValue="tribunaux">
      <TabsList className="bg-white border border-rome-gold/30">
        <TabsTrigger value="tribunaux">Tribunaux</TabsTrigger>
        <TabsTrigger value="edits">Édits Juridiques</TabsTrigger>
        <TabsTrigger value="droitcivil">Droit Civil</TabsTrigger>
        <TabsTrigger value="registres">Registres</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tribunaux" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Administration des Tribunaux</h3>
              <Button 
                size="sm"
                onClick={() => handleNavigate('/republique/justice', 'Système Judiciaire')}
              >
                <Gavel className="h-4 w-4 mr-2" />
                Calendrier judiciaire
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <div className="flex items-center mb-3">
                  <Scale className="h-6 w-6 mr-2 text-blue-700" />
                  <h4 className="font-medium">Affaires en cours</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Gérez les procès en cours et assignez des juges aux différentes affaires.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleNavigate('/republique/justice/affaires', 'Affaires Judiciaires')}
                >
                  Voir les affaires
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-purple-50/50 hover:bg-purple-50 transition-colors">
                <div className="flex items-center mb-3">
                  <Gavel className="h-6 w-6 mr-2 text-purple-700" />
                  <h4 className="font-medium">Procès importants</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Présidez directement les procès d'importance majeure pour la République.
                </p>
                <Button variant="outline" className="w-full mt-2">Présider un procès</Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Procès à venir</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Affaire</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Juge assigné</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>République c. Verres</TableCell>
                    <TableCell>Corruption</TableCell>
                    <TableCell>Ides de Juin</TableCell>
                    <TableCell>Hortensius</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Détails</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Flavius c. Tullius</TableCell>
                    <TableCell>Litige foncier</TableCell>
                    <TableCell>Kalendes de Juillet</TableCell>
                    <TableCell>Non assigné</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Assigner</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="edits" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Édits Juridiques</h3>
              <Button size="sm">
                <ScrollText className="h-4 w-4 mr-2" />
                Nouvel édit
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <p className="text-muted-foreground mb-4">
              En tant que Préteur, vous pouvez publier des édits qui établissent les bases légales
              pour l'année de votre mandat.
            </p>
            
            <div className="mt-4">
              <h4 className="font-medium mb-3">Édits promulgués</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Domaine</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Édit sur la propriété foncière</TableCell>
                    <TableCell>Ides de Mars</TableCell>
                    <TableCell>Droit civil</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Consulter</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Édit sur les témoignages</TableCell>
                    <TableCell>5 Kal. Avril</TableCell>
                    <TableCell>Procédure</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Consulter</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline"
                onClick={() => handleNavigate('/republique/lois', 'Lois et Édits')}
              >
                Voir l'archive complète des édits
              </Button>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="droitcivil" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Affaires Civiles</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-amber-50/50 hover:bg-amber-50 transition-colors">
                <div className="flex items-center mb-3">
                  <FileText className="h-6 w-6 mr-2 text-amber-700" />
                  <h4 className="font-medium">Contrats et Testaments</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Validez les contrats importants et arbitrez les litiges sur les héritages.
                </p>
                <Button variant="outline" className="w-full mt-2">Gérer les documents</Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                <div className="flex items-center mb-3">
                  <Scale className="h-6 w-6 mr-2 text-green-700" />
                  <h4 className="font-medium">Litiges Commerciaux</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Arbitrez les différends entre commerçants et réglez les litiges commerciaux.
                </p>
                <Button variant="outline" className="w-full mt-2">Voir les litiges</Button>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="registres" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Registres Juridiques</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="flex items-center justify-center py-8">
              <History className="h-12 w-12 mr-4 text-blue-700" />
              <div>
                <h4 className="font-medium text-lg mb-1">Archives du Droit Romain</h4>
                <p className="text-muted-foreground">
                  Consultez et mettez à jour les registres juridiques de la République.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Button variant="outline" className="py-6 h-auto flex flex-col">
                <ScrollText className="h-6 w-6 mb-2" />
                <span>Lois des XII Tables</span>
              </Button>
              
              <Button variant="outline" className="py-6 h-auto flex flex-col">
                <ScrollText className="h-6 w-6 mb-2" />
                <span>Décisions prétoriennes</span>
              </Button>
              
              <Button variant="outline" className="py-6 h-auto flex flex-col">
                <ScrollText className="h-6 w-6 mb-2" />
                <span>Jurisprudence</span>
              </Button>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
    </Tabs>
  );
};
