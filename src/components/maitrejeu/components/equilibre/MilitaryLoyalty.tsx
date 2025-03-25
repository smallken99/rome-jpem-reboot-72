
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AlertCircle, Swords, User, Shield, Medal, ArrowRight, Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';
import Chart from '@/components/ui/chart';

interface MilitaryLoyaltyProps {
  equilibre: Equilibre;
  onUpdate: (armée: number, loyauté: number, morale: number) => void;
}

export const MilitaryLoyalty: React.FC<MilitaryLoyaltyProps> = ({ equilibre, onUpdate }) => {
  const [armée, setArmée] = useState(equilibre.armée || equilibre.facteurMilitaire || 50);
  const [loyauté, setLoyauté] = useState(equilibre.loyauté || 50);
  const [morale, setMorale] = useState(equilibre.morale || 50);
  const [selectedLegion, setSelectedLegion] = useState('1');
  const [selectedGeneral, setSelectedGeneral] = useState('');
  
  // Données des légions (mockées pour l'exemple)
  const legions = [
    { id: '1', number: 'I', name: 'Augusta', strength: 4800, loyalty: 85, morale: 78, location: 'Gallia' },
    { id: '2', number: 'II', name: 'Sabina', strength: 4500, loyalty: 92, morale: 85, location: 'Italia' },
    { id: '3', number: 'III', name: 'Cyrenaica', strength: 4200, loyalty: 68, morale: 72, location: 'Africa' },
    { id: '4', number: 'IV', name: 'Macedonica', strength: 4600, loyalty: 75, morale: 80, location: 'Macedonia' },
    { id: '5', number: 'V', name: 'Alaudae', strength: 4300, loyalty: 88, morale: 76, location: 'Hispania' },
  ];
  
  // Données des généraux (mockées pour l'exemple)
  const generals = [
    { id: '1', name: 'Marcus Valerius', loyalty: 90, skill: 85, experience: 78, victories: 12 },
    { id: '2', name: 'Titus Claudius', loyalty: 75, skill: 92, experience: 82, victories: 8 },
    { id: '3', name: 'Gaius Flaminius', loyalty: 65, skill: 78, experience: 70, victories: 5 },
  ];
  
  // Obtenir les détails de la légion sélectionnée
  const selectedLegionDetails = legions.find(legion => legion.id === selectedLegion);
  
  // Obtenir les détails du général sélectionné
  const selectedGeneralDetails = generals.find(general => general.id === selectedGeneral);
  
  // Données historiques pour le graphique (mockées)
  const loyaltyHistoryData = [
    { month: 'Janvier', armée: 65, loyauté: 70, morale: 68 },
    { month: 'Février', armée: 67, loyauté: 72, morale: 70 },
    { month: 'Mars', armée: 70, loyauté: 74, morale: 72 },
    { month: 'Avril', armée: 72, loyauté: 78, morale: 75 },
    { month: 'Mai', armée: 75, loyauté: 80, morale: 76 },
    { month: 'Juin', armée: 73, loyauté: 76, morale: 73 },
  ];
  
  // Fonction pour mettre à jour les valeurs
  const handleSaveChanges = () => {
    onUpdate(armée, loyauté, morale);
  };
  
  // Fonction pour réinitialiser les valeurs
  const handleReset = () => {
    setArmée(equilibre.armée || equilibre.facteurMilitaire || 50);
    setLoyauté(equilibre.loyauté || 50);
    setMorale(equilibre.morale || 50);
  };
  
  // Fonction pour calculer la classe de couleur en fonction de la valeur
  const getValueColorClass = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-amber-600';
    if (value >= 40) return 'text-orange-600';
    return 'text-red-600';
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Swords className="h-5 w-5" />
              Force militaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Force militaire globale</span>
                  <span className={`font-medium ${getValueColorClass(armée)}`}>{armée}%</span>
                </div>
                <Slider 
                  value={[armée]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => setArmée(value[0])} 
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Loyauté des légions</span>
                  <span className={`font-medium ${getValueColorClass(loyauté)}`}>{loyauté}%</span>
                </div>
                <Slider 
                  value={[loyauté]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => setLoyauté(value[0])} 
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Moral des troupes</span>
                  <span className={`font-medium ${getValueColorClass(morale)}`}>{morale}%</span>
                </div>
                <Slider 
                  value={[morale]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => setMorale(value[0])} 
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" onClick={handleReset} className="flex-1">Réinitialiser</Button>
              <Button onClick={handleSaveChanges} className="flex-1">Sauvegarder</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Légions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Select value={selectedLegion} onValueChange={setSelectedLegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une légion" />
                  </SelectTrigger>
                  <SelectContent>
                    {legions.map(legion => (
                      <SelectItem key={legion.id} value={legion.id}>
                        Légion {legion.number} {legion.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedLegionDetails && (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Force d'effectif</span>
                    <span className="font-medium">{selectedLegionDetails.strength} hommes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Loyauté</span>
                    <span className={`font-medium ${getValueColorClass(selectedLegionDetails.loyalty)}`}>
                      {selectedLegionDetails.loyalty}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Moral</span>
                    <span className={`font-medium ${getValueColorClass(selectedLegionDetails.morale)}`}>
                      {selectedLegionDetails.morale}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Stationnement</span>
                    <span className="font-medium">{selectedLegionDetails.location}</span>
                  </div>
                </div>
              )}
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                Gérer les légions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Medal className="h-5 w-5" />
              Généraux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Select value={selectedGeneral} onValueChange={setSelectedGeneral}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un général" />
                  </SelectTrigger>
                  <SelectContent>
                    {generals.map(general => (
                      <SelectItem key={general.id} value={general.id}>
                        {general.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedGeneralDetails && (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Loyauté</span>
                    <span className={`font-medium ${getValueColorClass(selectedGeneralDetails.loyalty)}`}>
                      {selectedGeneralDetails.loyalty}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Compétence</span>
                    <span className={`font-medium ${getValueColorClass(selectedGeneralDetails.skill)}`}>
                      {selectedGeneralDetails.skill}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Expérience</span>
                    <span className={`font-medium ${getValueColorClass(selectedGeneralDetails.experience)}`}>
                      {selectedGeneralDetails.experience}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Victoires</span>
                    <span className="font-medium">{selectedGeneralDetails.victories}</span>
                  </div>
                </div>
              )}
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                Gérer les généraux
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Évolution de la loyauté militaire</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart 
            data={loyaltyHistoryData}
            type="line"
            xAxisDataKey="month"
            height={250}
          >
            <Chart.Line 
              type="monotone"
              dataKey="armée"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Chart.Line 
              type="monotone"
              dataKey="loyauté"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Chart.Line 
              type="monotone"
              dataKey="morale"
              stroke="#84cc16"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </Chart>
        </CardContent>
      </Card>
      
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <div>
            <p className="text-amber-800 text-sm font-medium">Alerte de loyauté</p>
            <p className="text-amber-700 text-xs">
              La loyauté des troupes en Gaule est en baisse suite aux retards de paiement. 
              Considérez une augmentation de la solde ou des récompenses spéciales.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
