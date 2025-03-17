
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, Construction, MarketSquare, Hammer, Shield, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const EdileFunctions: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string, functionName: string) => {
    toast.info(`Accès à la fonction: ${functionName}`);
    navigate(path);
  };

  return (
    <Tabs defaultValue="batiments">
      <TabsList className="bg-white border border-rome-gold/30">
        <TabsTrigger value="batiments">Bâtiments Publics</TabsTrigger>
        <TabsTrigger value="marches">Marchés</TabsTrigger>
        <TabsTrigger value="securite">Sécurité</TabsTrigger>
        <TabsTrigger value="spectacles">Jeux et Spectacles</TabsTrigger>
      </TabsList>
      
      <TabsContent value="batiments" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Gestion des Bâtiments Publics</h3>
              <Button 
                size="sm"
                onClick={() => handleNavigate('/republique/batiments', 'Gestion des Bâtiments')}
              >
                <Building className="h-4 w-4 mr-2" />
                Voir les bâtiments
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-amber-50/50 hover:bg-amber-50 transition-colors">
                <div className="flex items-center mb-3">
                  <Construction className="h-6 w-6 mr-2 text-amber-700" />
                  <h4 className="font-medium">Projets de Construction</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Gérez les projets de construction en cours et proposez de nouveaux projets pour le bien de Rome.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleNavigate('/republique/batiments/projets', 'Projets de Construction')}
                >
                  Gérer les projets
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                <div className="flex items-center mb-3">
                  <Hammer className="h-6 w-6 mr-2 text-green-700" />
                  <h4 className="font-medium">Entretien et Réparations</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Supervisez l'entretien des bâtiments publics et autorisez les réparations nécessaires.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleNavigate('/republique/batiments/entretien', 'Entretien des Bâtiments')}
                >
                  Planifier entretien
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-3">Dernières inspections</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bâtiment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>État</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Forum Romain</TableCell>
                    <TableCell>Idus de Mai</TableCell>
                    <TableCell>Bon état</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Voir rapport</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Temple de Jupiter</TableCell>
                    <TableCell>Kalendes de Juin</TableCell>
                    <TableCell>Réparations mineures</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Voir rapport</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="marches" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Réglementation des Marchés</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <MarketSquare className="h-6 w-6 mr-2 text-blue-700" />
                  <h4 className="font-medium">Inspection des Marchés</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Assurez le contrôle des poids et mesures et vérifiez la qualité des produits vendus.
                </p>
                <Button variant="outline" className="w-full mt-2">Planifier inspection</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <FileText className="h-6 w-6 mr-2 text-blue-700" />
                  <h4 className="font-medium">Édits Commerciaux</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Promulguez des édits sur les prix et la réglementation commerciale.
                </p>
                <Button variant="outline" className="w-full mt-2">Rédiger un édit</Button>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="securite" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Sécurité Publique</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="py-8 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-700" />
              <p className="text-muted-foreground mb-4">
                En tant qu'Édile, vous êtes responsable de la sécurité publique dans Rome.
                Organisez des patrouilles et répondez aux incidents.
              </p>
              <div className="flex justify-center gap-4">
                <Button>Organisation des vigiles</Button>
                <Button variant="outline">Incidents récents</Button>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="spectacles" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Organisation des Jeux et Spectacles</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Jeux Romains</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Organisez les Ludi Romani en l'honneur de Jupiter.
                </p>
                <Button className="w-full">Planifier les jeux</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Spectacles théâtraux</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Mettez en place des représentations théâtrales pour divertir le peuple.
                </p>
                <Button className="w-full">Organiser spectacle</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Financement</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Demandez des fonds au Sénat ou financez vous-même les spectacles pour gagner en prestige.
              </p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline">Demande au Sénat</Button>
                <Button variant="default">Financement personnel</Button>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
    </Tabs>
  );
};
