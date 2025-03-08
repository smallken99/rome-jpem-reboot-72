
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { SenateurJouable, ElectionPlannerProps, Season } from '../types/maitreJeuTypes';
import { toast } from 'sonner';

export const ElectionPlanner: React.FC<ElectionPlannerProps> = ({ 
  senateurs, 
  onScheduleElection 
}) => {
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedSeason, setSelectedSeason] = useState<Season>('SPRING');
  
  const timeState = useMaitreJeu();
  
  // Use context year and season as defaults
  React.useEffect(() => {
    setSelectedYear(timeState.year || new Date().getFullYear());
    setSelectedSeason(timeState.season || 'SPRING');
  }, [timeState.year, timeState.season]);
  
  const handleSchedule = () => {
    if (!selectedPosition) {
      toast.error('Veuillez sélectionner une magistrature');
      return;
    }
    
    onScheduleElection(selectedPosition, {
      year: selectedYear,
      season: selectedSeason
    });
    
    toast.success(`Élection programmée: ${selectedPosition} pour ${selectedSeason} ${selectedYear}`);
    setSelectedPosition('');
  };
  
  // Magistratures disponibles
  const magistratures = [
    { id: 'CONSUL', name: 'Consul', maxCount: 2 },
    { id: 'PRÉTEUR', name: 'Préteur', maxCount: 6 },
    { id: 'ÉDILE', name: 'Édile', maxCount: 4 },
    { id: 'QUESTEUR', name: 'Questeur', maxCount: 8 },
    { id: 'CENSEUR', name: 'Censeur', maxCount: 2 },
    { id: 'TRIBUN', name: 'Tribun de la Plèbe', maxCount: 10 },
  ];
  
  // Seasons pour la sélection
  const seasons: { id: Season; name: string }[] = [
    { id: 'SPRING', name: 'Printemps' },
    { id: 'SUMMER', name: 'Été' },
    { id: 'AUTUMN', name: 'Automne' },
    { id: 'WINTER', name: 'Hiver' }
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Programmation d'une élection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une magistrature" />
              </SelectTrigger>
              <SelectContent>
                {magistratures.map(magistrature => (
                  <SelectItem key={magistrature.id} value={magistrature.id}>
                    {magistrature.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSeason} onValueChange={(value) => setSelectedSeason(value as Season)}>
              <SelectTrigger>
                <SelectValue placeholder="Saison" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map(season => (
                  <SelectItem key={season.id} value={season.id}>
                    {season.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={selectedYear.toString()} 
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 5 }, (_, i) => timeState.year + i).map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSchedule}>
              Programmer l'élection
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Magistrats actuels</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Famille</TableHead>
                <TableHead>Faction</TableHead>
                <TableHead>Magistrature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {senateurs
                .filter(senateur => senateur.magistrature)
                .map(senateur => (
                  <TableRow key={senateur.id}>
                    <TableCell>{senateur.nom}</TableCell>
                    <TableCell>{senateur.famille}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {senateur.faction || 'Indépendant'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>
                        {senateur.magistrature}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              
              {senateurs.filter(s => s.magistrature).length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    Aucun magistrat en fonction
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
