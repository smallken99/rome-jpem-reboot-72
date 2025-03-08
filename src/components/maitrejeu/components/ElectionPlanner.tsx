
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { MagistratureType, SenateurJouable } from '../types/maitreJeuTypes';
import { convertMaitreJeuSeasonToTimeSeason } from '@/utils/formatUtils';

interface ElectionPlannerProps {
  senateurs: SenateurJouable[];
  onScheduleElection: (magistrature: MagistratureType, year: number, season: Season) => void;
}

export const ElectionPlanner: React.FC<ElectionPlannerProps> = ({ senateurs, onScheduleElection }) => {
  const { currentYear, currentSeason, gameState } = useMaitreJeu();
  
  const [selectedMagistrature, setSelectedMagistrature] = useState<MagistratureType>('CONSUL');
  const [selectedYear, setSelectedYear] = useState<number>(currentYear || gameState.year);
  const [selectedSeason, setSelectedSeason] = useState<Season>(currentSeason || gameState.season);
  
  const handleScheduleElection = () => {
    onScheduleElection(selectedMagistrature, selectedYear, selectedSeason);
  };
  
  // Obtenir les magistrats actuels pour affichage
  const currentMagistrates = senateurs.filter(s => s.magistrature !== null);
  
  // Générer les options d'années
  const yearOptions = [];
  for (let i = 0; i < 5; i++) {
    yearOptions.push((currentYear || gameState.year) + i);
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-cinzel">Planifier une élection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="magistrature">Type de magistrature</Label>
            <Select 
              value={selectedMagistrature} 
              onValueChange={(value) => setSelectedMagistrature(value as MagistratureType)}
            >
              <SelectTrigger id="magistrature">
                <SelectValue placeholder="Sélectionner une magistrature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONSUL">Consul</SelectItem>
                <SelectItem value="PRETEUR">Préteur</SelectItem>
                <SelectItem value="EDILE">Édile</SelectItem>
                <SelectItem value="QUESTEUR">Questeur</SelectItem>
                <SelectItem value="CENSEUR">Censeur</SelectItem>
                <SelectItem value="TRIBUN">Tribun de la Plèbe</SelectItem>
                <SelectItem value="PONTIFEX_MAXIMUS">Pontifex Maximus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Année</Label>
              <Select 
                value={selectedYear.toString()} 
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="Année" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year} AUC</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="season">Saison</Label>
              <Select 
                value={selectedSeason} 
                onValueChange={(value) => setSelectedSeason(value as Season)}
              >
                <SelectTrigger id="season">
                  <SelectValue placeholder="Saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SPRING">Printemps</SelectItem>
                  <SelectItem value="SUMMER">Été</SelectItem>
                  <SelectItem value="AUTUMN">Automne</SelectItem>
                  <SelectItem value="WINTER">Hiver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleScheduleElection} 
            className="w-full"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Planifier l'élection
          </Button>
        </div>
        
        <div className="mt-6 border-t pt-4">
          <h3 className="font-medium text-sm mb-2">Magistrats actuels</h3>
          <div className="space-y-2">
            {currentMagistrates.length > 0 ? (
              currentMagistrates.map((magistrat, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{magistrat.nom} ({magistrat.famille})</span>
                  <span className="text-muted-foreground">{magistrat.magistrature} - {magistrat.faction}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">Aucun magistrat actuellement en poste</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
