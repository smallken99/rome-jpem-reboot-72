
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsivePie } from '@nivo/pie';
import { 
  Users, 
  User, 
  Users2, 
  UserPlus, 
  Filter, 
  Download, 
  Send, 
  Check, 
  X, 
  Star,
  ScrollText,
  Shield
} from 'lucide-react';
import { useGameData } from '@/hooks/useGameData';
import { SenateurJouable } from '../../types/senateurs';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';

export const SenatComposition: React.FC<{ role?: 'mj' | 'player' }> = ({ role = 'player' }) => {
  const { senateurs, canEdit } = useGameData(role);
  const [filterFaction, setFilterFaction] = useState<string | null>(null);
  const [showMagistrates, setShowMagistrates] = useState(false);
  
  // États pour les fonctions supplémentaires
  const [viewType, setViewType] = useState<'list' | 'grid' | 'stats'>('list');
  
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
  
  // Fonction pour filtrer les sénateurs
  const filteredSenateurs = senateurs
    .filter(s => !filterFaction || s.appartenance === filterFaction)
    .filter(s => !showMagistrates || Boolean(s.fonction));
  
  // Fonction pour exporter la liste des sénateurs
  const exportSenateursList = () => {
    const data = JSON.stringify(senateurs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'senateurs.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Rendu pour la vue en grille
  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {filteredSenateurs.map((senateur) => (
        <Card key={senateur.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{senateur.prenom} {senateur.nom}</CardTitle>
            <CardDescription>
              <Badge className={
                senateur.appartenance === 'Optimates' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                senateur.appartenance === 'Populares' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }>
                {senateur.appartenance || 'Neutral'}
              </Badge>
              {senateur.fonction && (
                <Badge variant="outline" className="ml-2">
                  {senateur.fonction}
                </Badge>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Influence: {senateur.influence}/100</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Popularité: {senateur.popularite || 0}/100</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm">Détails</Button>
              {canEdit && (
                <Button variant="outline" size="sm" className="ml-2">Modifier</Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Fonctions politiques de la République
  const renderPoliticalFunctions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <FunctionCard
        title="Sénat"
        description="Gérer les assemblées, les votes, et les procédures législatives du Sénat."
        icon={<Users2 className="h-5 w-5" />}
        color="bg-amber-50"
        iconColor="text-amber-600"
        onClick={() => {}}
      />
      <FunctionCard
        title="Magistratures"
        description="Gérer les élections et les fonctions officielles de la République."
        icon={<Shield className="h-5 w-5" />}
        color="bg-blue-50"
        iconColor="text-blue-600"
        onClick={() => {}}
      />
      <FunctionCard
        title="Lois"
        description="Proposer, amender et consulter les lois en vigueur et leur application."
        icon={<ScrollText className="h-5 w-5" />}
        color="bg-emerald-50"
        iconColor="text-emerald-600"
        onClick={() => {}}
      />
      <FunctionCard
        title="Équilibre des pouvoirs"
        description="Surveiller la balance des influences politiques et les conflits d'intérêts."
        icon={<Star className="h-5 w-5" />}
        color="bg-purple-50"
        iconColor="text-purple-600"
        onClick={() => {}}
      />
    </div>
  );

  // Rendu pour la vue statistique
  const renderStatsView = () => (
    <div className="mt-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Répartition des factions au Sénat</CardTitle>
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Influence des factions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Optimates</span>
                  <span className="text-sm font-medium text-blue-600">
                    {Math.round(senateurs.filter(s => s.appartenance === 'Optimates').reduce((acc, s) => acc + s.influence, 0) / 
                    (senateurs.filter(s => s.appartenance === 'Optimates').length || 1))}%
                  </span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${senateurs.filter(s => s.appartenance === 'Optimates').reduce((acc, s) => acc + s.influence, 0) / 
                      (senateurs.filter(s => s.appartenance === 'Optimates').length || 1)}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Populares</span>
                  <span className="text-sm font-medium text-red-600">
                    {Math.round(senateurs.filter(s => s.appartenance === 'Populares').reduce((acc, s) => acc + s.influence, 0) / 
                    (senateurs.filter(s => s.appartenance === 'Populares').length || 1))}%
                  </span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ 
                      width: `${senateurs.filter(s => s.appartenance === 'Populares').reduce((acc, s) => acc + s.influence, 0) / 
                      (senateurs.filter(s => s.appartenance === 'Populares').length || 1)}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Neutres</span>
                  <span className="text-sm font-medium text-purple-600">
                    {Math.round(senateurs.filter(s => s.appartenance === 'Neutral').reduce((acc, s) => acc + s.influence, 0) / 
                    (senateurs.filter(s => s.appartenance === 'Neutral').length || 1))}%
                  </span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ 
                      width: `${senateurs.filter(s => s.appartenance === 'Neutral').reduce((acc, s) => acc + s.influence, 0) / 
                      (senateurs.filter(s => s.appartenance === 'Neutral').length || 1)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Âge moyen</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-32">
            <div className="text-4xl font-bold">
              {Math.round(senateurs.reduce((acc, s) => acc + s.age, 0) / senateurs.length)}
            </div>
            <p className="text-muted-foreground">ans</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Richesse</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-32">
            <div className="text-4xl font-bold">
              {Math.round(senateurs.reduce((acc, s) => acc + s.richesse, 0) / senateurs.length).toLocaleString()}
            </div>
            <p className="text-muted-foreground">as par sénateur</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Entête avec options et filtres */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-cinzel">Composition du Sénat</h2>
          <p className="text-muted-foreground">
            {filteredSenateurs.length} sénateurs {filterFaction ? `(${filterFaction})` : ''}
            {showMagistrates ? ' avec magistrature' : ''}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={viewType === 'list' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewType('list')}
              className="rounded-none"
            >
              <ScrollText className="h-4 w-4 mr-1" />
              Liste
            </Button>
            <Button 
              variant={viewType === 'grid' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewType('grid')}
              className="rounded-none"
            >
              <Users className="h-4 w-4 mr-1" />
              Grille
            </Button>
            <Button 
              variant={viewType === 'stats' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewType('stats')}
              className="rounded-none"
            >
              <Star className="h-4 w-4 mr-1" />
              Statistiques
            </Button>
          </div>
          
          <Select 
            value={filterFaction || ''} 
            onValueChange={(value) => setFilterFaction(value || null)}
          >
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Toutes les factions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les factions</SelectItem>
              <SelectItem value="Optimates">Optimates</SelectItem>
              <SelectItem value="Populares">Populares</SelectItem>
              <SelectItem value="Neutral">Neutres</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowMagistrates(!showMagistrates)}
            className={showMagistrates ? 'bg-blue-50' : ''}
          >
            <Filter className="h-4 w-4 mr-1" />
            {showMagistrates ? 'Tous' : 'Magistrats'}
          </Button>
          
          {canEdit && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={exportSenateursList}>
                  <Download className="h-4 w-4 mr-1" />
                  Exporter
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exporter la liste des sénateurs</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      
      {/* Vue principale : Liste, Grille ou Statistiques */}
      {viewType === 'list' && (
        <Card>
          <CardContent className="p-0">
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
                {filteredSenateurs.map((senator: SenateurJouable) => (
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
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          Détails
                        </Button>
                        {canEdit && (
                          <>
                            <Button variant="outline" size="sm">
                              <Send className="h-4 w-4 mr-1" />
                              Assigner
                            </Button>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {viewType === 'grid' && renderGridView()}
      
      {viewType === 'stats' && renderStatsView()}
      
      {/* Fonctions politiques (visibles uniquement pour MJ) */}
      {canEdit && renderPoliticalFunctions()}
    </div>
  );
};
