
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsivePie } from '@nivo/pie';
import { Users, User, Users2, UserPlus } from 'lucide-react';
import { useGameData } from '@/hooks/useGameData';

export const SenatComposition: React.FC<{ role?: 'mj' | 'player' }> = ({ role = 'player' }) => {
  const { senateurs, canEdit } = useGameData(role);
  
  // Calculer les factions basées sur les sénateurs
  const factions = [
    { 
      id: 'optimates', 
      label: 'Optimates', 
      value: senateurs.filter(s => s.appartenance === 'Optimates').length,
      color: '#3b82f6' 
    },
    { 
      id: 'populares', 
      label: 'Populares', 
      value: senateurs.filter(s => s.appartenance === 'Populares').length,
      color: '#ef4444' 
    },
    { 
      id: 'neutral', 
      label: 'Neutres', 
      value: senateurs.filter(s => s.appartenance === 'Neutral').length,
      color: '#a855f7' 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Répartition des Factions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsivePie
                data={factions}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'paired' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle'
                  }
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques du Sénat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sénateurs totaux</p>
                  <p className="text-2xl font-bold">{senateurs.length}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Users2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Présence moyenne</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Influence moyenne</p>
                  <p className="text-2xl font-bold">62/100</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <UserPlus className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nouveaux sénateurs</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sénateurs influents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Faction</TableHead>
                <TableHead>Influence</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {senateurs.map(senator => (
                <TableRow key={senator.id}>
                  <TableCell className="font-medium">{senator.prenom} {senator.nom}</TableCell>
                  <TableCell>
                    <Badge className={
                      senator.appartenance === 'Optimates' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                      senator.appartenance === 'Populares' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                      'bg-purple-100 text-purple-800 hover:bg-purple-200'
                    }>
                      {senator.appartenance || 'Neutral'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          senator.influence > 80 ? 'bg-green-500' :
                          senator.influence > 60 ? 'bg-yellow-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${senator.influence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{senator.influence}/100</span>
                  </TableCell>
                  <TableCell>{senator.fonction || (senator.roles && senator.roles.length > 0 ? senator.roles[0] : "Sénateur")}</TableCell>
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
