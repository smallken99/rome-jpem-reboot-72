
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, ShieldAlert, TrendingUp, TrendingDown } from 'lucide-react';

// Create custom Handshake icon since it's not in lucide-react
const HandshakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 13l2 2 4-4.5-1-1-5 2.5-3.5-2.5-3 2.5-1.5-1" />
    <path d="M11.5 17.5l-1-1-2 2 2 2 1-1 8.5-8.5" />
    <path d="M25 5l3 3" />
    <path d="M1 14l3 3" />
  </svg>
);

export const RelationsDiplomatiques: React.FC = () => {
  // Mock data for diplomatic relations
  const treaties = [
    {
      id: 1,
      name: "Foedus Carthaginiense",
      parties: ["République Romaine", "Carthage"],
      type: "Paix",
      date: "201 av. J.-C.",
      status: "Actif",
      terms: "Carthage paie une indemnité de guerre et renonce à sa flotte de guerre",
      relationLevel: 30
    },
    {
      id: 2,
      name: "Foedus Aegyptiacum",
      parties: ["République Romaine", "Égypte Ptolémaïque"],
      type: "Alliance",
      date: "173 av. J.-C.",
      status: "Actif",
      terms: "Alliance militaire et commerciale, échange d'ambassadeurs",
      relationLevel: 85
    },
    {
      id: 3,
      name: "Pactum Macedonicum",
      parties: ["République Romaine", "Royaume de Macédoine"],
      type: "Soumission",
      date: "168 av. J.-C.",
      status: "Actif",
      terms: "La Macédoine devient un protectorat romain, paie un tribut annuel",
      relationLevel: 45
    },
    {
      id: 4,
      name: "Foedus Gallicum",
      parties: ["République Romaine", "Tribus Gauloises"],
      type: "Non-agression",
      date: "154 av. J.-C.",
      status: "En renégociation",
      terms: "Cessation des hostilités, établissement de frontières",
      relationLevel: 60
    },
    {
      id: 5,
      name: "Foedus Syriacum",
      parties: ["République Romaine", "Empire Séleucide"],
      type: "Commercial",
      date: "188 av. J.-C.",
      status: "Expiré",
      terms: "Droits commerciaux préférentiels, limitation de la taille de la flotte séleucide",
      relationLevel: 20
    }
  ];

  const peoples = [
    { 
      id: 1, 
      name: "Carthage", 
      region: "Afrique du Nord",
      status: "Soumis",
      relationLevel: 30, 
      relationTrend: "stable",
      lastContact: "23 jours",
      ambassador: "Marcus Porcius Cato",
      issues: ["Dispute commerciale"]
    },
    { 
      id: 2, 
      name: "Égypte Ptolémaïque", 
      region: "Afrique du Nord-Est",
      status: "Allié",
      relationLevel: 85, 
      relationTrend: "improving",
      lastContact: "8 jours",
      ambassador: "Gnaeus Pompeius Magnus",
      issues: []
    },
    { 
      id: 3, 
      name: "Royaume de Macédoine", 
      region: "Grèce",
      status: "Province",
      relationLevel: 45, 
      relationTrend: "stable",
      lastContact: "45 jours",
      ambassador: "Lucius Aemilius Paullus",
      issues: ["Révolte récente"]
    },
    { 
      id: 4, 
      name: "Tribus Gauloises", 
      region: "Gaule",
      status: "Neutre",
      relationLevel: 60, 
      relationTrend: "declining",
      lastContact: "12 jours",
      ambassador: "Gaius Julius Caesar",
      issues: ["Violations frontalières", "Raids"]
    },
    { 
      id: 5, 
      name: "Empire Séleucide", 
      region: "Asie Mineure",
      status: "Hostile",
      relationLevel: 20, 
      relationTrend: "declining",
      lastContact: "67 jours",
      ambassador: "Aucun",
      issues: ["Conflit territorial", "Soutien aux pirates"]
    }
  ];

  // Helper function to render a badge for relation status
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Allié":
        return <Badge className="bg-green-100 text-green-800">Allié</Badge>;
      case "Neutre":
        return <Badge className="bg-blue-100 text-blue-800">Neutre</Badge>;
      case "Soumis":
        return <Badge className="bg-amber-100 text-amber-800">Soumis</Badge>;
      case "Province":
        return <Badge className="bg-purple-100 text-purple-800">Province</Badge>;
      case "Hostile":
        return <Badge className="bg-red-100 text-red-800">Hostile</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper function to render treaty status
  const renderTreatyStatusBadge = (status: string) => {
    switch (status) {
      case "Actif":
        return <Badge variant="outline" className="border-green-500 text-green-700">Actif</Badge>;
      case "En renégociation":
        return <Badge variant="outline" className="border-amber-500 text-amber-700">En renégociation</Badge>;
      case "Expiré":
        return <Badge variant="outline" className="border-red-500 text-red-700">Expiré</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <CardTitle>Relations par région</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Grèce</span>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium">Forte</span>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Afrique du Nord</span>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium">Moyenne</span>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Asie Mineure</span>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium">Tendue</span>
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gaule</span>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium">Variable</span>
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hispanie</span>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium">Bonne</span>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <HandshakeIcon className="h-5 w-5 text-green-600" />
              <CardTitle>Traités récents</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treaties.slice(0, 3).map(treaty => (
                <div key={treaty.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="font-medium">{treaty.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {treaty.parties.join(' — ')}
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span>{treaty.date}</span>
                    {renderTreatyStatusBadge(treaty.status)}
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                Voir tous les traités
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-600" />
              <CardTitle>Alertes diplomatiques</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-100 p-3 rounded-md">
                <div className="font-medium text-red-800">Empire Séleucide</div>
                <div className="text-sm text-red-700">
                  Mouvement de troupes signalé près de la frontière
                </div>
                <div className="mt-1 text-xs text-red-600">3 jours</div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-3 rounded-md">
                <div className="font-medium text-amber-800">Tribus Gauloises</div>
                <div className="text-sm text-amber-700">
                  Raids signalés dans la province de Narbonnaise
                </div>
                <div className="mt-1 text-xs text-amber-600">7 jours</div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-3 rounded-md">
                <div className="font-medium text-amber-800">Égypte Ptolémaïque</div>
                <div className="text-sm text-amber-700">
                  Demande d'assistance militaire reçue
                </div>
                <div className="mt-1 text-xs text-amber-600">2 jours</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relations diplomatiques</CardTitle>
          <CardDescription>
            État des relations avec les peuples étrangers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Peuple</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Relation</TableHead>
                <TableHead>Tendance</TableHead>
                <TableHead>Ambassadeur</TableHead>
                <TableHead>Problèmes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peoples.map(people => (
                <TableRow key={people.id}>
                  <TableCell className="font-medium">{people.name}</TableCell>
                  <TableCell>{people.region}</TableCell>
                  <TableCell>
                    {renderStatusBadge(people.status)}
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          people.relationLevel > 75 ? 'bg-green-500' :
                          people.relationLevel > 50 ? 'bg-blue-500' :
                          people.relationLevel > 25 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${people.relationLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{people.relationLevel}/100</span>
                  </TableCell>
                  <TableCell>
                    {people.relationTrend === 'improving' ? (
                      <span className="flex items-center text-green-600 text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" /> Amélioration
                      </span>
                    ) : people.relationTrend === 'declining' ? (
                      <span className="flex items-center text-red-600 text-sm">
                        <TrendingDown className="h-4 w-4 mr-1" /> Détérioration
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">Stable</span>
                    )}
                  </TableCell>
                  <TableCell>{people.ambassador}</TableCell>
                  <TableCell>
                    {people.issues.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {people.issues.map((issue, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">Aucun</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
