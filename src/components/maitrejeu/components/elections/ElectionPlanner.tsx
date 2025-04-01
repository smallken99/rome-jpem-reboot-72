
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Magistrature, MagistratureType } from '@/components/maitrejeu/types/magistratures';

export const ElectionPlanner: React.FC = () => {
  const [selectedMagistrature, setSelectedMagistrature] = useState<MagistratureType>('consul');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [candidates, setCandidates] = useState<string[]>([]);
  const [newCandidate, setNewCandidate] = useState<string>('');

  // Sample magistratures data
  const magistratures: Magistrature[] = [
    {
      id: '1',
      type: 'consul',
      title: 'Consul',
      description: 'Magistrature suprême de la République',
      termLength: 12,
      collegiality: 2,
      powers: ['imperium', 'auspices', 'veto', 'convocation du sénat'],
      requirements: ['patricien', 'âge minimum 43 ans', 'cursus honorum complété'],
      responsibilities: ['commandement des armées', 'présidence du sénat', 'administration des lois'],
      imperium: true,
      sacrosanctity: false,
      veto: true,
      rank: 1
    },
    {
      id: '2',
      type: 'praetor',
      title: 'Préteur',
      description: 'Magistrat chargé de la justice',
      termLength: 12,
      collegiality: 8,
      powers: ['imperium', 'auspices', 'juridiction'],
      requirements: ['patricien ou plébéien', 'âge minimum 40 ans', 'édile ou tribun'],
      responsibilities: ['administration de la justice', 'gouvernement provincial', 'remplacement des consuls'],
      imperium: true,
      sacrosanctity: false,
      veto: false,
      rank: 2
    }
  ];

  const addCandidate = () => {
    if (newCandidate && !candidates.includes(newCandidate)) {
      setCandidates([...candidates, newCandidate]);
      setNewCandidate('');
    }
  };

  const removeCandidate = (candidateName: string) => {
    setCandidates(candidates.filter(c => c !== candidateName));
  };

  const scheduleElection = () => {
    console.log("Election scheduled for:", {
      magistrature: selectedMagistrature,
      date: selectedDate,
      candidates
    });
    // Here you would typically call an API or dispatch an action
  };

  // Get seasons from the current date's year
  const getAvailableSeasons = (year: number) => {
    return [
      { value: 'ver', label: 'Printemps' },
      { value: 'aestas', label: 'Été' },
      { value: 'autumnus', label: 'Automne' },
      { value: 'hiems', label: 'Hiver' }
    ];
  };

  const currentYear = new Date().getFullYear();
  const seasons = getAvailableSeasons(currentYear);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Planifier une Élection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="magistrature">Magistrature</Label>
          <Select
            value={selectedMagistrature}
            onValueChange={(value) => setSelectedMagistrature(value as MagistratureType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une magistrature" />
            </SelectTrigger>
            <SelectContent>
              {magistratures.map(mag => (
                <SelectItem key={mag.id} value={mag.type}>
                  {mag.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date de l'Élection</Label>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-3"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Candidats</Label>
          <div className="flex space-x-2">
            <Input
              value={newCandidate}
              onChange={(e) => setNewCandidate(e.target.value)}
              placeholder="Nom du candidat"
              className="flex-1"
            />
            <Button type="button" onClick={addCandidate} variant="secondary">
              Ajouter
            </Button>
          </div>

          <div className="mt-2">
            {candidates.length > 0 ? (
              <ul className="space-y-2">
                {candidates.map((candidate, index) => (
                  <li key={index} className="flex justify-between items-center p-2 border rounded-md">
                    <span>{candidate}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCandidate(candidate)}
                    >
                      ✕
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Aucun candidat ajouté</p>
            )}
          </div>
        </div>

        <Button onClick={scheduleElection} className="w-full">
          Planifier l'Élection
        </Button>
      </CardContent>
    </Card>
  );
};
