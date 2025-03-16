
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, ChevronUpIcon, PlusCircleIcon } from 'lucide-react';
import { useMaitreJeu } from '../../context';
import { BuildingRevenueRecord } from '../../types/batiments';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';

interface BuildingRevenueProps {
  buildingId: string;
}

const BuildingRevenue: React.FC<BuildingRevenueProps> = ({ buildingId }) => {
  const { buildings } = useBatimentsManagement();
  const [building, setBuilding] = useState<any | null>(null);
  const [revenues, setRevenues] = useState<BuildingRevenueRecord[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const foundBuilding = buildings?.find(b => b.id === buildingId);
    if (foundBuilding) {
      setBuilding(foundBuilding);
      // Simulation de données de revenus
      const mockRevenues: BuildingRevenueRecord[] = [
        {
          id: '1',
          buildingId,
          year: 705,
          season: 'Spring',
          amount: 5000,
          source: 'Loyers',
          taxRate: 10,
          collectedBy: 'Questeur'
        },
        {
          id: '2',
          buildingId,
          year: 705,
          season: 'Summer',
          amount: 5500,
          source: 'Loyers',
          taxRate: 10,
          collectedBy: 'Questeur'
        }
      ];
      setRevenues(mockRevenues);
    }
  }, [buildingId, buildings]);

  if (!building) return null;

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-sm font-medium">
          <span>Revenus de {building.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8 p-0"
          >
            {expanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      {expanded && (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Année</TableHead>
                <TableHead>Saison</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Taxe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenues.map(revenue => (
                <TableRow key={revenue.id}>
                  <TableCell>{revenue.year}</TableCell>
                  <TableCell>{revenue.season}</TableCell>
                  <TableCell>{revenue.amount} As</TableCell>
                  <TableCell>{revenue.source}</TableCell>
                  <TableCell>{revenue.taxRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button size="sm" className="flex items-center">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Ajouter un revenu
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default BuildingRevenue;
