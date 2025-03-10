
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scale, Shield, AlertTriangle, User } from 'lucide-react';
import { 
  CaseStatus, 
  CaseType, 
  JudicialCase, 
  JusticeStatistics, 
  mockJudicialCases, 
  justiceStatistics 
} from '@/data/republic/justiceData';

export const SystemeJudiciaire: React.FC = () => {
  // Get cases from the mock data
  const cases = mockJudicialCases;
  const stats = justiceStatistics;

  // Helper function to render a status badge
  const renderStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-700">En attente</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">En cours</Badge>;
      case 'decided':
        return <Badge variant="outline" className="border-green-500 text-green-700">Jugé</Badge>;
      case 'appealed':
        return <Badge variant="outline" className="border-purple-500 text-purple-700">En appel</Badge>;
      case 'closed':
        return <Badge variant="outline" className="border-gray-500 text-gray-700">Clos</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Helper function to render a type badge
  const renderTypeBadge = (type: CaseType) => {
    switch (type) {
      case 'civil':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Civil</Badge>;
      case 'criminal':
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">Criminel</Badge>;
      case 'political':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Politique</Badge>;
      case 'religious':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">Religieux</Badge>;
      case 'administrative':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">Administratif</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              <CardTitle>Procès actifs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeCases}</div>
            <p className="text-sm text-muted-foreground">
              {stats.backlog} en attente de traitement
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Durée moyenne:</span>
                <div className="font-medium">{stats.averageDuration} jours</div>
              </div>
              <div>
                <span className="text-muted-foreground">Taux de condamnation:</span>
                <div className="font-medium">{stats.convictionRate}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <CardTitle>Répartition par type</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Civils</span>
                  <span className="font-medium">{stats.byType.civil}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(stats.byType.civil / stats.activeCases) * 100}%` }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Criminels</span>
                  <span className="font-medium">{stats.byType.criminal}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full" style={{ width: `${(stats.byType.criminal / stats.activeCases) * 100}%` }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Politiques</span>
                  <span className="font-medium">{stats.byType.political}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(stats.byType.political / stats.activeCases) * 100}%` }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Religieux</span>
                  <span className="font-medium">{stats.byType.religious}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${(stats.byType.religious / stats.activeCases) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <CardTitle>Magistrats présidents</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...new Set(cases.map(c => c.presidingMagistrate))].map((magistrate, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{magistrate}</div>
                    <div className="text-sm text-muted-foreground">
                      {cases.filter(c => c.presidingMagistrate === magistrate).length} affaires
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {magistrate === 'Marcus Aurelius Cotta' ? 'Préteur' : 'En attente'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Procès en cours</CardTitle>
          <CardDescription>
            Affaires judiciaires actuellement traitées par les tribunaux romains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Parties</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Magistrat</TableHead>
                <TableHead>Intérêt public</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map(judicialCase => (
                <TableRow key={judicialCase.id}>
                  <TableCell className="font-medium">{judicialCase.title}</TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div className="font-medium">Plaignant: {judicialCase.plaintiff}</div>
                      <div className="text-muted-foreground">Défendeur: {judicialCase.defendant}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderTypeBadge(judicialCase.type)}
                  </TableCell>
                  <TableCell>
                    {renderStatusBadge(judicialCase.status)}
                  </TableCell>
                  <TableCell>
                    {judicialCase.presidingMagistrate}
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          judicialCase.publicInterest > 75 ? 'bg-red-500' :
                          judicialCase.publicInterest > 50 ? 'bg-amber-500' :
                          judicialCase.publicInterest > 25 ? 'bg-blue-500' :
                          'bg-gray-500'
                        }`}
                        style={{ width: `${judicialCase.publicInterest}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{judicialCase.publicInterest}%</span>
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
