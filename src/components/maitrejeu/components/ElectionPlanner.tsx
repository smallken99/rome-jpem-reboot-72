
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTimeStore, Season } from '@/utils/timeSystem';
import { ElectionPlannerProps, MagistratureType } from '../types/maitreJeuTypes';
import { Calendar, User, Check } from 'lucide-react';

export const ElectionPlanner: React.FC<ElectionPlannerProps> = ({ 
  senateurs, 
  onScheduleElection 
}) => {
  const { year, season } = useTimeStore();
  const [selectedMagistrature, setSelectedMagistrature] = useState<MagistratureType>('CONSUL');
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedSeason, setSelectedSeason] = useState<Season>(season);
  
  const handleScheduleElection = () => {
    onScheduleElection(selectedMagistrature, selectedYear, selectedSeason);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Planifier une élection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Magistrature</label>
              <Select 
                value={selectedMagistrature} 
                onValueChange={(value) => setSelectedMagistrature(value as MagistratureType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une magistrature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONSUL">Consul</SelectItem>
                  <SelectItem value="CENSEUR">Censeur</SelectItem>
                  <SelectItem value="PRÉTEUR">Préteur</SelectItem>
                  <SelectItem value="ÉDILE">Édile</SelectItem>
                  <SelectItem value="QUESTEUR">Questeur</SelectItem>
                  <SelectItem value="TRIBUN">Tribun</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Année</label>
              <Select 
                value={selectedYear.toString()} 
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une année" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={year.toString()}>{year} AUC</SelectItem>
                  <SelectItem value={(year + 1).toString()}>{year + 1} AUC</SelectItem>
                  <SelectItem value={(year + 2).toString()}>{year + 2} AUC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Saison</label>
              <Select 
                value={selectedSeason} 
                onValueChange={(value) => setSelectedSeason(value as Season)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ver">Printemps (Ver)</SelectItem>
                  <SelectItem value="Aestas">Été (Aestas)</SelectItem>
                  <SelectItem value="Autumnus">Automne (Autumnus)</SelectItem>
                  <SelectItem value="Hiems">Hiver (Hiems)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="bg-muted/20 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <User className="h-4 w-4 mr-1 text-muted-foreground" />
              Sénateurs éligibles
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {senateurs
                .filter(s => !s.magistrature)
                .map(senateur => (
                  <div key={senateur.id} className="text-xs p-2 border rounded bg-white">
                    <div className="font-medium">{senateur.nom}</div>
                    <div className="text-muted-foreground">{senateur.faction}</div>
                  </div>
                ))}
              
              {senateurs.filter(s => !s.magistrature).length === 0 && (
                <div className="text-xs text-muted-foreground col-span-full">
                  Tous les sénateurs ont déjà une magistrature
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={handleScheduleElection}
              disabled={senateurs.filter(s => !s.magistrature).length === 0}
              className="flex items-center"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Planifier l'élection
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
