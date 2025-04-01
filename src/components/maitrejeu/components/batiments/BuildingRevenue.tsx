
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { BuildingRevenueRecord } from '../../types/batiments';
import { adaptSeason } from '../../types/common';
import { v4 as uuidv4 } from 'uuid';

export default function BuildingRevenue({ buildingId }: { buildingId: string }) {
  const { buildings, revenueRecords, addRevenueRecord } = useBatimentsManagement();
  const building = buildings.find(b => b.id === buildingId);
  
  // We'll create a mock building if none is found, for demonstration
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [season, setSeason] = useState<string>('Ver');
  const [amount, setAmount] = useState<number>(0);
  const [source, setSource] = useState<string>('taxes');
  const [taxRate, setTaxRate] = useState<number>(10);
  
  // Get revenue records for this building
  const filteredRecords = revenueRecords.filter(record => record.buildingId === buildingId);
  
  const handleAddRecord = () => {
    const newRecord: BuildingRevenueRecord = {
      id: uuidv4(),
      buildingId,
      date: new Date(),
      description: `Revenus de ${source} du bâtiment`,
      amount,
      source,
      year,
      season,
      taxRate,
      collectedBy: 'Administrateur'
    };
    
    addRevenueRecord(newRecord);
    setAmount(0);
  };
  
  const generateRandomRecord = () => {
    const sources = ['location', 'taxes', 'ventes', 'dons', 'amendes'];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const randomAmount = Math.floor(Math.random() * 5000) + 500;
    
    const newRecord: BuildingRevenueRecord = {
      id: uuidv4(),
      buildingId,
      date: new Date(),
      description: `Revenus de ${randomSource} du bâtiment`,
      amount: randomAmount,
      source: randomSource,
      year,
      season,
      taxRate: Math.floor(Math.random() * 20) + 5,
      collectedBy: 'Système'
    };
    
    addRevenueRecord(newRecord);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Revenus du bâtiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm">Année</label>
              <Input 
                type="number" 
                value={year} 
                onChange={e => setYear(parseInt(e.target.value) || new Date().getFullYear())} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Saison</label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ver">Printemps (Ver)</SelectItem>
                  <SelectItem value="Aes">Été (Aes)</SelectItem>
                  <SelectItem value="Aut">Automne (Aut)</SelectItem>
                  <SelectItem value="Hie">Hiver (Hie)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm">Montant (As)</label>
              <Input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(parseInt(e.target.value) || 0)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Source</label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Source des revenus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="taxes">Taxes</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="ventes">Ventes</SelectItem>
                  <SelectItem value="dons">Dons</SelectItem>
                  <SelectItem value="amendes">Amendes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Taux d'imposition (%)</label>
              <Input 
                type="number" 
                value={taxRate} 
                onChange={e => setTaxRate(parseInt(e.target.value) || 0)} 
              />
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button onClick={handleAddRecord}>Ajouter un revenu</Button>
            <Button variant="outline" onClick={generateRandomRecord}>Générer aléatoirement</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Historique des revenus</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Montant (As)</TableHead>
                <TableHead>Taux</TableHead>
                <TableHead>Percepteur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map(record => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {record.year} {record.season || 'Ver'}
                    </TableCell>
                    <TableCell>{record.source}</TableCell>
                    <TableCell>{record.amount}</TableCell>
                    <TableCell>{record.taxRate || '-'}%</TableCell>
                    <TableCell>{record.collectedBy || 'Administrateur'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Aucun revenu enregistré pour ce bâtiment
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
