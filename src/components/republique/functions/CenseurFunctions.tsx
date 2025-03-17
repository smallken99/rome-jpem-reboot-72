
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, Users, Building, ShoppingBag, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CenseurFunctions: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string, functionName: string) => {
    toast.info(`Accès à la fonction: ${functionName}`);
    navigate(path);
  };

  return (
    <Tabs defaultValue="recensement">
      <TabsList className="bg-white border border-rome-gold/30">
        <TabsTrigger value="recensement">Recensement</TabsTrigger>
        <TabsTrigger value="ordres">Ordres</TabsTrigger>
        <TabsTrigger value="proprietes">Propriétés</TabsTrigger>
        <TabsTrigger value="moralite">Moralité</TabsTrigger>
      </TabsList>
      
      <TabsContent value="recensement" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Recensement des Citoyens</h3>
              <Button 
                size="sm"
                onClick={() => handleNavigate('/republique/census', 'Recensement')}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                Lancer recensement
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 border rounded-lg bg-blue-50/50">
                <h4 className="font-medium text-center mb-2">Citoyens Romains</h4>
                <p className="text-2xl font-bold text-center">312,825</p>
                <p className="text-xs text-center text-muted-foreground mt-1">Dernier recensement: 703 AUC</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-amber-50/50">
                <h4 className="font-medium text-center mb-2">Chevaliers</h4>
                <p className="text-2xl font-bold text-center">1,842</p>
                <p className="text-xs text-center text-muted-foreground mt-1">+53 depuis 700 AUC</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-purple-50/50">
                <h4 className="font-medium text-center mb-2">Sénateurs</h4>
                <p className="text-2xl font-bold text-center">302</p>
                <p className="text-xs text-center text-muted-foreground mt-1">Incluant 42 patriciens</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-3">Statistiques démographiques</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="text-sm font-medium mb-2">Répartition par classe</h5>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>1ère classe</span>
                        <span>18,520 citoyens</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '6%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>2ème classe</span>
                        <span>25,340 citoyens</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '8%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>3ème classe</span>
                        <span>37,150 citoyens</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>4ème classe</span>
                        <span>78,420 citoyens</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>5ème classe</span>
                        <span>153,395 citoyens</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '49%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h5 className="text-sm font-medium mb-2">Distribution géographique</h5>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Rome</span>
                        <span>120,750 citoyens</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '39%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Latium</span>
                        <span>87,640 citoyens</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Campanie</span>
                        <span>52,380 citoyens</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '17%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Autres</span>
                        <span>52,055 citoyens</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '16%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="ordres" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Ordres et Statuts</h3>
              <Button 
                size="sm"
                onClick={() => handleNavigate('/republique/senat', 'Sénat Romain')}
              >
                <Users className="h-4 w-4 mr-2" />
                Voir le Sénat
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-purple-50/50 hover:bg-purple-50 transition-colors">
                <div className="flex items-center mb-3">
                  <Star className="h-6 w-6 mr-2 text-purple-700" />
                  <h4 className="font-medium">Lectio Senatus</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Révision de la liste des sénateurs et nomination de nouveaux membres.
                </p>
                <Button variant="outline" className="w-full mt-2">Procéder à la lectio</Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-amber-50/50 hover:bg-amber-50 transition-colors">
                <div className="flex items-center mb-3">
                  <Users className="h-6 w-6 mr-2 text-amber-700" />
                  <h4 className="font-medium">Ordre Équestre</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Promotion et révision du statut des chevaliers et publicains.
                </p>
                <Button variant="outline" className="w-full mt-2">Gérer l'ordre équestre</Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Actions récentes</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Citoyen</TableHead>
                    <TableHead>Changement de statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Motif</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Marcus Octavius</TableCell>
                    <TableCell>Promu au Sénat</TableCell>
                    <TableCell>Ides de Mars</TableCell>
                    <TableCell>Services à l'état</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lucius Caecilius</TableCell>
                    <TableCell>Dégradé du Sénat</TableCell>
                    <TableCell>Kal. Avril</TableCell>
                    <TableCell>Mœurs dissolues</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Quintus Pompeius</TableCell>
                    <TableCell>Promu à l'ordre équestre</TableCell>
                    <TableCell>5 Kal. Mai</TableCell>
                    <TableCell>Enrichissement légitime</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="proprietes" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel">Registre des Propriétés</h3>
              <Button 
                size="sm"
                onClick={() => handleNavigate('/republique/ager', 'Ager Publicus')}
              >
                <Building className="h-4 w-4 mr-2" />
                Voir les terres publiques
              </Button>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                <div className="flex items-center mb-3">
                  <Building className="h-6 w-6 mr-2 text-green-700" />
                  <h4 className="font-medium">Propriétés publiques</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Gérez l'inventaire des biens appartenant à la République et leur utilisation.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleNavigate('/republique/batiments', 'Bâtiments Publics')}
                >
                  Voir l'inventaire
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <div className="flex items-center mb-3">
                  <ShoppingBag className="h-6 w-6 mr-2 text-blue-700" />
                  <h4 className="font-medium">Contrats publics</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Examinez et approuvez les contrats d'adjudication pour les services publics.
                </p>
                <Button variant="outline" className="w-full mt-2">Gérer les contrats</Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Évaluations récentes</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Propriété</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Valeur estimée</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Villa de Tusculum</TableCell>
                    <TableCell>Domaine rural</TableCell>
                    <TableCell>2,500,000 as</TableCell>
                    <TableCell>Évaluation complète</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Forum Piscarium</TableCell>
                    <TableCell>Marché public</TableCell>
                    <TableCell>4,700,000 as</TableCell>
                    <TableCell>Révisé récemment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mines d'argent en Hispanie</TableCell>
                    <TableCell>Concession minière</TableCell>
                    <TableCell>8,300,000 as</TableCell>
                    <TableCell>En cours d'évaluation</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
      
      <TabsContent value="moralite" className="mt-4 space-y-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Gardien des Mœurs</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="py-8 text-center">
              <ClipboardList className="h-12 w-12 mx-auto mb-4 text-red-700" />
              <p className="text-muted-foreground mb-4">
                En tant que Censeur, vous êtes le gardien des mœurs romaines et de la tradition (mos maiorum).
                Vous pouvez blâmer publiquement (nota censoria) les citoyens pour comportement indigne.
              </p>
              <div className="flex justify-center gap-4">
                <Button>Émettre un blâme</Button>
                <Button variant="outline">Registre des blâmes</Button>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-3">Récentes réprimandes</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Citoyen</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Offense</TableHead>
                    <TableHead>Sanction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Titus Sempronius</TableCell>
                    <TableCell>Sénateur</TableCell>
                    <TableCell>Extravagance excessive</TableCell>
                    <TableCell>Blâme public</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gaius Fabricius</TableCell>
                    <TableCell>Chevalier</TableCell>
                    <TableCell>Mariage inapproprié</TableCell>
                    <TableCell>Avertissement</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marcus Postumius</TableCell>
                    <TableCell>Sénateur</TableCell>
                    <TableCell>Négligence militaire</TableCell>
                    <TableCell>Dégradation</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
    </Tabs>
  );
};
