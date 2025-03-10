
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Scroll, FileText, Check, X, Clock, BarChart } from 'lucide-react';

export const ProcessusLegislatif: React.FC = () => {
  // Mock data for pending laws
  const pendingLaws = [
    { 
      id: 1, 
      title: 'Lex Agraria', 
      proposer: 'Tiberius Gracchus', 
      category: 'Agraire', 
      phase: 'Débat', 
      votesFor: 42, 
      votesAgainst: 35, 
      abstentions: 23,
      daysLeft: 8
    },
    { 
      id: 2, 
      title: 'Lex de Bello Indicendo', 
      proposer: 'Gaius Julius Caesar', 
      category: 'Militaire', 
      phase: 'Vote', 
      votesFor: 56, 
      votesAgainst: 12, 
      abstentions: 8,
      daysLeft: 2
    },
    { 
      id: 3, 
      title: 'Lex de Vectigalibus', 
      proposer: 'Marcus Licinius Crassus', 
      category: 'Fiscale', 
      phase: 'Proposition', 
      votesFor: 0, 
      votesAgainst: 0, 
      abstentions: 0,
      daysLeft: 14
    },
    { 
      id: 4, 
      title: 'Lex Judiciaria', 
      proposer: 'Marcus Tullius Cicero', 
      category: 'Judiciaire', 
      phase: 'Délibération', 
      votesFor: 28, 
      votesAgainst: 21, 
      abstentions: 15,
      daysLeft: 5
    }
  ];

  // Render a badge with appropriate color based on the phase of the law
  const renderPhaseBadge = (phase: string) => {
    switch (phase) {
      case 'Proposition':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Proposition</Badge>;
      case 'Débat':
        return <Badge variant="outline" className="border-orange-500 text-orange-700">Débat</Badge>;
      case 'Délibération':
        return <Badge variant="outline" className="border-purple-500 text-purple-700">Délibération</Badge>;
      case 'Vote':
        return <Badge variant="outline" className="border-green-500 text-green-700">Vote</Badge>;
      default:
        return <Badge variant="outline">{phase}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Processus Législatif</CardTitle>
            <CardDescription>
              Les étapes de création d'une loi dans la République romaine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Scroll className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800">1. Proposition</h3>
                  <p className="text-sm text-muted-foreground">
                    Un magistrat ou un sénateur propose une nouvelle loi au Sénat
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-orange-800">2. Débat</h3>
                  <p className="text-sm text-muted-foreground">
                    La proposition est débattue lors de sessions publiques
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <BarChart className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-800">3. Délibération</h3>
                  <p className="text-sm text-muted-foreground">
                    Les sénateurs délibèrent et proposent des amendements
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">4. Vote</h3>
                  <p className="text-sm text-muted-foreground">
                    Le Sénat vote la proposition de loi
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Votes en cours</CardTitle>
            <CardDescription>
              Répartition par catégorie des lois en attente de vote
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Agraires</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-amber-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Militaires</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fiscales</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Judiciaires</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Autres</span>
                  <span className="font-medium">5%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-gray-500 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lois en attente de vote</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Proposeur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Votes pour/contre</TableHead>
                <TableHead>Jours restants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingLaws.map(law => (
                <TableRow key={law.id}>
                  <TableCell className="font-medium">{law.title}</TableCell>
                  <TableCell>{law.proposer}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{law.category}</Badge>
                  </TableCell>
                  <TableCell>{renderPhaseBadge(law.phase)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="flex items-center text-green-600">
                        <Check className="h-3 w-3 mr-1" /> {law.votesFor}
                      </span>
                      <span>/</span>
                      <span className="flex items-center text-red-600">
                        <X className="h-3 w-3 mr-1" /> {law.votesAgainst}
                      </span>
                      <span className="text-gray-400 text-xs">({law.abstentions} abst.)</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      law.daysLeft <= 3 ? 'bg-red-100 text-red-800' : 
                      law.daysLeft <= 7 ? 'bg-amber-100 text-amber-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {law.daysLeft} jours
                    </span>
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
