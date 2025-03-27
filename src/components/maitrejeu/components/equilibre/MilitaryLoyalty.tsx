
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Equilibre } from '@/components/maitrejeu/types';

export interface MilitaryLoyaltyProps {
  equilibre: Equilibre;
  onUpdate: (armée: number, loyauté: number, morale: number) => void;
}

const historyData = [
  { year: 1, armée: 65, loyauté: 70, morale: 55 },
  { year: 2, armée: 70, loyauté: 68, morale: 60 },
  { year: 3, armée: 62, loyauté: 72, morale: 58 },
  { year: 4, armée: 75, loyauté: 75, morale: 62 },
  { year: 5, armée: 68, loyauté: 80, morale: 65 },
  { year: 6, armée: 72, loyauté: 78, morale: 70 }
];

export const MilitaryLoyalty: React.FC<MilitaryLoyaltyProps> = ({ equilibre, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("ajuster");
  const [armée, setArmée] = useState(equilibre.armée || 70);
  const [loyauté, setLoyauté] = useState(equilibre.loyauté || 75);
  const [morale, setMorale] = useState(equilibre.morale || 60);
  const [hasChanges, setHasChanges] = useState(false);

  const handleArméeChange = (value: number[]) => {
    setArmée(value[0]);
    setHasChanges(true);
  };

  const handleLoyautéChange = (value: number[]) => {
    setLoyauté(value[0]);
    setHasChanges(true);
  };

  const handleMoraleChange = (value: number[]) => {
    setMorale(value[0]);
    setHasChanges(true);
  };

  const handleUpdate = () => {
    onUpdate(armée, loyauté, morale);
    setHasChanges(false);
    toast.success("Valeurs militaires mises à jour", {
      description: "Les nouvelles valeurs ont été enregistrées avec succès"
    });
  };

  const getLabelForValue = (value: number): string => {
    if (value >= 90) return "Exceptionnelle";
    if (value >= 80) return "Excellente";
    if (value >= 70) return "Très bonne";
    if (value >= 60) return "Bonne";
    if (value >= 50) return "Moyenne";
    if (value >= 40) return "Médiocre";
    if (value >= 30) return "Mauvaise";
    if (value >= 20) return "Très mauvaise";
    return "Catastrophique";
  };

  const getColorForValue = (value: number): string => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-emerald-500";
    if (value >= 40) return "text-amber-500";
    if (value >= 20) return "text-orange-500";
    return "text-red-600";
  };

  return (
    <Card className="col-span-12 lg:col-span-6">
      <CardHeader>
        <CardTitle>Forces Militaires et Loyauté</CardTitle>
        <CardDescription>
          Gérez la puissance militaire et la loyauté des troupes romaines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ajuster">Ajuster les valeurs</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="ajuster" className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Puissance Armée</span>
                  <span className={`font-medium ${getColorForValue(armée)}`}>
                    {armée}/100 ({getLabelForValue(armée)})
                  </span>
                </div>
                <Slider
                  defaultValue={[armée]}
                  max={100}
                  step={1}
                  onValueChange={handleArméeChange}
                />
                <p className="text-sm text-muted-foreground">
                  Représente la force brute des légions romaines, leur équipement et leur nombre
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Loyauté</span>
                  <span className={`font-medium ${getColorForValue(loyauté)}`}>
                    {loyauté}/100 ({getLabelForValue(loyauté)})
                  </span>
                </div>
                <Slider
                  defaultValue={[loyauté]}
                  max={100}
                  step={1}
                  onValueChange={handleLoyautéChange}
                />
                <p className="text-sm text-muted-foreground">
                  Représente la fidélité des troupes envers le Sénat plutôt qu'envers leurs généraux
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Morale</span>
                  <span className={`font-medium ${getColorForValue(morale)}`}>
                    {morale}/100 ({getLabelForValue(morale)})
                  </span>
                </div>
                <Slider
                  defaultValue={[morale]}
                  max={100}
                  step={1}
                  onValueChange={handleMoraleChange}
                />
                <p className="text-sm text-muted-foreground">
                  Représente le moral et la motivation des troupes romaines
                </p>
              </div>

              {hasChanges && (
                <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm text-amber-800">
                    N'oubliez pas d'enregistrer vos modifications
                  </span>
                </div>
              )}

              <Button onClick={handleUpdate} disabled={!hasChanges}>
                Enregistrer les modifications
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="historique">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Année', position: 'insideBottomRight', offset: -5 }} 
                  />
                  <YAxis
                    domain={[0, 100]}
                    label={{ value: 'Valeur', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="armée"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                    name="Puissance Armée"
                  />
                  <Line
                    type="monotone"
                    dataKey="loyauté"
                    stroke="#10b981"
                    name="Loyauté"
                  />
                  <Line
                    type="monotone"
                    dataKey="morale"
                    stroke="#f59e0b"
                    name="Morale"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Évolution des valeurs militaires au cours des dernières années
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
