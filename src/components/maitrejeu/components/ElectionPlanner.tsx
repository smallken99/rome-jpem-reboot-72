import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Season, MagistratureType, SenateurJouable } from '../types/maitreJeuTypes';
import { formatDate } from '@/utils/formatUtils';
import { useMaitreJeu } from '../context/MaitreJeuContext';

interface ElectionPlannerProps {
  senateurs: SenateurJouable[];
  onScheduleElection: (magistrature: MagistratureType, year: number, season: Season) => void;
}

export const ElectionPlanner: React.FC<ElectionPlannerProps> = ({ senateurs, onScheduleElection }) => {
  const { gameState } = useMaitreJeu();
  const { year, season } = gameState;
  
  const [selectedMagistrature, setSelectedMagistrature] = useState<MagistratureType>('CONSUL');
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedSeason, setSelectedSeason] = useState<Season>(season);
  
  const handleScheduleElection = () => {
    onScheduleElection(selectedMagistrature, selectedYear, selectedSeason);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Planifier une élection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Magistrature</label>
              <Select 
                value={selectedMagistrature} 
                onValueChange={(value) => setSelectedMagistrature(value as MagistratureType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une magistrature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONSUL">Consul</SelectItem>
                  <SelectItem value="PRETEUR">Préteur</SelectItem>
                  <SelectItem value="EDILE">Édile</SelectItem>
                  <SelectItem value="QUESTEUR">Questeur</SelectItem>
                  <SelectItem value="CENSEUR">Censeur</SelectItem>
                  <SelectItem value="TRIBUN">Tribun de la Plèbe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Année</label>
              <Select 
                value={selectedYear.toString()} 
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une année" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={year.toString()}>{year} AUC (Actuelle)</SelectItem>
                  <SelectItem value={(year + 1).toString()}>{year + 1} AUC (Prochaine)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Saison</label>
              <Select 
                value={selectedSeason} 
                onValueChange={(value) => setSelectedSeason(value as Season)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SPRING">Printemps</SelectItem>
                  <SelectItem value="SUMMER">Été</SelectItem>
                  <SelectItem value="AUTUMN">Automne</SelectItem>
                  <SelectItem value="WINTER">Hiver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleScheduleElection}
              className="w-full"
            >
              Programmer l'élection
            </Button>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Candidats potentiels</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tous">
              <TabsList className="mb-4">
                <TabsTrigger value="tous">Tous</TabsTrigger>
                <TabsTrigger value="populares">Populares</TabsTrigger>
                <TabsTrigger value="optimates">Optimates</TabsTrigger>
                <TabsTrigger value="moderates">Moderates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tous">
                <div className="space-y-2">
                  {senateurs
                    .filter(s => !s.magistrature)
                    .map(senateur => (
                      <div key={senateur.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{senateur.nom}</p>
                          <p className="text-sm text-gray-500">{senateur.faction}</p>
                        </div>
                        <div className="text-sm">Éligible</div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="populares">
                <div className="space-y-2">
                  {senateurs
                    .filter(s => !s.magistrature && s.faction === 'Populares')
                    .map(senateur => (
                      <div key={senateur.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <p className="font-medium">{senateur.nom}</p>
                        <div className="text-sm">Éligible</div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="optimates">
                <div className="space-y-2">
                  {senateurs
                    .filter(s => !s.magistrature && s.faction === 'Optimates')
                    .map(senateur => (
                      <div key={senateur.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <p className="font-medium">{senateur.nom}</p>
                        <div className="text-sm">Éligible</div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="moderates">
                <div className="space-y-2">
                  {senateurs
                    .filter(s => !s.magistrature && s.faction === 'Moderates')
                    .map(senateur => (
                      <div key={senateur.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <p className="font-medium">{senateur.nom}</p>
                        <div className="text-sm">Éligible</div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
