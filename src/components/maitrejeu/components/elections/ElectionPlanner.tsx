
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { MagistratureType } from '../../types/magistratures';
import { Season } from '../../types/common';
import { useMaitreJeu } from '../../context';

export const ElectionPlanner: React.FC = () => {
  const { scheduleElection } = useMaitreJeu();
  const [magistrature, setMagistrature] = useState<MagistratureType | "">("");
  const [year, setYear] = useState<number | "">("");
  const [season, setSeason] = useState<Season | "">("");

  const handleSchedule = () => {
    if (magistrature && year && season) {
      scheduleElection(magistrature as MagistratureType, Number(year), season as Season);
      // Reset the form after scheduling
      setMagistrature("");
      setYear("");
      setSeason("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Planification des élections</CardTitle>
        <CardDescription>Sélectionnez une magistrature et une date pour planifier une élection.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select value={magistrature} onValueChange={(value) => setMagistrature(value as MagistratureType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Magistrature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONSUL">Consul</SelectItem>
                <SelectItem value="PRETEUR">Préteur</SelectItem>
                <SelectItem value="EDILE">Édile</SelectItem>
                <SelectItem value="QUESTEUR">Questeur</SelectItem>
                <SelectItem value="CENSEUR">Censeur</SelectItem>
                <SelectItem value="TRIBUN">Tribun</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input 
              type="number" 
              placeholder="Année" 
              value={year}
              onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
          <div>
            <Select value={season} onValueChange={(value) => setSeason(value as Season)}>
              <SelectTrigger className="w-full">
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
          variant="secondary" 
          className="mt-4"
          onClick={handleSchedule}
          disabled={!magistrature || !year || !season}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Planifier l'élection
        </Button>
      </CardContent>
    </Card>
  );
};
