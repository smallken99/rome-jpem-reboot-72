
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollText, FileCheck, FileX, History, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loi } from './types/lois';

// Données factices pour démonstration
const MOCK_LOIS: Loi[] = [
  {
    id: "1",
    titre: "Lex Sempronia Agraria",
    description: "Loi sur la redistribution des terres publiques",
    proposeur: "Tiberius Sempronius Gracchus",
    catégorie: "Agraire",
    date: { year: -133, season: "SPRING" },
    état: "Promulguée",
    importance: "majeure",
    votesPositifs: 18,
    votesNégatifs: 10,
    votesAbstention: 2,
    effets: { "stabilité": -10, "popularité": 15 }
  },
  {
    id: "2",
    titre: "Lex Tullia de Ambitu",
    description: "Interdiction de distribuer des dons lors des élections",
    proposeur: "Marcus Tullius Cicero",
    catégorie: "Électorale",
    date: { year: -63, season: "SUMMER" },
    état: "Promulguée",
    importance: "mineure",
    votesPositifs: 23,
    votesNégatifs: 7,
    votesAbstention: 0,
    effets: { "corruption": -5 }
  },
  {
    id: "3",
    titre: "Lex Julia Municipalis",
    description: "Réorganisation de l'administration municipale",
    proposeur: "Gaius Julius Caesar",
    catégorie: "Administrative",
    date: { year: -45, season: "AUTUMN" },
    état: "En délibération",
    importance: "mineure",
    votesPositifs: 15,
    votesNégatifs: 12,
    votesAbstention: 3,
    effets: { "efficacité": 8 }
  }
];

export const GestionLois: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des Lois</h2>
          <p className="text-muted-foreground">
            Gérez les lois de la République, leur promulgation et leurs effets
          </p>
        </div>
        <Button>
          <ScrollText className="mr-2 h-4 w-4" />
          Nouvelle Loi
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Input placeholder="Rechercher une loi..." className="max-w-sm" />
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="actives" className="space-y-4">
        <TabsList>
          <TabsTrigger value="actives" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Lois Actives</span>
          </TabsTrigger>
          <TabsTrigger value="proposees" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            <span>Lois Proposées</span>
          </TabsTrigger>
          <TabsTrigger value="rejetees" className="flex items-center gap-2">
            <FileX className="h-4 w-4" />
            <span>Lois Rejetées</span>
          </TabsTrigger>
          <TabsTrigger value="historique" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Historique</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="actives">
          <Card>
            <CardHeader>
              <CardTitle>Lois en vigueur</CardTitle>
              <CardDescription>
                Lois promulguées et actuellement en application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_LOIS.filter(loi => loi.état === "Promulguée").map(loi => (
                  <Card key={loi.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{loi.titre}</h3>
                        <p className="text-sm text-muted-foreground">{loi.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                            {loi.catégorie}
                          </span>
                          <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                            {`${loi.date.season === "SPRING" ? "Printemps" : 
                               loi.date.season === "SUMMER" ? "Été" : 
                               loi.date.season === "AUTUMN" ? "Automne" : "Hiver"} ${Math.abs(loi.date.year)} ${loi.date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="destructive" size="sm">Abroger</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="proposees">
          <Card>
            <CardHeader>
              <CardTitle>Lois proposées</CardTitle>
              <CardDescription>
                Projets de loi en attente de vote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_LOIS.filter(loi => loi.état === "En délibération").map(loi => (
                  <Card key={loi.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{loi.titre}</h3>
                        <p className="text-sm text-muted-foreground">{loi.description}</p>
                        <p className="text-sm mt-1">Proposeur: <span className="font-medium">{loi.proposeur}</span></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="default" size="sm">Organiser le vote</Button>
                        <Button variant="outline" size="sm">Détails</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejetees">
          <Card>
            <CardHeader>
              <CardTitle>Lois rejetées</CardTitle>
              <CardDescription>
                Projets de loi qui n'ont pas été adoptés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Aucune loi rejetée récemment
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="historique">
          <Card>
            <CardHeader>
              <CardTitle>Historique législatif</CardTitle>
              <CardDescription>
                Archives des lois et des votes passés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Contenu à développer: timeline des législations passées...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
