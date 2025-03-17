
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CoinsIcon, TrendingUp, FileText, Building, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const QuesteurFunctions: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string, functionName: string) => {
    toast.info(`Accès à la fonction: ${functionName}`);
    navigate(path);
  };

  return (
    <Tabs defaultValue="tresor">
      <TabsList className="bg-white border border-rome-gold/30">
        <TabsTrigger value="tresor">Trésor Public</TabsTrigger>
        <TabsTrigger value="impots">Perception des Impôts</TabsTrigger>
        <TabsTrigger value="acquisitions">Acquisitions Publiques</TabsTrigger>
        <TabsTrigger value="audits">Audits Financiers</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tresor" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">État du Trésor Public</h3>
              <Button size="sm" onClick={() => handleNavigate('/economie', 'Gestion Économique')}>
                <CoinsIcon className="h-4 w-4 mr-2" />
                Rapport détaillé
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 border rounded-lg bg-amber-50/50">
                <h4 className="font-medium text-center mb-2">Trésorerie</h4>
                <p className="text-2xl font-bold text-center">15,432,000 <span className="text-sm font-normal">as</span></p>
                <p className="text-xs text-center text-muted-foreground mt-1">Dernière mise à jour: Ides de Mai</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-green-50/50">
                <h4 className="font-medium text-center mb-2">Revenus Mensuels</h4>
                <p className="text-2xl font-bold text-center">+842,000 <span className="text-sm font-normal">as</span></p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+3% ce mois</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-red-50/50">
                <h4 className="font-medium text-center mb-2">Dépenses Mensuelles</h4>
                <p className="text-2xl font-bold text-center">-713,000 <span className="text-sm font-normal">as</span></p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
                  <span className="text-xs text-red-600">-2% ce mois</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-3">Mouvements récents</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Approuvé par</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Solde légions d'Hispanie</TableCell>
                    <TableCell>10 Kal. Juin</TableCell>
                    <TableCell className="text-red-600">-250,000 as</TableCell>
                    <TableCell>Consul Maximus</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Taxes portuaires d'Ostie</TableCell>
                    <TableCell>Ides de Mai</TableCell>
                    <TableCell className="text-green-600">+120,000 as</TableCell>
                    <TableCell>Questeur Titus</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Réparation aqueduc Appia</TableCell>
                    <TableCell>5 Kal. Mai</TableCell>
                    <TableCell className="text-red-600">-85,000 as</TableCell>
                    <TableCell>Édile Publius</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="impots" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Perception des Impôts</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <div className="flex items-center mb-3">
                  <FileText className="h-6 w-6 mr-2 text-blue-700" />
                  <h4 className="font-medium">Édits Fiscaux</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Émettez des édits fiscaux pour ajuster les taux d'imposition et les collectes spéciales.
                </p>
                <Button variant="outline" className="w-full mt-2">Rédiger un édit</Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-purple-50/50 hover:bg-purple-50 transition-colors">
                <div className="flex items-center mb-3">
                  <CoinsIcon className="h-6 w-6 mr-2 text-purple-700" />
                  <h4 className="font-medium">Collecte Provinciale</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Organisez la collecte des tributs dans les provinces romaines.
                </p>
                <Button variant="outline" className="w-full mt-2">Gérer collecte</Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Collectes en cours</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Province/Région</TableHead>
                    <TableHead>Type d'impôt</TableHead>
                    <TableHead>Montant attendu</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead>État</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Gaule Cisalpine</TableCell>
                    <TableCell>Tribut annuel</TableCell>
                    <TableCell>300,000 as</TableCell>
                    <TableCell>Kal. Juillet</TableCell>
                    <TableCell>En cours</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sicile</TableCell>
                    <TableCell>Dîme sur le blé</TableCell>
                    <TableCell>450,000 as</TableCell>
                    <TableCell>Ides d'Août</TableCell>
                    <TableCell>En cours</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="acquisitions" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Acquisitions Publiques</h3>
              <Button size="sm">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Nouvelle acquisition
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <Building className="h-6 w-6 mr-2 text-amber-700" />
                  <h4 className="font-medium">Projets Immobiliers</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Financez et suivez les projets immobiliers publics approuvés par le Sénat.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleNavigate('/republique/batiments/financement', 'Financement des Bâtiments')}
                >
                  Gérer projets
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <ShoppingBag className="h-6 w-6 mr-2 text-amber-700" />
                  <h4 className="font-medium">Appels d'Offres</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Lancez des appels d'offres pour des fournitures et services publics.
                </p>
                <Button variant="outline" className="w-full mt-2">Lancer appel d'offres</Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Acquisitions récentes</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Fournisseur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Armes pour la Legio IX</TableCell>
                    <TableCell>3 Ides de Mai</TableCell>
                    <TableCell>120,000 as</TableCell>
                    <TableCell>Atticus & Fils</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marbre pour le temple de Vesta</TableCell>
                    <TableCell>Kal. Mai</TableCell>
                    <TableCell>80,000 as</TableCell>
                    <TableCell>Carrières de Luna</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="audits" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Audits Financiers</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="py-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-blue-700" />
              <p className="text-muted-foreground mb-4">
                En tant que Questeur, vous pouvez auditer les comptes publics et ceux des magistrats.
                Identifiez les irrégularités et prévenez la corruption.
              </p>
              <div className="flex justify-center gap-4">
                <Button>Nouvel audit</Button>
                <Button variant="outline">Audits précédents</Button>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
    </Tabs>
  );
};
