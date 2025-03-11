
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Award, Calendar, User, Search, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionButton } from '@/components/ui-custom/ActionButton';

type Magistrature = {
  id: string;
  titre: string;
  titulaire: string;
  dateDebut: string;
  dateFin: string;
  type: 'ordinaire' | 'extraordinaire' | 'prorogée';
  statut: 'en cours' | 'terminée' | 'à venir';
};

export const MagistraturesList: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('actives');
  const [searchTerm, setSearchTerm] = useState('');

  // Données fictives pour les magistratures
  const magistratures: Magistrature[] = [
    {
      id: '1',
      titre: 'Consul',
      titulaire: 'Marcus Aurelius',
      dateDebut: '01/01/230 av. J.-C.',
      dateFin: '31/12/230 av. J.-C.',
      type: 'ordinaire',
      statut: 'en cours'
    },
    {
      id: '2',
      titre: 'Préteur',
      titulaire: 'Julius Caesar',
      dateDebut: '01/01/230 av. J.-C.',
      dateFin: '31/12/230 av. J.-C.',
      type: 'ordinaire',
      statut: 'en cours'
    },
    {
      id: '3',
      titre: 'Édile Curule',
      titulaire: 'Gaius Gracchus',
      dateDebut: '01/01/230 av. J.-C.',
      dateFin: '31/12/230 av. J.-C.',
      type: 'ordinaire',
      statut: 'en cours'
    },
    {
      id: '4',
      titre: 'Dictateur',
      titulaire: 'Lucius Quinctius Cincinnatus',
      dateDebut: '15/05/231 av. J.-C.',
      dateFin: '15/11/231 av. J.-C.',
      type: 'extraordinaire',
      statut: 'terminée'
    },
    {
      id: '5',
      titre: 'Questeur',
      titulaire: 'À déterminer',
      dateDebut: '01/01/229 av. J.-C.',
      dateFin: '31/12/229 av. J.-C.',
      type: 'ordinaire',
      statut: 'à venir'
    }
  ];

  // Filtrer les magistratures selon l'onglet actif et le terme de recherche
  const filteredMagistratures = magistratures.filter(mag => {
    const matchesSearch = 
      mag.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mag.titulaire.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentTab === 'toutes') return matchesSearch;
    if (currentTab === 'actives') return matchesSearch && mag.statut === 'en cours';
    if (currentTab === 'futures') return matchesSearch && mag.statut === 'à venir';
    if (currentTab === 'passees') return matchesSearch && mag.statut === 'terminée';
    
    return matchesSearch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Magistratures</CardTitle>
        <CardDescription>
          Gestion des postes officiels de la République
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-8 px-3 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <ActionButton 
              variant="default"
              label="Ajouter une magistrature"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => console.log('Ajouter magistrature')}
            />
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="toutes">Toutes</TabsTrigger>
            <TabsTrigger value="actives">Actives</TabsTrigger>
            <TabsTrigger value="futures">À venir</TabsTrigger>
            <TabsTrigger value="passees">Passées</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Table des magistratures */}
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Titulaire</TableHead>
                <TableHead>Période</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMagistratures.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    Aucune magistrature ne correspond à vos critères
                  </TableCell>
                </TableRow>
              ) : (
                filteredMagistratures.map((mag) => (
                  <TableRow key={mag.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-500" />
                        {mag.titre}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-500" />
                        {mag.titulaire}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span>{mag.dateDebut} à {mag.dateFin}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <MagistratureTypeBadge type={mag.type} />
                    </TableCell>
                    <TableCell className="text-center">
                      <MagistratureStatusBadge status={mag.statut} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Composant Badge pour le type de magistrature
const MagistratureTypeBadge: React.FC<{ type: 'ordinaire' | 'extraordinaire' | 'prorogée' }> = ({ type }) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'ordinaire':
        return {
          variant: 'outline' as const,
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'extraordinaire':
        return {
          variant: 'outline' as const,
          className: 'bg-purple-100 text-purple-800 border-purple-200'
        };
      case 'prorogée':
        return {
          variant: 'outline' as const,
          className: 'bg-amber-100 text-amber-800 border-amber-200'
        };
      default:
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <Badge variant={config.variant} className={config.className}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
};

// Composant Badge pour le statut de magistrature
const MagistratureStatusBadge: React.FC<{ status: 'en cours' | 'terminée' | 'à venir' }> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'en cours':
        return {
          variant: 'outline' as const,
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'terminée':
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
      case 'à venir':
        return {
          variant: 'outline' as const,
          className: 'bg-indigo-100 text-indigo-800 border-indigo-200'
        };
      default:
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant} className={config.className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
