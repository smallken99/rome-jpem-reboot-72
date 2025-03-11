
import React, { useState } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InfoCircle, Award, Users, Filter, UserPlus, FileText } from 'lucide-react';
import { SenateurJouable } from '@/components/maitrejeu/types';
import { useGameData } from '@/hooks/useGameData';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SenateurStatusBadge } from './SenateurStatusBadge';
import { SenateurInfluenceBar } from './SenateurInfluenceBar';

interface SenatCompositionProps {
  role: 'mj' | 'player';
}

export const SenatComposition: React.FC<SenatCompositionProps> = ({ role }) => {
  const { senateurs: allSenateurs } = useGameData(role);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('tous');

  // Filtrer les sénateurs selon les critères
  const filteredSenateurs = allSenateurs.filter(senateur => {
    // Recherche par nom
    const matchesSearch = 
      senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
      senateur.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (senateur.fonction && senateur.fonction.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filtre par statut
    const matchesStatus = !filterStatus || senateur.status === filterStatus;
    
    // Filtre par onglet
    if (currentTab === 'tous') return matchesSearch && matchesStatus;
    if (currentTab === 'magistrats') return matchesSearch && matchesStatus && senateur.fonction;
    if (currentTab === 'influents') return matchesSearch && matchesStatus && (senateur.influence || 0) > 50;
    if (currentTab === 'joueurs') return matchesSearch && matchesStatus && senateur.joueur;
    
    return matchesSearch && matchesStatus;
  });

  // Statistiques du Sénat
  const senatStats = {
    total: allSenateurs.length,
    magistrats: allSenateurs.filter(s => s.fonction).length,
    joueurs: allSenateurs.filter(s => s.joueur).length,
    patriciens: allSenateurs.filter(s => s.patricien).length,
    plebeiens: allSenateurs.filter(s => !s.patricien).length
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Composition du Sénat</CardTitle>
          <CardDescription>
            Vue d'ensemble des {filteredSenateurs.length} sénateurs actuellement en fonction
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <StatCard 
              title="Total" 
              value={senatStats.total} 
              icon={<Users className="h-5 w-5 text-blue-500" />} 
            />
            <StatCard 
              title="Magistrats" 
              value={senatStats.magistrats} 
              icon={<Award className="h-5 w-5 text-amber-500" />} 
            />
            <StatCard 
              title="Joueurs" 
              value={senatStats.joueurs} 
              icon={<UserPlus className="h-5 w-5 text-green-500" />} 
            />
            <StatCard 
              title="Patriciens" 
              value={senatStats.patriciens} 
              icon={<FileText className="h-5 w-5 text-purple-500" />} 
            />
            <StatCard 
              title="Plébéiens" 
              value={senatStats.plebeiens} 
              icon={<FileText className="h-5 w-5 text-rose-500" />} 
            />
          </div>

          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Rechercher un sénateur..."
                className="px-3 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFilterStatus(filterStatus ? null : 'actif')}
                className={filterStatus ? "bg-primary/20" : ""}
              >
                <Filter className="h-4 w-4 mr-1" />
                Actifs uniquement
              </Button>
            </div>
            
            {role === 'mj' && (
              <div className="flex gap-2">
                <ActionButton 
                  variant="default"
                  label="Ajouter un sénateur"
                  icon={<UserPlus className="h-4 w-4" />}
                  onClick={() => console.log('Ajouter sénateur')}
                />
              </div>
            )}
          </div>

          {/* Onglets */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="tous">Tous</TabsTrigger>
              <TabsTrigger value="magistrats">Magistrats</TabsTrigger>
              <TabsTrigger value="influents">Plus influents</TabsTrigger>
              <TabsTrigger value="joueurs">Joueurs</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Table des sénateurs */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Fonction</TableHead>
                  <TableHead>Famille</TableHead>
                  <TableHead>Naissance</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                  <TableHead className="text-center">Influence</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  {role === 'mj' && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSenateurs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={role === 'mj' ? 8 : 7} className="text-center h-24 text-muted-foreground">
                      Aucun sénateur ne correspond à vos critères
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSenateurs.map((senateur) => (
                    <TableRow key={senateur.id}>
                      <TableCell className="font-medium">
                        {senateur.prenom} {senateur.nom}
                      </TableCell>
                      <TableCell>{senateur.fonction || "—"}</TableCell>
                      <TableCell>{senateur.famille || "—"}</TableCell>
                      <TableCell>{senateur.naissance || "—"}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={senateur.patricien ? "default" : "secondary"}>
                          {senateur.patricien ? "Patricien" : "Plébéien"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <SenateurInfluenceBar influence={senateur.influence || 0} />
                      </TableCell>
                      <TableCell className="text-center">
                        <SenateurStatusBadge status={senateur.status || 'actif'} />
                      </TableCell>
                      {role === 'mj' && (
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <InfoCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Composant de carte de statistiques
const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => {
  return (
    <div className="bg-card border rounded-lg p-4 flex flex-col items-center justify-center">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{title}</div>
    </div>
  );
};
