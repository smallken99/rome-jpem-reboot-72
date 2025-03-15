
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Filter, 
  Search,
  TrendingUp,
  Building,
  Landmark
} from 'lucide-react';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { formatCurrency } from '@/utils/formatUtils';
import { GameDate, Season } from '../../types/common';
import { Building, BuildingRevenueRecord } from '../../types/batiments';
import { UnderDevelopmentSection } from '../UnderDevelopmentSection';

interface BuildingRevenueProps {
  currentYear: number;
  currentSeason: Season;
}

export const BuildingRevenue: React.FC<BuildingRevenueProps> = ({
  currentYear,
  currentSeason
}) => {
  const { buildings, revenueRecords, addBuildingRevenue } = useBatimentsManagement();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Si nous n'avons pas encore implémenté la fonctionnalité complète
  if (buildings.length === 0) {
    return (
      <UnderDevelopmentSection 
        title="Revenus des bâtiments"
        description="Ajoutez des bâtiments pour commencer à suivre leurs revenus."
      />
    );
  }
  
  // Filtrer les bâtiments en fonction de la recherche
  const filteredBuildings = buildings.filter(building => 
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculer les revenus totaux
  const totalRevenue = buildings.reduce((total, building) => total + building.revenue, 0);
  const totalMaintenanceCost = buildings.reduce((total, building) => total + building.maintenanceCost, 0);
  const netRevenue = totalRevenue - totalMaintenanceCost;
  
  // Grouper les bâtiments par type pour l'analyse
  const buildingTypeRevenue = buildings.reduce((acc, building) => {
    const type = building.type;
    if (!acc[type]) acc[type] = { count: 0, revenue: 0, maintenance: 0 };
    acc[type].count += 1;
    acc[type].revenue += building.revenue;
    acc[type].maintenance += building.maintenanceCost;
    return acc;
  }, {} as Record<string, { count: number, revenue: number, maintenance: number }>);
  
  const handleCollectRevenue = (building: Building) => {
    addBuildingRevenue(
      building.id,
      building.revenue,
      "Revenus trimestriels",
      10, // Taux d'imposition standard
      "Maître du Jeu"
    );
  };
  
  const handleCollectAllRevenues = () => {
    buildings.forEach(building => {
      if (building.revenue > 0) {
        handleCollectRevenue(building);
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              Revenus totaux
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Par saison, tous bâtiments confondus
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center">
              <Building className="h-4 w-4 mr-2 text-red-500" />
              Coûts d'entretien
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalMaintenanceCost)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Par saison, tous bâtiments confondus
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center">
              <Landmark className="h-4 w-4 mr-2 text-blue-500" />
              Revenu net
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`text-2xl font-bold ${netRevenue >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {formatCurrency(netRevenue)}
              {netRevenue >= 0 ? 
                <ArrowUpRight className="inline h-4 w-4 ml-1" /> : 
                <ArrowDownRight className="inline h-4 w-4 ml-1" />
              }
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Revenus - Coûts d'entretien
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un bâtiment..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
          <Button size="sm" onClick={handleCollectAllRevenues}>
            Collecter tout
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bâtiment</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Revenus</TableHead>
              <TableHead>Coûts d'entretien</TableHead>
              <TableHead>Revenu net</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuildings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  Aucun bâtiment ne correspond à votre recherche
                </TableCell>
              </TableRow>
            ) : (
              filteredBuildings.map((building) => {
                const netBuildingRevenue = building.revenue - building.maintenanceCost;
                return (
                  <TableRow key={building.id}>
                    <TableCell className="font-medium">{building.name}</TableCell>
                    <TableCell>
                      {building.type.charAt(0).toUpperCase() + building.type.slice(1).replace('_', ' ')}
                    </TableCell>
                    <TableCell className="text-green-600 font-medium">
                      {formatCurrency(building.revenue)}
                    </TableCell>
                    <TableCell className="text-red-600 font-medium">
                      {formatCurrency(building.maintenanceCost)}
                    </TableCell>
                    <TableCell className={netBuildingRevenue >= 0 ? 'text-blue-600' : 'text-red-600'}>
                      {formatCurrency(netBuildingRevenue)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCollectRevenue(building)}
                        disabled={building.revenue <= 0}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Collecter
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Historique des revenus</h3>
        <Button variant="outline" size="sm">Exporter</Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Bâtiment</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Collecté par</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  Aucun revenu n'a encore été enregistré
                </TableCell>
              </TableRow>
            ) : (
              revenueRecords.map((record) => {
                const building = buildings.find(b => b.id === record.buildingId);
                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      {`${record.season} ${record.year}`}
                    </TableCell>
                    <TableCell className="font-medium">
                      {building ? building.name : 'Bâtiment inconnu'}
                    </TableCell>
                    <TableCell className="text-green-600 font-medium">
                      {formatCurrency(record.amount)}
                    </TableCell>
                    <TableCell>{record.source}</TableCell>
                    <TableCell>{record.collectedBy}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
