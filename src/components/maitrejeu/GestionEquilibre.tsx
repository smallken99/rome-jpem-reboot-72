import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { EvenementType } from './types/maitreJeuTypes';
import { EvenementsList } from './components/EvenementsList';
import { EquilibreBarChart } from './components/EquilibreBarChart';

export const GestionEquilibre = () => {
  const { equilibre, updateEquilibre, evenements, resolveEvenement } = useMaitreJeu();
  
  const [plebeiens, setPlebeiens] = useState(equilibre.plebeiens);
  const [patriciens, setPatriciens] = useState(equilibre.patriciens);
  const [armée, setArmée] = useState(equilibre.armée);
  const [économie, setÉconomie] = useState(equilibre.économie);
  const [religion, setReligion] = useState(equilibre.religion);
  const [diplomatie, setDiplomatie] = useState(equilibre.diplomatie);
  const [populaires, setPopulaires] = useState(equilibre.populaires || 0);
  const [optimates, setOptimates] = useState(equilibre.optimates || 0);
  const [moderates, setModerates] = useState(equilibre.moderates || 0);
  
  const [filteredType, setFilteredType] = useState<EvenementType | 'ALL'>('ALL');
  
  const handlePlebeiensChange = (value: number[]) => {
    setPlebeiens(value[0]);
  };
  
  const handlePatriciensChange = (value: number[]) => {
    setPatriciens(value[0]);
  };
  
  const handleArméeChange = (value: number[]) => {
    setArmée(value[0]);
  };
  
  const handleÉconomieChange = (value: number[]) => {
    setÉconomie(value[0]);
  };
  
  const handleReligionChange = (value: number[]) => {
    setReligion(value[0]);
  };
  
  const handleDiplomatieChange = (value: number[]) => {
    setDiplomatie(value[0]);
  };
  
  const handlePopulairesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPopulaires(Number(event.target.value));
  };
  
  const handleOptimatesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptimates(Number(event.target.value));
  };
  
  const handleModeratesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModerates(Number(event.target.value));
  };
  
  const handleUpdateEquilibre = () => {
    updateEquilibre({
      plebeiens,
      patriciens,
      armée,
      économie,
      religion,
      diplomatie,
      populaires,
      optimates,
      moderates
    });
  };
  
  const handleFilterChange = (newType: string) => {
    setFilteredType(newType as EvenementType | 'ALL');
  };
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Gestion de l'Équilibre</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="plebeiens">Plebeiens</Label>
                <Slider
                  id="plebeiens"
                  defaultValue={[equilibre.plebeiens]}
                  max={100}
                  step={1}
                  onValueChange={handlePlebeiensChange}
                />
              </div>
              <div>
                <Label htmlFor="patriciens">Patriciens</Label>
                <Slider
                  id="patriciens"
                  defaultValue={[equilibre.patriciens]}
                  max={100}
                  step={1}
                  onValueChange={handlePatriciensChange}
                />
              </div>
              <div>
                <Label htmlFor="armée">Armée</Label>
                <Slider
                  id="armée"
                  defaultValue={[equilibre.armée]}
                  max={100}
                  step={1}
                  onValueChange={handleArméeChange}
                />
              </div>
              <div>
                <Label htmlFor="économie">Économie</Label>
                <Slider
                  id="économie"
                  defaultValue={[equilibre.économie]}
                  max={100}
                  step={1}
                  onValueChange={handleÉconomieChange}
                />
              </div>
              <div>
                <Label htmlFor="religion">Religion</Label>
                <Slider
                  id="religion"
                  defaultValue={[equilibre.religion]}
                  max={100}
                  step={1}
                  onValueChange={handleReligionChange}
                />
              </div>
              <div>
                <Label htmlFor="diplomatie">Diplomatie</Label>
                <Slider
                  id="diplomatie"
                  defaultValue={[equilibre.diplomatie]}
                  max={100}
                  step={1}
                  onValueChange={handleDiplomatieChange}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="populaires">Populaires</Label>
                <Input
                  type="number"
                  id="populaires"
                  value={populaires}
                  onChange={handlePopulairesChange}
                />
              </div>
              <div>
                <Label htmlFor="optimates">Optimates</Label>
                <Input
                  type="number"
                  id="optimates"
                  value={optimates}
                  onChange={handleOptimatesChange}
                />
              </div>
              <div>
                <Label htmlFor="moderates">Modérés</Label>
                <Input
                  type="number"
                  id="moderates"
                  value={moderates}
                  onChange={handleModeratesChange}
                />
              </div>
              
              <Button onClick={handleUpdateEquilibre}>
                Mettre à jour l'équilibre
              </Button>
              
              <EquilibreBarChart equilibre={equilibre} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        <Button
          size="sm"
          variant={filteredType === 'ALL' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('ALL')}
        >
          Tous
        </Button>
        <Button
          size="sm"
          variant={filteredType === 'POLITIQUE' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('POLITIQUE')}
        >
          Politique
        </Button>
        <Button
          size="sm"
          variant={filteredType === 'GUERRE' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('GUERRE')}
        >
          Guerre
        </Button>
        <Button
          size="sm"
          variant={filteredType === 'CRISE' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('CRISE')}
        >
          Crise
        </Button>
        <Button
          size="sm"
          variant={filteredType === 'ECONOMIQUE' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('ECONOMIQUE')}
        >
          Économie
        </Button>
        <Button
          size="sm"
          variant={filteredType === 'RELIGION' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('RELIGION')}
        >
          Religion
        </Button>
        <Button
          size="sm"
          variant={filteredType === 'DIPLOMATIQUE' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('DIPLOMATIQUE')}
        >
          Diplomatie
        </Button>
      </div>
      
      <EvenementsList 
        evenements={evenements} 
        onResolve={resolveEvenement}
        filteredType={filteredType}
      />
    </div>
  );
};
