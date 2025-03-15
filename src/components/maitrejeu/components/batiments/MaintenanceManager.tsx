
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CircleCheckBig, 
  CircleAlert, 
  Clock, 
  CircleDot, 
  CalendarPlus,
  Wrench,
  Building,
  Search
} from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';
import { formatDate } from '@/utils/formatUtils';
import { MaintenanceRecord, BuildingStatus } from '../../types/batiments';
import { Input } from '@/components/ui/input';
import { Building } from '../../types/batiments';
import { GameDate } from '../../types/common';

export const MaintenanceManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: '1',
      name: 'Temple de Jupiter',
      type: 'temple',
      location: 'Forum Romanum',
      status: 'good',
      constructionYear: 720,
      description: 'Temple principal dédié à Jupiter sur le Capitole',
      cost: 50000,
      maintenanceCost: 1000,
      revenue: 500,
      capacity: 1000,
      owner: 'république',
      lastMaintenance: { year: 735, season: 'Hiems', phase: 'ECONOMY', day: 15 },
      nextMaintenanceNeeded: { year: 738, season: 'Ver', phase: 'ECONOMY', day: 1 }
    },
    {
      id: '2',
      name: 'Basilique Aemilia',
      type: 'basilica',
      location: 'Forum Romanum',
      status: 'excellent',
      constructionYear: 735,
      description: 'Bâtiment administratif et centre commercial',
      cost: 35000,
      maintenanceCost: 750,
      revenue: 2000,
      capacity: 800,
      owner: 'sénat',
      lastMaintenance: { year: 737, season: 'Aestas', phase: 'ECONOMY', day: 10 },
      nextMaintenanceNeeded: { year: 741, season: 'Aestas', phase: 'ECONOMY', day: 10 }
    },
    {
      id: '3',
      name: 'Aqueduc Appien',
      type: 'aqueduct',
      location: 'Via Appia',
      status: 'damaged',
      constructionYear: 710,
      description: 'Aqueduc amenant l\'eau à Rome depuis les montagnes',
      cost: 80000,
      maintenanceCost: 1500,
      revenue: 0,
      capacity: 0,
      owner: 'censeur',
      lastMaintenance: { year: 731, season: 'Ver', phase: 'ECONOMY', day: 5 },
      nextMaintenanceNeeded: { year: 736, season: 'Ver', phase: 'ECONOMY', day: 5 }
    }
  ]);

  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceRecord[]>([
    {
      id: 'm1',
      buildingId: '1',
      date: { year: 735, season: 'Hiems', phase: 'ECONOMY', day: 15 },
      cost: 800,
      description: 'Réparation des colonnes et renforcement du toit',
      performedBy: 'Censeur',
      repairLevel: 'minor',
      previousStatus: 'damaged',
      newStatus: 'good'
    },
    {
      id: 'm2',
      buildingId: '2',
      date: { year: 737, season: 'Aestas', phase: 'ECONOMY', day: 10 },
      cost: 1200,
      description: 'Restauration complète des fresques intérieures',
      performedBy: 'Édile',
      repairLevel: 'moderate',
      previousStatus: 'good',
      newStatus: 'excellent'
    },
    {
      id: 'm3',
      buildingId: '3',
      date: { year: 731, season: 'Ver', phase: 'ECONOMY', day: 5 },
      cost: 2500,
      description: 'Réparation des canalisations endommagées',
      performedBy: 'Censeur',
      repairLevel: 'major',
      previousStatus: 'poor',
      newStatus: 'damaged'
    }
  ]);

  const getBuildingName = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    return building ? building.name : 'Bâtiment inconnu';
  };

  const getStatusBadge = (status: BuildingStatus) => {
    switch (status) {
      case 'excellent':
        return <Badge variant="success">Excellent</Badge>;
      case 'good':
        return <Badge>Bon</Badge>;
      case 'damaged':
        return <Badge variant="warning">Endommagé</Badge>;
      case 'poor':
        return <Badge variant="destructive">Mauvais</Badge>;
      case 'ruined':
        return <Badge variant="outline">En ruine</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getMaintenanceNeedIcon = (building: Building, currentDate: GameDate) => {
    if (!building.nextMaintenanceNeeded) return <CircleDot className="h-4 w-4 text-green-500" />;
    
    const nextMaintenance = building.nextMaintenanceNeeded;
    const yearDiff = nextMaintenance.year - currentDate.year;
    
    if (yearDiff < 0) return <CircleAlert className="h-4 w-4 text-red-500" />;
    if (yearDiff === 0) {
      const seasons = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
      const currentSeasonIndex = seasons.indexOf(currentDate.season);
      const nextSeasonIndex = seasons.indexOf(nextMaintenance.season);
      
      if (nextSeasonIndex <= currentSeasonIndex) return <CircleAlert className="h-4 w-4 text-red-500" />;
      if (nextSeasonIndex - currentSeasonIndex <= 1) return <Clock className="h-4 w-4 text-amber-500" />;
    } else if (yearDiff === 1) {
      const seasons = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
      const currentSeasonIndex = seasons.indexOf(currentDate.season);
      const nextSeasonIndex = seasons.indexOf(nextMaintenance.season);
      
      if (currentSeasonIndex >= nextSeasonIndex) return <Clock className="h-4 w-4 text-amber-500" />;
    }
    
    return <CircleCheckBig className="h-4 w-4 text-green-500" />;
  };

  const filteredBuildings = buildings.filter(building => 
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Exemple de date actuelle pour le besoin de maintenance
  const currentDate: GameDate = { year: 737, season: 'Autumnus', phase: 'ECONOMY', day: 1 };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un bâtiment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button className="flex items-center gap-2">
          <CalendarPlus className="h-4 w-4" />
          Planifier
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="h-5 w-5" />
            Bâtiments nécessitant un entretien
          </CardTitle>
          <CardDescription>
            Planifiez et suivez les travaux d'entretien des bâtiments publics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">État</TableHead>
                <TableHead>Bâtiment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernier entretien</TableHead>
                <TableHead>Prochain entretien</TableHead>
                <TableHead>Coût estimé</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuildings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    Aucun bâtiment ne correspond à la recherche
                  </TableCell>
                </TableRow>
              ) : (
                filteredBuildings.map((building) => (
                  <TableRow key={building.id}>
                    <TableCell>
                      {getMaintenanceNeedIcon(building, currentDate)}
                    </TableCell>
                    <TableCell className="font-medium">{building.name}</TableCell>
                    <TableCell>{building.type}</TableCell>
                    <TableCell>{getStatusBadge(building.status)}</TableCell>
                    <TableCell>
                      {building.lastMaintenance ? 
                        formatDate(building.lastMaintenance) : 
                        "Jamais"}
                    </TableCell>
                    <TableCell>
                      {building.nextMaintenanceNeeded ? 
                        formatDate(building.nextMaintenanceNeeded) : 
                        "Non planifié"}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(building.maintenanceCost)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Wrench className="h-3.5 w-3.5" />
                        Entretenir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Historique des entretiens</CardTitle>
          <CardDescription>Derniers travaux d'entretien effectués</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Bâtiment</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Coût</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Changement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{formatDate(record.date)}</TableCell>
                  <TableCell className="font-medium">{getBuildingName(record.buildingId)}</TableCell>
                  <TableCell>
                    {record.repairLevel === 'minor' && <Badge variant="outline">Mineur</Badge>}
                    {record.repairLevel === 'moderate' && <Badge>Modéré</Badge>}
                    {record.repairLevel === 'major' && <Badge variant="secondary">Majeur</Badge>}
                    {record.repairLevel === 'restoration' && <Badge variant="destructive">Restauration</Badge>}
                  </TableCell>
                  <TableCell>{formatCurrency(record.cost)}</TableCell>
                  <TableCell className="max-w-xs truncate">{record.description}</TableCell>
                  <TableCell>{record.performedBy}</TableCell>
                  <TableCell>
                    {getStatusBadge(record.previousStatus)} {" → "} 
                    {getStatusBadge(record.newStatus)}
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
