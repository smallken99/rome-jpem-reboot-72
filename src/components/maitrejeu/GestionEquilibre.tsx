
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AlertTriangle, History, RotateCw } from 'lucide-react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { EquilibreBarChart } from './components/EquilibreBarChart';
import { AlertMessage } from '@/components/ui-custom/AlertMessage';
import { EvenementsList } from './components/EvenementsList';
import { CreateEvenementForm } from './components/CreateEvenementForm';

export const GestionEquilibre: React.FC = () => {
  const { 
    stabiliteSenat, 
    stabilitePopulaire, 
    stabiliteMilitaire,
    updateEquilibre,
    evenements,
    triggerRandomEvent
  } = useMaitreJeu();
  
  const [ajustementSenat, setAjustementSenat] = useState(0);
  const [ajustementPopulaire, setAjustementPopulaire] = useState(0);
  const [ajustementMilitaire, setAjustementMilitaire] = useState(0);
  
  const handleResetAdjustments = () => {
    setAjustementSenat(0);
    setAjustementPopulaire(0);
    setAjustementMilitaire(0);
  };
  
  const handleApplyAdjustments = () => {
    if (ajustementSenat !== 0) updateEquilibre('senat', ajustementSenat);
    if (ajustementPopulaire !== 0) updateEquilibre('populaire', ajustementPopulaire);
    if (ajustementMilitaire !== 0) updateEquilibre('militaire', ajustementMilitaire);
    handleResetAdjustments();
  };
  
  // Vérifier les niveaux critiques de stabilité
  const isSenatCritical = stabiliteSenat < 20 || stabiliteSenat > 80;
  const isPopulaireCritical = stabilitePopulaire < 20 || stabilitePopulaire > 80;
  const isMilitaireCritical = stabiliteMilitaire < 20 || stabiliteMilitaire > 80;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique d'équilibre */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Équilibre de la République</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <EquilibreBarChart 
                senat={stabiliteSenat}
                populaire={stabilitePopulaire}
                militaire={stabiliteMilitaire}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Ajustements manuels */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ajustements manuels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sénat ({ajustementSenat > 0 ? '+' : ''}{ajustementSenat})</span>
                  <span className={`text-sm font-semibold ${isSenatCritical ? 'text-amber-500' : 'text-green-500'}`}>
                    {stabiliteSenat}%
                  </span>
                </div>
                <Slider 
                  value={[ajustementSenat]} 
                  min={-20} 
                  max={20} 
                  step={1} 
                  onValueChange={(val) => setAjustementSenat(val[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Populaire ({ajustementPopulaire > 0 ? '+' : ''}{ajustementPopulaire})</span>
                  <span className={`text-sm font-semibold ${isPopulaireCritical ? 'text-amber-500' : 'text-green-500'}`}>
                    {stabilitePopulaire}%
                  </span>
                </div>
                <Slider 
                  value={[ajustementPopulaire]} 
                  min={-20} 
                  max={20} 
                  step={1} 
                  onValueChange={(val) => setAjustementPopulaire(val[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Militaire ({ajustementMilitaire > 0 ? '+' : ''}{ajustementMilitaire})</span>
                  <span className={`text-sm font-semibold ${isMilitaireCritical ? 'text-amber-500' : 'text-green-500'}`}>
                    {stabiliteMilitaire}%
                  </span>
                </div>
                <Slider 
                  value={[ajustementMilitaire]} 
                  min={-20} 
                  max={20} 
                  step={1} 
                  onValueChange={(val) => setAjustementMilitaire(val[0])}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleResetAdjustments}
                className="flex-1"
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
              <Button
                onClick={handleApplyAdjustments}
                className="flex-1"
                disabled={ajustementSenat === 0 && ajustementPopulaire === 0 && ajustementMilitaire === 0}
              >
                Appliquer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Alertes de stabilité */}
      {(isSenatCritical || isPopulaireCritical || isMilitaireCritical) && (
        <div className="space-y-3">
          {isSenatCritical && (
            <AlertMessage
              type="warning"
              title="Instabilité du Sénat"
              message={stabiliteSenat < 20 
                ? "Le Sénat manque de stabilité et pourrait céder à des pressions extérieures."
                : "Le Sénat est trop puissant et pourrait provoquer des réactions populaires."}
            />
          )}
          
          {isPopulaireCritical && (
            <AlertMessage
              type="warning"
              title="Instabilité populaire"
              message={stabilitePopulaire < 20 
                ? "Le peuple est mécontent et des troubles civils risquent d'éclater."
                : "Le peuple devient trop puissant, ce qui inquiète les élites."}
            />
          )}
          
          {isMilitaireCritical && (
            <AlertMessage
              type="warning"
              title="Instabilité militaire"
              message={stabiliteMilitaire < 20 
                ? "L'armée est affaiblie et Rome est vulnérable aux attaques extérieures."
                : "Les généraux ont trop de pouvoir et pourraient menacer l'autorité civile."}
            />
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des événements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Événements en cours</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={triggerRandomEvent}
              className="text-xs"
            >
              <History className="h-4 w-4 mr-1" /> 
              Événement aléatoire
            </Button>
          </CardHeader>
          <CardContent>
            <EvenementsList events={evenements} />
          </CardContent>
        </Card>
        
        {/* Création d'événement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Créer un événement</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateEvenementForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
