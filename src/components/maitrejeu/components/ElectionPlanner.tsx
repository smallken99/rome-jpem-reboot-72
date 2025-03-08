// Mise à jour des imports pour ElectionPlanner
import React, { useState, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Calendar, User } from 'lucide-react';
import { MaitreJeuContext } from '../context/MaitreJeuContext';
import { MagistratureType } from '../types/magistratures';
import { Season } from '../types/common';
import { SenateurJouable } from '../types/senateurs';

interface ElectionPlannerProps {
  senateurs: SenateurJouable[];
  onScheduleElection: (magistrature: MagistratureType, year: number, season: Season) => void;
}

export const ElectionPlanner: React.FC<ElectionPlannerProps> = ({ 
  senateurs,
  onScheduleElection 
}) => {
  const { currentYear, currentSeason, elections } = useContext(MaitreJeuContext);
  
  const [selectedMagistrature, setSelectedMagistrature] = useState<MagistratureType>('CONSUL');
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedSeason, setSelectedSeason] = useState<Season>(currentSeason);
  
  // Fonction pour planifier une élection
  const handleScheduleElection = () => {
    onScheduleElection(selectedMagistrature, selectedYear, selectedSeason);
  };
  
  // Filtrer les magistratures disponibles
  const availableMagistrates = [
    { value: 'CONSUL', label: 'Consul' },
    { value: 'PRETEUR', label: 'Préteur' },
    { value: 'EDILE', label: 'Édile' },
    { value: 'QUESTEUR', label: 'Questeur' },
    { value: 'CENSEUR', label: 'Censeur' },
    { value: 'TRIBUN', label: 'Tribun' },
    { value: 'PONTIFEX_MAXIMUS', label: 'Pontifex Maximus' }
  ];
  
  // Options pour les années
  const years = [currentYear, currentYear + 1, currentYear + 2].map(y => ({
    value: y,
    label: `${y} AUC`
  }));
  
  // Options pour les saisons
  const seasons = [
    { value: 'SPRING', label: 'Printemps' },
    { value: 'SUMMER', label: 'Été' },
    { value: 'AUTUMN', label: 'Automne' },
    { value: 'WINTER', label: 'Hiver' }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planifier une élection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <Select
              value={selectedMagistrature}
              onValueChange={(v) => setSelectedMagistrature(v as MagistratureType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Magistrature" />
              </SelectTrigger>
              <SelectContent>
                {availableMagistrates.map(mag => (
                  <SelectItem key={mag.value} value={mag.value}>
                    {mag.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select
              value={selectedYear.toString()}
              onValueChange={(v) => setSelectedYear(parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year.value} value={year.value.toString()}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select
              value={selectedSeason}
              onValueChange={(v) => setSelectedSeason(v as Season)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Saison" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map(season => (
                  <SelectItem key={season.value} value={season.value}>
                    {season.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleScheduleElection}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Planifier l'élection
          </Button>
        </div>
        
        {/* Reste du composant (liste des élections planifiées, etc.) */}
        <h3 className="text-lg font-semibold mb-2">Élections planifiées</h3>
        {elections.length === 0 ? (
          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertDescription>
              Aucune élection n'est planifiée pour le moment.
            </AlertDescription>
          </Alert>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Magistrature</TableHead>
                <TableHead>Année</TableHead>
                <TableHead>Saison</TableHead>
                <TableHead>Candidats</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {elections.map(election => (
                <TableRow key={election.id}>
                  <TableCell>{election.magistrature}</TableCell>
                  <TableCell>{election.année} AUC</TableCell>
                  <TableCell>{election.saison}</TableCell>
                  <TableCell>
                    {election.candidats.length > 0 ? (
                      election.candidats.map(candidat => (
                        <div key={candidat.id} className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{candidat.nom}</span>
                        </div>
                      ))
                    ) : (
                      <span>Aucun candidat</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
