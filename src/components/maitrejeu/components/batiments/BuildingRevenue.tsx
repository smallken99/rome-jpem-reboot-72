
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Coins } from 'lucide-react';
import { useMaitreJeu } from '../../context';
import { Building } from '../../types/batiments';
import { formatCurrency } from '@/utils/currencyUtils';
import { EconomieRecord } from '../../types/economie';

interface RevenuRecord {
  id: string;
  buildingId: string;
  buildingName: string;
  year: number;
  season: string;
  amount: number;
  taxRate: number;
  collectionDate: string;
}

interface BuildingRevenueProps {
  buildings: Building[];
  onAddRevenue: (buildingId: string, amount: number) => void;
}

export const BuildingRevenue: React.FC<BuildingRevenueProps> = ({ buildings, onAddRevenue }) => {
  const { economieRecords } = useMaitreJeu();
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [revenueAmount, setRevenueAmount] = useState<number>(0);
  
  // Filtrer les enregistrements économiques liés aux bâtiments
  const buildingRevenues = economieRecords.filter(record => 
    record.type === 'income' && 
    record.source === 'building' && 
    buildings.some(b => b.id === record.affectedSenateurId) // Dans cet exemple, on détourne la propriété affectedSenateurId
  );
  
  const handleAddRevenue = () => {
    if (selectedBuilding && revenueAmount) {
      onAddRevenue(selectedBuilding, revenueAmount);
      setRevenueAmount(0);
    }
  };
  
  const building = buildings.find(b => b.id === selectedBuilding);
  const totalRevenue = buildingRevenues.reduce((sum, record) => sum + record.amount, 0);
  
  const getRevenueStatus = () => {
    if (!building) return null;
    
    const buildingRevenue = buildingRevenues.filter(r => r.affectedSenateurId === building.id);
    const totalForBuilding = buildingRevenue.reduce((sum, r) => sum + r.amount, 0);
    
    const expectedRevenue = building.revenue * 4; // Revenu annuel estimé (4 saisons)
    
    if (totalForBuilding >= expectedRevenue) {
      return { status: 'above', difference: totalForBuilding - expectedRevenue };
    } else {
      return { status: 'below', difference: expectedRevenue - totalForBuilding };
    }
  };
  
  const revenueStatus = getRevenueStatus();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Coins className="h-5 w-5 mr-2 text-amber-500" />
          Revenus des Bâtiments Publics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un bâtiment" />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map(building => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.name} - Revenu estimé: {formatCurrency(building.revenue)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <Input
                type="number"
                placeholder="Montant du revenu"
                value={revenueAmount || ''}
                onChange={(e) => setRevenueAmount(Number(e.target.value))}
              />
              <Button onClick={handleAddRevenue} disabled={!selectedBuilding || !revenueAmount}>
                Ajouter
              </Button>
            </div>
          </div>
          
          {building && revenueStatus && (
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium">{building.name} - Analyse des revenus</h3>
              <div className="flex items-center mt-2">
                <div className="mr-4">
                  <p>Revenu estimé: {formatCurrency(building.revenue * 4)}/an</p>
                  <p>Revenu collecté: {formatCurrency(buildingRevenues
                    .filter(r => r.affectedSenateurId === building.id)
                    .reduce((sum, r) => sum + r.amount, 0))}
                  </p>
                </div>
                <div className="flex items-center">
                  {revenueStatus.status === 'above' ? (
                    <>
                      <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                      <span className="text-green-500">+{formatCurrency(revenueStatus.difference)} au-dessus des attentes</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-5 w-5 text-red-500 mr-1" />
                      <span className="text-red-500">-{formatCurrency(revenueStatus.difference)} en dessous des attentes</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bâtiment</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Saison</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buildingRevenues.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Aucun revenu enregistré pour le moment
                    </TableCell>
                  </TableRow>
                ) : (
                  buildingRevenues.map(record => {
                    const building = buildings.find(b => b.id === record.affectedSenateurId);
                    return (
                      <TableRow key={record.id}>
                        <TableCell>{building ? building.name : 'Inconnu'}</TableCell>
                        <TableCell>{typeof record.date === 'object' ? record.date.year : 'Inconnu'}</TableCell>
                        <TableCell>{typeof record.date === 'object' ? 
                          (record.date.season === 'SPRING' ? 'Printemps' : 
                           record.date.season === 'SUMMER' ? 'Été' : 
                           record.date.season === 'AUTUMN' ? 'Automne' : 'Hiver') : 'Inconnu'}
                        </TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(record.amount)}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-muted p-3 rounded-md flex justify-between items-center">
            <span className="font-medium">Revenu total des bâtiments:</span>
            <span className="font-bold text-lg">{formatCurrency(totalRevenue)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
